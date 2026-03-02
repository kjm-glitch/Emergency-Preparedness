"use client";

import { useState } from "react";
import { InventoryItem } from "@/types/inventory";
import { ExpirationBadge } from "./ExpirationBadge";
import { CATEGORY_EMOJIS } from "@/data/defaultInventory";
import { theme } from "@/lib/theme";

interface ItemCardProps {
  item: InventoryItem;
  index: number;
  onUpdate: (id: string, updates: Partial<InventoryItem>) => void;
  onDelete: (id: string) => void;
  showCategory?: boolean;
}

export function ItemCard({ item, index, onUpdate, onDelete, showCategory }: ItemCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const pct = item.targetQty > 0 ? Math.min(100, Math.round((item.onHand / item.targetQty) * 100)) : 0;
  const barColor = pct === 0 ? theme.progressEmpty : pct >= 100 ? theme.progressFull : pct >= 75 ? theme.progressHigh : pct >= 50 ? theme.progressMid : theme.progressLow;

  const expStatus = getExpStatus(item.expirationDate);

  return (
    <div
      className="fade-in"
      style={{
        animationDelay: `${index * 20}ms`,
        opacity: 0,
        background: expanded ? theme.cardBgHover : theme.cardBg,
        border: `1px solid ${expStatus === "expired" ? theme.danger + "44" : expStatus === "critical" ? theme.peach + "44" : theme.border}`,
        borderRadius: 12,
        padding: "14px 16px",
        transition: "background 0.2s",
        boxShadow: "0 1px 3px rgba(1,50,55,0.04)",
      }}
    >
      {/* Main row */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2, flexWrap: "wrap" }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: theme.textPrimary }}>{item.name}</span>
            <ExpirationBadge date={item.expirationDate} />
          </div>
          {showCategory && (
            <span style={{ fontSize: 11, color: theme.textMuted }}>{CATEGORY_EMOJIS[item.category]} {item.category}</span>
          )}
        </div>

        {/* Qty Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <button
            onClick={() => onUpdate(item.id, { onHand: Math.max(0, item.onHand - 1) })}
            style={{
              width: 32, height: 32, borderRadius: 8,
              background: theme.pinkMuted, border: `1px solid ${theme.pink}33`,
              color: theme.pink, fontSize: 18, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1,
            }}
          >
            -
          </button>
          <div style={{ textAlign: "center", minWidth: 50 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: pct >= 100 ? theme.success : theme.textPrimary }}>
              {item.onHand}
            </span>
            <span style={{ color: theme.textMuted, fontSize: 13 }}>/{item.targetQty}</span>
            <div style={{ fontSize: 10, color: theme.textMuted }}>{item.unit}</div>
          </div>
          <button
            onClick={() => onUpdate(item.id, { onHand: item.onHand + 1 })}
            style={{
              width: 32, height: 32, borderRadius: 8,
              background: theme.successLight, border: `1px solid ${theme.success}44`,
              color: theme.success, fontSize: 18, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1,
            }}
          >
            +
          </button>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          style={{ background: "none", border: "none", color: theme.textMuted, cursor: "pointer", fontSize: 16, padding: 4 }}
        >
          {expanded ? "✕" : "✎"}
        </button>
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, background: theme.progressEmpty, borderRadius: 2, marginTop: 8, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: barColor, borderRadius: 2, transition: "width 0.4s ease" }} />
      </div>

      {/* Expanded edit panel */}
      {expanded && (
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${theme.borderLight}`, display: "flex", flexDirection: "column", gap: 10 }}>
          {item.notes && (
            <p style={{ fontSize: 12, color: theme.textSecondary, fontStyle: "italic", lineHeight: 1.4 }}>
              {item.notes}
            </p>
          )}
          {item.shelfLife && (
            <p style={{ fontSize: 12, color: theme.textMuted }}>Typical shelf life: {item.shelfLife}</p>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div>
              <label style={{ fontSize: 11, color: theme.textMuted, display: "block", marginBottom: 3 }}>Item Name</label>
              <input
                type="text"
                value={item.name}
                onChange={(e) => onUpdate(item.id, { name: e.target.value })}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ fontSize: 11, color: theme.textMuted, display: "block", marginBottom: 3 }}>Unit</label>
              <input
                type="text"
                value={item.unit}
                onChange={(e) => onUpdate(item.id, { unit: e.target.value })}
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div>
              <label style={{ fontSize: 11, color: theme.textMuted, display: "block", marginBottom: 3 }}>Target Quantity</label>
              <input
                type="number"
                min={0}
                value={item.targetQty}
                onChange={(e) => onUpdate(item.id, { targetQty: parseInt(e.target.value) || 0 })}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ fontSize: 11, color: theme.textMuted, display: "block", marginBottom: 3 }}>Expiration Date</label>
              <input
                type="date"
                value={item.expirationDate || ""}
                onChange={(e) => onUpdate(item.id, { expirationDate: e.target.value || null })}
                style={inputStyle}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: 11, color: theme.textMuted, display: "block", marginBottom: 3 }}>Notes</label>
            <textarea
              value={item.notes}
              onChange={(e) => onUpdate(item.id, { notes: e.target.value })}
              rows={2}
              style={{ ...inputStyle, resize: "vertical" as const }}
            />
          </div>

          {confirmDelete ? (
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontSize: 12, color: theme.danger }}>Remove this item?</span>
              <button
                onClick={() => onDelete(item.id)}
                style={{
                  background: theme.dangerLight, border: `1px solid ${theme.danger}44`,
                  borderRadius: 8, padding: "6px 14px", color: theme.danger, fontSize: 12, cursor: "pointer",
                }}
              >
                Yes, Remove
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                style={{
                  background: theme.cardBg, border: `1px solid ${theme.border}`,
                  borderRadius: 8, padding: "6px 14px", color: theme.textSecondary, fontSize: 12, cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              style={{
                alignSelf: "flex-start",
                background: theme.dangerLight, border: `1px solid ${theme.danger}33`,
                borderRadius: 8, padding: "6px 14px", color: theme.danger, fontSize: 12, cursor: "pointer",
              }}
            >
              Remove Item
            </button>
          )}
        </div>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 10px",
  background: theme.inputBg,
  border: `1px solid ${theme.border}`,
  borderRadius: 8,
  color: theme.textPrimary,
  fontSize: 14,
  outline: "none",
};

function getExpStatus(dateStr: string | null): string {
  if (!dateStr) return "none";
  const now = new Date();
  const exp = new Date(dateStr + "T00:00:00");
  const diffDays = (exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  if (diffDays < 0) return "expired";
  if (diffDays <= 30) return "critical";
  if (diffDays <= 90) return "warning";
  return "good";
}
