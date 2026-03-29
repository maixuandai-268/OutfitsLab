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
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const response = await fetch(`${API_BASE}/api/admin/stats`);

        if (!response.ok) {
          console.error('Failed to fetch admin stats');
          return;
        }

        const data: AdminStatsData = await response.json();

        // Helper function to calculate growth percentage
        const calculateGrowth = (thisMonth: number, lastMonth: number) => {
          if (lastMonth === 0) return { growth: "0%", up: true };
          const growthPercent = ((thisMonth - lastMonth) / lastMonth) * 100;
          const formattedGrowth = growthPercent >= 0
            ? `+${growthPercent.toFixed(1)}%`
            : `${growthPercent.toFixed(1)}%`;
          return { growth: formattedGrowth, up: growthPercent >= 0 };
        };

        // Parse data from API
        let usersThisMonth = 0;
        let usersLastMonth = 0;
        let shopsThisMonth = 0;
        let shopsLastMonth = 0;
        let productsThisMonth = 0;
        let productsLastMonth = 0;

        if (data.summary && Array.isArray(data.summary)) {
          data.summary.forEach((item) => {
            if (item.label?.toLowerCase().includes('user')) {
              usersThisMonth = item.thisMonth || item.value || 0;
              usersLastMonth = item.lastMonth || 0;
            } else if (item.label?.toLowerCase().includes('shop')) {
              shopsThisMonth = item.thisMonth || item.value || 0;
              shopsLastMonth = item.lastMonth || 0;
            } else if (item.label?.toLowerCase().includes('product')) {
              productsThisMonth = item.thisMonth || item.value || 0;
              productsLastMonth = item.lastMonth || 0;
            }
          });
        }

        // Calculate growth for each metric
        const { growth: usersGrowth, up: usersUp } = calculateGrowth(usersThisMonth, usersLastMonth);
        const { growth: shopsGrowth, up: shopsUp } = calculateGrowth(shopsThisMonth, shopsLastMonth);
        const { growth: productsGrowth, up: productsUp } = calculateGrowth(productsThisMonth, productsLastMonth);

        // Format numbers with thousand separators
        const formatNumber = (num: number) => {
          return num.toLocaleString('vi-VN');
        };

        // Update stats with real data
        setStats([
          {
            title: "Tổng số người dùng",
            value: formatNumber(usersThisMonth),
            change: usersGrowth,
            up: usersUp,
            icon: <UserOutlined />,
            iconColor: "#f59e0b",
            iconBg: "#fffbeb"
          },
          {
            title: "Shop đăng ký thành công",
            value: formatNumber(shopsThisMonth),
            change: shopsGrowth,
            up: shopsUp,
            icon: <ShopOutlined />,
            iconColor: "#6366f1",
            iconBg: "#eef2ff"
          },
          {
            title: "Sản phẩm đăng trên sàn",
            value: formatNumber(productsThisMonth),
            change: productsGrowth,
            up: productsUp,
            icon: <ShoppingOutlined />,
            iconColor: "#10b981",
            iconBg: "#ecfdf5"
          },
        ]);
      } catch (error) {
        console.error('Error fetching admin stats:', error);
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