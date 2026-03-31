"use client";
import StatCard from "./StatCard";
import { UserOutlined, ShopOutlined, ShoppingOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { sellerAPI } from "@/lib/api/seller";

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
        const API_BASE = 'https://outfitslab.onrender.com';

        const [adminRes, shopData] = await Promise.all([
          fetch(`${API_BASE}/api/admin/stats`),
          sellerAPI.getApprovedShopsWithGrowth(),
        ]);

        if (!adminRes.ok) {
          console.error("Admin API lỗi:", adminRes.status);
          return;
        }

        const data = await adminRes.json();
        console.log("ADMIN STATS DATA:", data);
        console.log("APPROVED SHOPS DATA:", shopData);

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

        const shopChangeText = shopData.percentChange >= 0
          ? `+${shopData.percentChange}%`
          : `${shopData.percentChange}%`;

        setStats([
          {
            title: "Tổng số người dùng",
            value: formatNumber(usersOverview.total),
            change: `+${usersOverview.growthRate || 0}%`,
            up: true,
            icon: <UserOutlined />,
            iconColor: "#f59e0b",
            iconBg: "#fffbeb"
          },
          {
            title: "Shop đăng ký thành công",
            value: formatNumber(shopData.currentCount),
            change: shopChangeText,
            up: shopData.percentChange >= 0,
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