"use client";
import StatCard from "./StatCard";
import { UserOutlined, ShopOutlined, ShoppingOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";

interface StatsRowProps {
  dark: boolean;
}

interface AdminStatsData {
  summary?: Array<{
    label: string;
    value: number;
    growth: string;
    thisMonth?: number;
    lastMonth?: number;
  }>;
  salesChart?: Array<{ month: string; amount: number }>;
  systemHealth?: { uptime: number; latency: number; dbLoad: number; errorRate: number };
}

export default function StatsRow({ dark }: StatsRowProps) {
  const [stats, setStats] = useState([
    {
      title: "Tổng số người dùng",
      value: "0",
      change: "0%",
      up: true,
      icon: <UserOutlined />,
      iconColor: "#f59e0b",
      iconBg: "#fffbeb"
    },
    {
      title: "Shop đăng ký thành công",
      value: "0",
      change: "0%",
      up: true,
      icon: <ShopOutlined />,
      iconColor: "#6366f1",
      iconBg: "#eef2ff"
    },
    {
      title: "Sản phẩm đăng trên sàn",
      value: "0",
      change: "0%",
      up: true,
      icon: <ShoppingOutlined />,
      iconColor: "#10b981",
      iconBg: "#ecfdf5"
    },
  ]);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const API_BASE = 'http://localhost:3000';

        const res = await fetch(`${API_BASE}/api/admin/stats`);

        if (!res.ok) {
          console.error("API lỗi:", res.status);
          return;
        }

        const data = await res.json();
        console.log("DATA:", data);

        const usersOverview = data.users?.overview || {
          total: 0,
          growthRate: 0,
        };

        const productsOverview = data.products?.overview || {
          total: 0,
          growthRate: 0,
        };

        const formatNumber = (num: number): string =>
          Number(num || 0).toLocaleString("vi-VN");

        interface StatsRowProps {
          dark: boolean;
        }

        setStats([
          {
            title: "Tổng số người dùng",
            value: "0",   // ⚠️ bạn chưa có users API
            change: "0%",
            up: true,
            icon: <UserOutlined />,
            iconColor: "#f59e0b",
            iconBg: "#fffbeb"
          },
          {
            title: "Shop đăng ký thành công",
            value: formatNumber(usersOverview.total),
            change: `+${usersOverview.growthRate || 0}%`,
            up: true,
            icon: <ShopOutlined />,
            iconColor: "#6366f1",
            iconBg: "#eef2ff"
          },
          {
            title: "Sản phẩm đăng trên sàn",
            value: formatNumber(productsOverview.total),
            change: `+${productsOverview.growthRate || 0}%`,
            up: true,
            icon: <ShoppingOutlined />,
            iconColor: "#10b981",
            iconBg: "#ecfdf5"
          },
        ]);
      } catch (err) {
        console.error("Fetch lỗi:", err);
      }
    };

    fetchAdminStats();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {stats.map((s) => <StatCard key={s.title} dark={dark} {...s} />)}
    </div>
  );
}