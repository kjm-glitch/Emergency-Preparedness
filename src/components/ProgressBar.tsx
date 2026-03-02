"use client";

import { theme } from "@/lib/theme";

export function ProgressBar({ percent, color, height = 4 }: { percent: number; color?: string; height?: number }) {
  const barColor = color || (
    percent >= 100 ? theme.progressFull : percent >= 75 ? theme.progressHigh : percent >= 50 ? theme.progressMid : theme.progressLow
  );

  return (
    <div style={{ height, background: theme.progressEmpty, borderRadius: height / 2, overflow: "hidden", width: "100%" }}>
      <div
        style={{
          height: "100%",
          width: `${Math.min(percent, 100)}%`,
          background: barColor,
          borderRadius: height / 2,
          transition: "width 0.6s ease",
        }}
      />
    </div>
  );
}
