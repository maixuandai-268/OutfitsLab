"use client";
import StatCard from "./StatCard";
import { DollarOutlined, ShoppingCartOutlined, UserOutlined, EyeOutlined } from "@ant-design/icons";
import React from "react";
interface StatsRowProps {
    dark: boolean;
}

export default function StatsRow({ dark } : StatsRowProps) {
  const stats = [
    { title: "Tổng doanh thu", value: "$84,250", change: "+12.5%", up: true,  icon: <DollarOutlined />,       iconColor: "#6366f1", iconBg: "#eef2ff" },
    { title: "Tổng số người dùng",   value: "12,749",  change: "+3.1%",  up: true,  icon: <UserOutlined />,         iconColor: "#f59e0b", iconBg: "#fffbeb" },
    { title: "Tỷ lệ thoát",   value: "24.8%",   change: "-1.4%",  up: false, icon: <EyeOutlined />,          iconColor: "#ef4444", iconBg: "#fef2f2" },
  ];
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {stats.map((s) => <StatCard key={s.title} dark={dark} {...s} />)}
    </div>
  );
}