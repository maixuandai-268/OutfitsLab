"use client";
import Card from "../shared/card";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import React from "react";
interface StatCardProps {
    dark?: boolean;
    title: string;
    value: string;
    change: string;
    up: boolean;
    icon: React.ReactNode;
    iconColor: string;
    iconBg: string;
}
export default function StatCard({ dark, title, value, change, up, icon, iconColor, iconBg } : StatCardProps) {
  return (
    <Card dark={dark}>
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
          style={{ background: dark ? iconColor + "22" : iconBg, color: iconColor }}
        >
          {icon}
        </div>
        <span
          className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
            up
              ? dark ? "bg-emerald-900/50 text-emerald-400" : "bg-emerald-50 text-emerald-600"
              : dark ? "bg-red-900/50 text-red-400"         : "bg-red-50 text-red-500"
          }`}
        >
          {up ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {change}
        </span>
      </div>
      <p className={`text-2xl font-bold mb-0.5 ${dark ? "text-gray-50" : "text-gray-900"}`}>{value}</p>
      <p className="text-xs text-gray-400">{title}</p>
    </Card>
  );
}