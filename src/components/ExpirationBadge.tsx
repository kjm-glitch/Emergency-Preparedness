"use client";

import { theme } from "@/lib/theme";

export function ExpirationBadge({ date }: { date: string | null }) {
  if (!date) return null;

  const now = new Date();
  const expDate = new Date(date + "T00:00:00");
  const daysUntil = Math.ceil((expDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (daysUntil < 0) {
    return (
      <span style={{
        fontSize: 10, background: theme.dangerLight, color: theme.danger,
        padding: "1px 6px", borderRadius: 4, fontWeight: 600,
      }}>
        EXPIRED
      </span>
    );
  }

  if (daysUntil <= 30) {
    return (
      <span style={{
        fontSize: 10, background: theme.dangerLight, color: theme.pink,
        padding: "1px 6px", borderRadius: 4, fontWeight: 600,
      }}>
        {daysUntil}d left
      </span>
    );
  }

  if (daysUntil <= 90) {
    return (
      <span style={{
        fontSize: 10, background: theme.warningLight, color: theme.peach,
        padding: "1px 6px", borderRadius: 4, fontWeight: 600,
      }}>
        {daysUntil}d left
      </span>
    );
  }

  const formatted = expDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  return (
    <span style={{ fontSize: 11, color: theme.textMuted }}>
      Exp: {formatted}
    </span>
  );
}
