"use client";
import React from "react";
interface ChartPayloadItem {
    name: string;
    value: number;
    color: string;
  } 
interface ChartTooltipProps {
    dark?: boolean;
    active?: boolean;
    payload?: ChartPayloadItem[]; 
    label?: string;
  }
export default function ChartTooltip({ dark = false, active = false, payload, label } : ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div
      className={`rounded-xl px-3 py-2 text-xs shadow-xl border ${
        dark
          ? "bg-gray-800 border-gray-700 text-gray-200"
          : "bg-white border-slate-100 text-gray-700"
      }`}
    >
      <p className="font-semibold mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="font-medium">
          {p.name}: ${p.value?.toLocaleString()}
        </p>
      ))}
    </div>
  );
}