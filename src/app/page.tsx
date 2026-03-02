"use client";

import { useState, useEffect } from "react";
import { useInventory } from "@/hooks/useInventory";
import { ProgressRing } from "@/components/ProgressRing";
import { ProgressBar } from "@/components/ProgressBar";
import { ItemCard } from "@/components/ItemCard";
import { AddItemForm } from "@/components/AddItemForm";
import { AlertsPanel } from "@/components/AlertsPanel";
import { CATEGORY_ORDER } from "@/data/defaultInventory";
import { theme } from "@/lib/theme";

export default function Home() {
  const {
    items,
    categories,
    alerts,
    overallPercent,
    fullyStocked,
    unstocked,
    loaded,
    syncStatus,
    updateItem,
    addItem,
    deleteItem,
    resetToDefaults,
  } = useInventory();

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showAlerts, setShowAlerts] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const criticalAlerts = alerts.filter(
    (a) => a.type === "expired" || a.type === "expiring-soon" || a.type === "low-stock"
  );

  // Show welcome if first visit (no saved data)
  useEffect(() => {
    if (loaded) {
      const hasSeenWelcome = localStorage.getItem("ready-stock-welcomed");
      if (!hasSeenWelcome) setShowWelcome(true);
    }
  }, [loaded]);

  const dismissWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem("ready-stock-welcomed", "true");
  };

  // Get items to display based on active category & search
  const filteredItems = (() => {
    let result = items;
    if (activeCategory) result = result.filter((i) => i.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.notes.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q)
      );
    }
    return result;
  })();

  const showItemsList = activeCategory !== null || searchQuery.trim() !== "";

  if (!loaded) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: theme.textMuted, fontSize: 16 }}>Loading inventory...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* ─── HEADER ─── */}
      <div
        style={{
          background: theme.headerBg,
          borderBottom: `1px solid ${theme.teal}`,
          padding: "24px 20px 20px",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          {/* Title row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <h1 style={{ fontWeight: 800, fontSize: 22, letterSpacing: "-0.5px", color: theme.textOnDark, lineHeight: 1.1 }}>
                READY STOCK
              </h1>
              <p style={{
                fontSize: 12, color: theme.textOnDarkMuted, marginTop: 4, fontWeight: 300,
                letterSpacing: "1.5px", textTransform: "uppercase",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                Emergency Preparedness Tracker · 5 People
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 4,
                  fontSize: 10, letterSpacing: "0.5px", textTransform: "none",
                  color: syncStatus === "synced" ? theme.success : syncStatus === "offline" ? theme.peach : syncStatus === "error" ? theme.pink : theme.textOnDarkMuted,
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: 3,
                    background: syncStatus === "synced" ? theme.success : syncStatus === "offline" ? theme.peach : syncStatus === "error" ? theme.pink : theme.textOnDarkMuted,
                  }} />
                  {syncStatus === "synced" && "Synced"}
                  {syncStatus === "offline" && "Offline"}
                  {syncStatus === "error" && "Sync Error"}
                  {syncStatus === "loading" && "Syncing..."}
                </span>
              </p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => setShowAlerts(!showAlerts)}
                style={{
                  background: criticalAlerts.length > 0 ? theme.dangerLight : "rgba(246,232,223,0.08)",
                  border: `1px solid ${criticalAlerts.length > 0 ? theme.danger + "55" : "rgba(246,232,223,0.15)"}`,
                  borderRadius: 10, padding: "8px 14px",
                  color: criticalAlerts.length > 0 ? theme.pink : theme.textOnDarkMuted,
                  cursor: "pointer", fontSize: 13, fontWeight: 500,
                }}
              >
                {criticalAlerts.length}
              </button>
              {confirmReset ? (
                <div style={{ display: "flex", gap: 4 }}>
                  <button
                    onClick={() => { resetToDefaults(); setConfirmReset(false); localStorage.removeItem("ready-stock-welcomed"); }}
                    style={{
                      background: theme.dangerLight, border: `1px solid ${theme.danger}55`,
                      borderRadius: 10, padding: "8px 12px", color: theme.pink,
                      cursor: "pointer", fontSize: 12, fontWeight: 600,
                    }}
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setConfirmReset(false)}
                    style={{
                      background: "rgba(246,232,223,0.08)", border: "1px solid rgba(246,232,223,0.15)",
                      borderRadius: 10, padding: "8px 12px", color: theme.textOnDarkMuted,
                      cursor: "pointer", fontSize: 12,
                    }}
                  >
                    No
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmReset(true)}
                  style={{
                    background: "rgba(246,232,223,0.08)", border: "1px solid rgba(246,232,223,0.15)",
                    borderRadius: 10, padding: "8px 14px", color: theme.textOnDarkMuted,
                    cursor: "pointer", fontSize: 12,
                  }}
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Stats Row */}
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <ProgressRing percent={overallPercent} />
            <div style={{ display: "flex", gap: 16, flex: 1, flexWrap: "wrap" }}>
              <div>
                <span style={{ fontSize: 18, fontWeight: 700, color: theme.textOnDark }}>{items.length}</span>
                <span style={{ fontSize: 11, color: theme.textOnDarkMuted, display: "block" }}>Items</span>
              </div>
              <div>
                <span style={{ fontSize: 18, fontWeight: 700, color: theme.success }}>{fullyStocked}</span>
                <span style={{ fontSize: 11, color: theme.textOnDarkMuted, display: "block" }}>Stocked</span>
              </div>
              <div>
                <span style={{ fontSize: 18, fontWeight: 700, color: theme.pink }}>{unstocked}</span>
                <span style={{ fontSize: 11, color: theme.textOnDarkMuted, display: "block" }}>Needed</span>
              </div>
            </div>
          </div>

          {/* Search */}
          <div style={{ marginTop: 14 }}>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search items..."
              style={{
                width: "100%", padding: "10px 14px",
                background: "rgba(246,232,223,0.08)", border: "1px solid rgba(246,232,223,0.12)",
                borderRadius: 10, color: theme.textOnDark, fontSize: 14, outline: "none",
              }}
            />
          </div>
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "16px 20px 100px" }}>
        {/* Welcome message */}
        {showWelcome && (
          <div
            className="slide-up"
            style={{
              background: theme.cardBg,
              border: `1px solid ${theme.border}`,
              borderRadius: 14, padding: 24, marginBottom: 20,
              boxShadow: "0 2px 8px rgba(1,50,55,0.06)",
            }}
          >
            <h2 style={{ fontWeight: 700, fontSize: 18, color: theme.textPrimary, marginBottom: 8 }}>
              Welcome, Katie
            </h2>
            <p style={{ color: theme.textSecondary, fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>
              Your emergency inventory is pre-loaded with 103 items across 17 categories — everything
              for your household (you, 3 daughters, and Mom). Tap any category below, then use the
              +/− buttons to track what you&apos;ve bought. Add expiration dates to get automatic alerts
              when items need rotating.
            </p>
            <button
              onClick={dismissWelcome}
              style={{
                background: theme.teal, color: theme.textOnDark, border: "none",
                borderRadius: 8, padding: "10px 20px", cursor: "pointer",
                fontWeight: 600, fontSize: 14,
              }}
            >
              Got it — let&apos;s go
            </button>
          </div>
        )}

        {/* Alerts panel */}
        {showAlerts && <AlertsPanel alerts={alerts} onClose={() => setShowAlerts(false)} />}

        {/* ─── CATEGORY PILLS ─── */}
        <div
          className="pill-scroll"
          style={{
            display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20,
          }}
        >
          <button
            onClick={() => { setActiveCategory(null); setSearchQuery(""); }}
            style={{
              background: !activeCategory ? theme.teal : theme.cardBg,
              border: `1px solid ${!activeCategory ? theme.teal : theme.border}`,
              borderRadius: 20, padding: "6px 14px",
              color: !activeCategory ? theme.textOnDark : theme.textSecondary,
              fontSize: 12, cursor: "pointer",
              fontWeight: !activeCategory ? 600 : 400, whiteSpace: "nowrap",
            }}
          >
            All ({items.length})
          </button>
          {categories.map((cat) => {
            const isActive = activeCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(isActive ? null : cat.name)}
                style={{
                  background: isActive ? `${cat.color}22` : theme.cardBg,
                  border: `1px solid ${isActive ? cat.color + "55" : theme.border}`,
                  borderRadius: 20, padding: "6px 12px",
                  color: isActive ? cat.color : theme.textSecondary,
                  fontSize: 12, cursor: "pointer",
                  fontWeight: isActive ? 600 : 400, whiteSpace: "nowrap",
                }}
              >
                {cat.emoji} {cat.name.split(" ")[0]} ({cat.percentStocked}%)
              </button>
            );
          })}
        </div>

        {/* ─── CATEGORY GRID (overview mode) ─── */}
        {!showItemsList && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
              gap: 8,
              marginBottom: 24,
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                style={{
                  background: theme.cardBg,
                  border: `1px solid ${theme.border}`,
                  borderRadius: 10, padding: "12px 14px",
                  cursor: "pointer", textAlign: "left", display: "block", width: "100%",
                  boxShadow: "0 1px 3px rgba(1,50,55,0.04)",
                  transition: "box-shadow 0.2s",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: theme.textPrimary, fontWeight: 500 }}>
                    {cat.emoji} {cat.name}
                  </span>
                  <span style={{ fontSize: 12, color: cat.color, fontWeight: 600 }}>
                    {cat.percentStocked}%
                  </span>
                </div>
                <ProgressBar percent={cat.percentStocked} color={cat.color} height={4} />
                <span style={{ fontSize: 11, color: theme.textMuted, marginTop: 4, display: "block" }}>
                  {cat.items.length} items
                </span>
              </button>
            ))}
          </div>
        )}

        {/* ─── ITEMS LIST (category or search mode) ─── */}
        {showItemsList && (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {filteredItems.map((item, idx) => (
              <ItemCard
                key={item.id}
                item={item}
                index={idx}
                onUpdate={updateItem}
                onDelete={deleteItem}
                showCategory={!activeCategory}
              />
            ))}

            {filteredItems.length === 0 && (
              <p style={{ color: theme.textMuted, textAlign: "center", padding: 40, fontSize: 14 }}>
                {searchQuery ? "No items match your search." : "No items in this category yet."}
              </p>
            )}
          </div>
        )}

        {/* Inline add form */}
        {showAddForm && (
          <AddItemForm
            onAdd={addItem}
            onClose={() => setShowAddForm(false)}
            defaultCategory={activeCategory || CATEGORY_ORDER[0]}
          />
        )}
      </div>

      {/* ─── FLOATING ADD BUTTON ─── */}
      {!showAddForm && (
        <button
          onClick={() => {
            setShowAddForm(true);
            if (!activeCategory) setActiveCategory(CATEGORY_ORDER[0]);
          }}
          style={{
            position: "fixed", bottom: 24, right: 24,
            width: 56, height: 56, borderRadius: 28,
            background: theme.peach,
            border: "none", color: "#fff", fontSize: 28,
            cursor: "pointer",
            boxShadow: `0 4px 20px ${theme.peach}55`,
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 100, lineHeight: 1,
          }}
        >
          +
        </button>
      )}
    </div>
  );
}
