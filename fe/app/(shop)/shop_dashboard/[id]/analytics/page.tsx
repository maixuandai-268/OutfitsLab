'use client'

import React, { useEffect, useState, useMemo } from 'react';
import {
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  LinkOutlined,
  ShoppingOutlined,
  FilePdfOutlined,
  ReloadOutlined
} from "@ant-design/icons";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, AreaChart, Area
} from 'recharts';
import { useAuth } from '@/context/AuthContext';
import { useParams } from 'next/navigation';
import { Spin, Empty } from 'antd';

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
          fetch(`https://outfitslab.onrender.com/api/products?shop_id=${shopId}&limit=100`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`https://outfitslab.onrender.com/api/shops/${shopId}`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`https://outfitslab.onrender.com/api/shops/${shopId}/view-stats`, { headers: { Authorization: `Bearer ${token}` } }),
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

  const { totalAffiliateClicks, totalSales, monthlyData, totalViews } = useMemo(() => {
    let totalAffiliateClicks = 0;
    let totalSales = 0;

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

        <div className="bg-white border border-gray-100 rounded-[2.5rem] px-8 py-10 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-lg font-black mb-8 flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-2xl flex items-center justify-center">
              <LinkOutlined className="text-amber-500 text-xl" />
            </div>
            Lượt Truy Cập Affiliate Theo Tháng
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={1} />
                    <stop offset="95%" stopColor="#d19f42" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} interval={0} />
                <YAxis hide />
                <Tooltip cursor={{ fill: '#fef3c7', opacity: 0.4 }} contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '15px' }} />
                <Bar dataKey="clicks" name="Lượt truy cập Affiliate" fill="url(#colorClicks)" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-[2.5rem] px-8 py-10 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-lg font-black mb-8 flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-50 rounded-2xl flex items-center justify-center">
              <LineChartOutlined className="text-teal-500 text-xl" />
            </div>
            Lượt Xem Cửa Hàng Theo Tháng
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={1} />
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} interval={0} />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: '#f0fdfa', opacity: 0.4 }}
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '15px' }}
                  itemStyle={{ fontWeight: 'black', color: '#14b8a6' }}
                />
                <Bar dataKey="views" name="Lượt xem" fill="url(#colorViews)" radius={[10, 10, 0, 0]} />
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

      <div className="flex flex-col sm:flex-row gap-5 pt-8">
        <button className="px-8 py-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl shadow-slate-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group">
          <FilePdfOutlined className="text-xl group-hover:scale-110 transition-transform" />
          Xuất Báo Cáo PDF
        </button>
        <button className="px-8 py-4 bg-white text-slate-900 border-2 border-slate-100 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-sm hover:border-amber-400 hover:bg-amber-50/30 active:scale-95 transition-all flex items-center justify-center gap-3 group">
          <ReloadOutlined className="text-xl group-hover:rotate-180 transition-transform duration-700" />
          Làm Mới Dữ Liệu
        </button>
      </div>
    </div>
  );
}