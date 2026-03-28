'use client'

import React, { useEffect, useState, useMemo } from 'react';
import {
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  LinkOutlined,
  ShoppingOutlined
} from "@ant-design/icons";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { useAuth } from '@/context/AuthContext';
import { useParams } from 'next/navigation';
import { Spin, Empty } from 'antd';

// Đã loại bỏ hoàn toàn mốc dữ liệu tĩnh (mocking data)

export default function AnalyticsPage() {
  const { token } = useAuth();
  const params = useParams();
  const shopId = params.id;
  
  const [products, setProducts] = useState<any[]>([]);
  const [shopData, setShopData] = useState<any>(null);
  const [viewStats, setViewStats] = useState<{ month: number; views: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!shopId || !token) return;
      try {
        const [resProd, resShop, resViews] = await Promise.all([
          fetch(`http://localhost:3000/api/products?shop_id=${shopId}&limit=100`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`http://localhost:3000/api/shops/${shopId}`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`http://localhost:3000/api/shops/${shopId}/view-stats`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        
        if (resProd.ok) {
          const json = await resProd.json();
          setProducts(json.data || json);
        }
        if (resShop.ok) {
          const json = await resShop.json();
          setShopData(json);
        }
        if (resViews.ok) {
          const json = await resViews.json();
          setViewStats(json);
        }
      } catch (error) {
        console.error("Lỗi lấy dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [shopId, token]);

  // Tính toán dữ liệu từ mango products + viewStats thực tế từ DB
  const { totalAffiliateClicks, totalSales, monthlyData, totalViews } = useMemo(() => {
    let totalAffiliateClicks = 0;
    let totalSales = 0;

    // Khởi tạo mảng 12 tháng, gán views từ API /view-stats
    const monthsArray = Array.from({ length: 12 }, (_, i) => ({
      name: `Tháng ${i + 1}`,
      clicks: 0,
      views: viewStats.find(s => s.month === i + 1)?.views ?? 0,
    }));

    products.forEach(p => {
      const clicks = Number(p.affiliateClicks) || 0;
      totalAffiliateClicks += clicks;
      totalSales += (Number(p.salesCount) || 0);

      const dateStr = p.createdAt || p.created_at;
      if (dateStr) {
        const d = new Date(dateStr);
        const monthIndex = d.getMonth();
        if (monthIndex >= 0 && monthIndex < 12) {
          monthsArray[monthIndex].clicks += clicks;
        }
      }
    });

    const totalViews = viewStats.reduce((sum, s) => sum + s.views, 0);

    return { totalAffiliateClicks, totalSales, monthlyData: monthsArray, totalViews };
  }, [products, viewStats]);

  if (loading) {
    return <div className="h-96 flex justify-center items-center"><Spin size="large" description="Đang tải dữ liệu phân tích..." /></div>;
  }
  return (
    <div className="space-y-7">
      <h2 className="text-2xl font-bold mb-5">Phân tích cửa hàng</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">

        <div className="bg-white border border-[#d19f42] rounded-4xl px-7 py-10">
          <p className="text-lg font-bold mb-8">
            <LinkOutlined className="mr-2" /> Lượt Truy Cập Affiliate Theo Tháng
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} interval={0} />
                <Tooltip cursor={{ fill: '#fdf8ef' }} contentStyle={{ borderRadius: '12px', border: '1px solid #d19f42' }} />
                <Bar dataKey="clicks" name="Lượt truy cập Affiliate" fill="#d19f42" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-[#d19f42] rounded-4xl px-7 py-10">
          <p className="text-lg font-bold mb-8">
            <LineChartOutlined className="mr-2" /> Lượt Xem Cửa Hàng Theo Tháng
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} interval={0} />
                <Tooltip cursor={{ fill: '#f0f9f9' }} contentStyle={{ borderRadius: '12px', border: '1px solid #46a39f' }} />
                <Bar dataKey="views" name="Lượt xem" fill="#46a39f" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      <div className="bg-white border border-[#d19f42] rounded-4xl px-7 py-10">
        <p className="text-lg font-bold mb-7"><PieChartOutlined /> Tổng quan hiệu suất</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="border-l-4 border-[#d19f42] pl-5">
            <p className="text-sm font-bold text-gray-400 uppercase">Tổng lượt truy cập Affiliate</p>
            <h4 className="text-4xl font-black text-slate-800 mt-2">{totalAffiliateClicks.toLocaleString()} Click</h4>
            <p className="text-green-600 text-sm font-bold mt-1">Dữ liệu thực tế từ toàn bộ sản phẩm</p>
          </div>

          <div className="border-l-4 border-[#46a39f] pl-5">
            <p className="text-sm font-bold text-gray-400 uppercase">Tổng Số Lượng Đã Bán</p>
            <h4 className="text-4xl font-black text-slate-800 mt-2">{totalSales.toLocaleString()} Sản phẩm</h4>
            <p className="text-green-600 text-sm font-bold mt-1">Được thống kê theo hệ thống</p>
          </div>
        </div>
      </div>

      <div className="flex gap-5">
        <button className="text-white bg-[#d19f42] px-7 py-3 rounded-xl font-bold border border-[#d19f42] hover:bg-white hover:text-[#d19f42] transition-all shadow-lg shadow-orange-100">
          Xuất Báo Cáo (.PDF)
        </button>
        <button className="text-[#d19f42] bg-white px-7 py-3 rounded-xl font-bold border border-[#d19f42] hover:bg-orange-50 transition-all">
          Làm Mới Dữ Liệu
        </button>
      </div>
    </div>
  );
}