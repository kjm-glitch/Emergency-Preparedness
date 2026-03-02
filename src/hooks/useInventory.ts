"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { InventoryItem, CategorySummary, Alert } from "@/types/inventory";
import { defaultInventory, CATEGORY_EMOJIS, CATEGORY_COLORS, CATEGORY_ORDER } from "@/data/defaultInventory";
import { supabase } from "@/lib/supabase";

const LOCAL_CACHE_KEY = "ready-stock-inventory-cache";

// Map between our camelCase fields and Supabase snake_case columns
function toDbRow(item: InventoryItem) {
  return {
    id: item.id,
    name: item.name,
    category: item.category,
    target_qty: item.targetQty,
    on_hand: item.onHand,
    unit: item.unit,
    expiration_date: item.expirationDate,
    shelf_life: item.shelfLife,
    notes: item.notes,
  };
}

function fromDbRow(row: Record<string, unknown>): InventoryItem {
  return {
    id: row.id as string,
    name: row.name as string,
    category: row.category as string,
    targetQty: row.target_qty as number,
    onHand: row.on_hand as number,
    unit: row.unit as string,
    expirationDate: (row.expiration_date as string) || null,
    shelfLife: (row.shelf_life as string) || "",
    notes: (row.notes as string) || "",
  };
}

function cacheLocally(items: InventoryItem[]) {
  try {
    localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

function loadLocalCache(): InventoryItem[] | null {
  try {
    const cached = localStorage.getItem(LOCAL_CACHE_KEY);
    if (cached) return JSON.parse(cached);
  } catch {
    // ignore
  }
  return null;
}

export function useInventory() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [syncStatus, setSyncStatus] = useState<"loading" | "synced" | "offline" | "error">("loading");
  const skipRealtimeRef = useRef<Set<string>>(new Set());

  // ─── Initial load from Supabase (with local cache fallback) ───
  useEffect(() => {
    let cancelled = false;

    async function loadFromSupabase() {
      // Show cached data immediately while we fetch
      const cached = loadLocalCache();
      if (cached && cached.length > 0) {
        setItems(cached);
        setLoaded(true);
      }

      try {
        const { data, error } = await supabase
          .from("inventory_items")
          .select("*")
          .order("id");

        if (cancelled) return;

        if (error) {
          console.error("Supabase fetch error:", error);
          // Fall back to cache or defaults
          if (!cached || cached.length === 0) {
            setItems(defaultInventory);
          }
          setSyncStatus("offline");
          setLoaded(true);
          return;
        }

        if (data.length === 0) {
          // Empty table — seed with defaults
          const rows = defaultInventory.map(toDbRow);
          const { error: insertError } = await supabase
            .from("inventory_items")
            .insert(rows);

          if (insertError) {
            console.error("Seed error:", insertError);
            setItems(defaultInventory);
            setSyncStatus("error");
          } else {
            setItems(defaultInventory);
            cacheLocally(defaultInventory);
            setSyncStatus("synced");
          }
        } else {
          const mapped = data.map(fromDbRow);
          setItems(mapped);
          cacheLocally(mapped);
          setSyncStatus("synced");
        }

        setLoaded(true);
      } catch (err) {
        console.error("Network error:", err);
        if (!cached || cached.length === 0) {
          setItems(defaultInventory);
        }
        setSyncStatus("offline");
        setLoaded(true);
      }
    }

    loadFromSupabase();
    return () => { cancelled = true; };
  }, []);

  // ─── Realtime subscription for multi-device sync ───
  useEffect(() => {
    const channel = supabase
      .channel("inventory-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "inventory_items" },
        (payload) => {
          const { eventType } = payload;

          if (eventType === "INSERT") {
            const newItem = fromDbRow(payload.new);
            if (skipRealtimeRef.current.has(newItem.id)) {
              skipRealtimeRef.current.delete(newItem.id);
              return;
            }
            setItems((prev) => {
              if (prev.some((i) => i.id === newItem.id)) return prev;
              const next = [...prev, newItem];
              cacheLocally(next);
              return next;
            });
          }

          if (eventType === "UPDATE") {
            const updated = fromDbRow(payload.new);
            if (skipRealtimeRef.current.has(updated.id)) {
              skipRealtimeRef.current.delete(updated.id);
              return;
            }
            setItems((prev) => {
              const next = prev.map((i) => (i.id === updated.id ? updated : i));
              cacheLocally(next);
              return next;
            });
          }

          if (eventType === "DELETE") {
            const oldId = (payload.old as Record<string, unknown>).id as string;
            if (skipRealtimeRef.current.has(oldId)) {
              skipRealtimeRef.current.delete(oldId);
              return;
            }
            setItems((prev) => {
              const next = prev.filter((i) => i.id !== oldId);
              cacheLocally(next);
              return next;
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // ─── CRUD operations ───
  const updateItem = useCallback(async (id: string, updates: Partial<InventoryItem>) => {
    // Optimistic local update
    setItems((prev) => {
      const next = prev.map((item) => (item.id === id ? { ...item, ...updates } : item));
      cacheLocally(next);
      return next;
    });

    // Build DB update payload
    const dbUpdates: Record<string, unknown> = {};
    if (updates.name !== undefined) dbUpdates.name = updates.name;
    if (updates.category !== undefined) dbUpdates.category = updates.category;
    if (updates.targetQty !== undefined) dbUpdates.target_qty = updates.targetQty;
    if (updates.onHand !== undefined) dbUpdates.on_hand = updates.onHand;
    if (updates.unit !== undefined) dbUpdates.unit = updates.unit;
    if (updates.expirationDate !== undefined) dbUpdates.expiration_date = updates.expirationDate;
    if (updates.shelfLife !== undefined) dbUpdates.shelf_life = updates.shelfLife;
    if (updates.notes !== undefined) dbUpdates.notes = updates.notes;

    skipRealtimeRef.current.add(id);
    const { error } = await supabase
      .from("inventory_items")
      .update(dbUpdates)
      .eq("id", id);

    if (error) {
      console.error("Update error:", error);
      skipRealtimeRef.current.delete(id);
    }
  }, []);

  const addItem = useCallback(async (item: Omit<InventoryItem, "id">) => {
    const newItem: InventoryItem = {
      ...item,
      id: `item-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    };

    // Optimistic
    setItems((prev) => {
      const next = [...prev, newItem];
      cacheLocally(next);
      return next;
    });

    skipRealtimeRef.current.add(newItem.id);
    const { error } = await supabase
      .from("inventory_items")
      .insert(toDbRow(newItem));

    if (error) {
      console.error("Insert error:", error);
      skipRealtimeRef.current.delete(newItem.id);
    }
  }, []);

  const deleteItem = useCallback(async (id: string) => {
    // Optimistic
    setItems((prev) => {
      const next = prev.filter((item) => item.id !== id);
      cacheLocally(next);
      return next;
    });

    skipRealtimeRef.current.add(id);
    const { error } = await supabase
      .from("inventory_items")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete error:", error);
      skipRealtimeRef.current.delete(id);
    }
  }, []);

  const resetToDefaults = useCallback(async () => {
    setItems(defaultInventory);
    cacheLocally(defaultInventory);

    // Clear table and re-seed
    await supabase.from("inventory_items").delete().neq("id", "");
    const rows = defaultInventory.map(toDbRow);
    await supabase.from("inventory_items").insert(rows);
  }, []);

  // ─── Derived data (same as before) ───
  const categories: CategorySummary[] = CATEGORY_ORDER.map((catName) => {
    const catItems = items.filter((i) => i.category === catName);
    const totalTarget = catItems.reduce((sum, i) => sum + i.targetQty, 0);
    const totalOnHand = catItems.reduce((sum, i) => sum + Math.min(i.onHand, i.targetQty), 0);
    return {
      name: catName,
      emoji: CATEGORY_EMOJIS[catName] || "📦",
      color: CATEGORY_COLORS[catName] || "#888",
      items: catItems,
      totalTarget,
      totalOnHand,
      percentStocked: totalTarget > 0 ? Math.round((totalOnHand / totalTarget) * 100) : 0,
    };
  }).filter((c) => c.items.length > 0);

  const alerts: Alert[] = [];
  const now = new Date();

  for (const item of items) {
    if (item.onHand === 0 && item.targetQty > 0) {
      alerts.push({ type: "out-of-stock", item, message: `${item.name} — not yet acquired` });
    } else if (item.onHand > 0 && item.onHand < item.targetQty * 0.25) {
      alerts.push({ type: "low-stock", item, message: `${item.name} — only ${item.onHand}/${item.targetQty} ${item.unit}` });
    }

    if (item.expirationDate) {
      const expDate = new Date(item.expirationDate);
      if (expDate <= now) {
        alerts.push({ type: "expired", item, message: `${item.name} — EXPIRED ${item.expirationDate}` });
      } else {
        const daysUntil = Math.ceil((expDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        if (daysUntil <= 90) {
          alerts.push({ type: "expiring-soon", item, message: `${item.name} — expires in ${daysUntil} days (${item.expirationDate})` });
        }
      }
    }
  }

  const overallTarget = items.reduce((sum, i) => sum + i.targetQty, 0);
  const overallOnHand = items.reduce((sum, i) => sum + Math.min(i.onHand, i.targetQty), 0);
  const overallPercent = overallTarget > 0 ? Math.round((overallOnHand / overallTarget) * 100) : 0;
  const fullyStocked = items.filter((i) => i.onHand >= i.targetQty).length;
  const unstocked = items.filter((i) => i.onHand === 0).length;

  return {
    items,
    categories,
    alerts,
    overallPercent,
    overallTarget,
    overallOnHand,
    fullyStocked,
    unstocked,
    loaded,
    syncStatus,
    updateItem,
    addItem,
    deleteItem,
    resetToDefaults,
  };
}
