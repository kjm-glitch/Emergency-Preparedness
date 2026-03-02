"use client";

import { useState } from "react";
import { InventoryItem } from "@/types/inventory";
import { CATEGORY_ORDER, CATEGORY_EMOJIS } from "@/data/defaultInventory";
import { theme } from "@/lib/theme";

interface AddItemFormProps {
  onAdd: (item: Omit<InventoryItem, "id">) => void;
  onClose: () => void;
  defaultCategory?: string;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  background: theme.inputBg,
  border: `1px solid ${theme.border}`,
  borderRadius: 10,
  color: theme.textPrimary,
  fontSize: 14,
  outline: "none",
};

export function AddItemForm({ onAdd, onClose, defaultCategory }: AddItemFormProps) {
  const [form, setForm] = useState({
    name: "",
    category: defaultCategory || CATEGORY_ORDER[0],
    targetQty: 1,
    onHand: 0,
    unit: "units",
    expirationDate: "",
    shelfLife: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onAdd({
      name: form.name.trim(),
      category: form.category,
      targetQty: form.targetQty,
      onHand: form.onHand,
      unit: form.unit,
      expirationDate: form.expirationDate || null,
      shelfLife: form.shelfLife,
      notes: form.notes,
    });
    onClose();
  };

  return (
    <div
      className="slide-up"
      style={{
        background: theme.cardBg,
        border: `1px solid ${theme.border}`,
        borderRadius: 14,
        padding: 20,
        marginTop: 16,
        boxShadow: "0 2px 8px rgba(1,50,55,0.06)",
      }}
    >
      <h3 style={{ fontWeight: 600, fontSize: 15, color: theme.textPrimary, marginBottom: 14 }}>Add New Item</h3>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input
          placeholder="Item name *"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={inputStyle}
          autoFocus
        />

        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          style={inputStyle}
        >
          {CATEGORY_ORDER.map((cat) => (
            <option key={cat} value={cat}>
              {CATEGORY_EMOJIS[cat]} {cat}
            </option>
          ))}
        </select>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          <div>
            <label style={{ fontSize: 11, color: theme.textMuted, marginBottom: 3, display: "block" }}>Target Qty</label>
            <input
              type="number"
              min={0}
              value={form.targetQty}
              onChange={(e) => setForm({ ...form, targetQty: Number(e.target.value) })}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ fontSize: 11, color: theme.textMuted, marginBottom: 3, display: "block" }}>On Hand</label>
            <input
              type="number"
              min={0}
              value={form.onHand}
              onChange={(e) => setForm({ ...form, onHand: Number(e.target.value) })}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ fontSize: 11, color: theme.textMuted, marginBottom: 3, display: "block" }}>Unit</label>
            <input
              value={form.unit}
              onChange={(e) => setForm({ ...form, unit: e.target.value })}
              style={inputStyle}
              placeholder="e.g., cases"
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <div>
            <label style={{ fontSize: 11, color: theme.textMuted, marginBottom: 3, display: "block" }}>Expiration Date</label>
            <input
              type="date"
              value={form.expirationDate}
              onChange={(e) => setForm({ ...form, expirationDate: e.target.value })}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ fontSize: 11, color: theme.textMuted, marginBottom: 3, display: "block" }}>Shelf Life</label>
            <input
              value={form.shelfLife}
              onChange={(e) => setForm({ ...form, shelfLife: e.target.value })}
              style={inputStyle}
              placeholder="e.g., 2-3 years"
            />
          </div>
        </div>

        <textarea
          placeholder="Notes (optional)"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          rows={2}
          style={{ ...inputStyle, resize: "vertical" as const, fontSize: 13 }}
        />

        <div style={{ display: "flex", gap: 8 }}>
          <button
            type="submit"
            disabled={!form.name.trim()}
            style={{
              flex: 1, padding: 10,
              background: form.name.trim() ? theme.success : theme.progressEmpty,
              border: "none", borderRadius: 10, color: "#fff",
              fontWeight: 600, fontSize: 14,
              cursor: form.name.trim() ? "pointer" : "not-allowed",
            }}
          >
            Add Item
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "10px 20px",
              background: theme.cardBg, border: `1px solid ${theme.border}`,
              borderRadius: 10, color: theme.textSecondary, cursor: "pointer", fontSize: 14,
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
