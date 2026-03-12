"use client";
import Card from "../shared/card";
import CardTitle from "../shared/cardTitle";
import ChartTooltip from "../shared/chartTooltip";
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import React from "react";

interface RevenueChartProps {
    dark: boolean;
}

const revenueData = [
  { month: "Jan", revenue: 31000, expenses: 18000 },
  { month: "Feb", revenue: 40000, expenses: 22000 },
  { month: "Mar", revenue: 35000, expenses: 19000 },
  { month: "Apr", revenue: 50000, expenses: 28000 },
  { month: "May", revenue: 49000, expenses: 27000 },
  { month: "Jun", revenue: 62000, expenses: 32000 },
  { month: "Jul", revenue: 55000, expenses: 30000 },
  { month: "Aug", revenue: 70000, expenses: 38000 },
];

export default function RevenueChart({ dark } : RevenueChartProps) {
  const grid = dark ? "#374151" : "#f1f5f9";

  return (
    <Card dark={dark}>
      <div className="flex items-start justify-between mb-5">
        <CardTitle dark={dark} title="Doanh thu" sub="Doanh thu hàng tháng so với chi phí" />
        <select
          aria-label="Select year"
          className={`text-xs px-2.5 py-1.5 rounded-lg border cursor-pointer outline-none ${
            dark ? "bg-gray-900 border-gray-700 text-gray-300" : "bg-slate-50 border-slate-200 text-gray-600"
          }`}
        >
          <option>2026</option>
          <option>2025</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={revenueData}>
          <defs>
            <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gExp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke={grid} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${v / 1000}k`}
          />
          <Tooltip content={<ChartTooltip dark={dark} />} />
          <Area type="monotone" dataKey="revenue"  name="Revenue"  stroke="#6366f1" fill="url(#gRev)" strokeWidth={2.5} dot={false} />
          <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#10b981" fill="url(#gExp)" strokeWidth={2.5} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}