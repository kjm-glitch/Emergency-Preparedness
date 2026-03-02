"use client";

import { Alert } from "@/types/inventory";
import { CATEGORY_EMOJIS } from "@/data/defaultInventory";
import { theme } from "@/lib/theme";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function daysUntil(dateStr: string): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const exp = new Date(dateStr + "T00:00:00");
  return Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function AlertsPanel({ alerts, onClose }: { alerts: Alert[]; onClose: () => void }) {
  const expired = alerts.filter((a) => a.type === "expired");
  const expiring = alerts.filter((a) => a.type === "expiring-soon");
  const low = alerts.filter((a) => a.type === "low-stock");
  const outOfStock = alerts.filter((a) => a.type === "out-of-stock");

  return (
    <div className="slide-up" style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h2 style={{ fontWeight: 700, fontSize: 16, color: theme.pink }}>
          Alerts ({alerts.length})
        </h2>
        <button
          onClick={onClose}
          style={{ background: "none", border: "none", color: theme.textMuted, cursor: "pointer", fontSize: 18 }}
        >
          ✕
        </button>
      </div>

      {alerts.length === 0 ? (
        <div style={{
          background: theme.successLight, border: `1px solid ${theme.success}33`,
          borderRadius: 12, padding: 24, textAlign: "center",
        }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>✓</div>
          <div style={{ color: theme.success, fontWeight: 500 }}>No alerts — your inventory is looking good!</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 400, overflow: "auto" }}>
          {expired.map((a) => (
            <AlertRow key={`${a.item.id}-exp`} alert={a} severity={3}
              detail={`EXPIRED ${a.item.expirationDate ? formatDate(a.item.expirationDate) : ""}`} />
          ))}
          {expiring.map((a) => (
            <AlertRow key={`${a.item.id}-expiring`} alert={a} severity={2}
              detail={`expires in ${a.item.expirationDate ? daysUntil(a.item.expirationDate) : "?"} days`} />
          ))}
          {low.map((a) => (
            <AlertRow key={`${a.item.id}-low`} alert={a} severity={2}
              detail={`only ${a.item.onHand}/${a.item.targetQty} ${a.item.unit}`} />
          ))}
          {outOfStock.length > 0 && (
            <details style={{ marginTop: 8 }}>
              <summary style={{ cursor: "pointer", fontSize: 13, color: theme.textSecondary, padding: "8px 0" }}>
                Not Yet Acquired ({outOfStock.length} items) — click to expand
              </summary>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 6 }}>
                {outOfStock.map((a) => (
                  <AlertRow key={`${a.item.id}-oos`} alert={a} severity={0}
                    detail={`need ${a.item.targetQty} ${a.item.unit}`} />
                ))}
              </div>
            </details>
          )}
        </div>
      )}
    </div>
  );
}

function AlertRow({ alert, severity, detail }: { alert: Alert; severity: number; detail: string }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
      background: severity >= 2 ? theme.dangerLight : severity >= 1 ? theme.warningLight : theme.cardBg,
      border: `1px solid ${severity >= 2 ? theme.danger + "33" : severity >= 1 ? theme.peach + "33" : theme.border}`,
      borderRadius: 10, fontSize: 13,
    }}>
      <span style={{ fontSize: 16 }}>{CATEGORY_EMOJIS[alert.item.category] || ""}</span>
      <div style={{ flex: 1 }}>
        <span style={{ color: theme.textPrimary, fontWeight: 500 }}>{alert.item.name}</span>
        <span style={{ color: theme.textSecondary, marginLeft: 6, fontSize: 12 }}>— {detail}</span>
      </div>
    </div>
  );
}
