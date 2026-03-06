'use client'

import React from 'react';
import { 
  BarChartOutlined, 
  LineChartOutlined, 
  PieChartOutlined 
} from "@ant-design/icons";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell 
} from 'recharts';

const revenueData = [
  { week: 'Week 1', total: 400 },
  { week: 'Week 2', total: 650 },
  { week: 'Week 3', total: 700 },
  { week: 'Week 4', total: 850 },
  { week: 'Week 5', total: 780 },
  { week: 'Week 6', total: 880 },
  { week: 'Week 7', total: 950 },
];

const storeViewsData = [
  { month: 'Jan', views: 300 },
  { month: 'Feb', views: 500 },
  { month: 'Mar', views: 450 },
  { month: 'Apr', views: 600 },
  { month: 'May', views: 750 },
  { month: 'Jun', views: 800 },
  { month: 'Jul', views: 850 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-7">
      <h2 className="text-2xl font-bold mb-5">Store Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
        
        <div className="bg-white border border-[#d19f42] rounded-4xl px-7 py-10">
          <p className="text-lg font-bold mb-8">
            <BarChartOutlined /> Revenue Trend
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <Tooltip cursor={{fill: '#fdf8ef'}} contentStyle={{borderRadius: '12px', border: '1px solid #d19f42'}} />
                <Bar dataKey="total" fill="#d19f42" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-[#d19f42] rounded-4xl px-7 py-10">
          <p className="text-lg font-bold mb-8">
            <LineChartOutlined /> Store Views
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={storeViewsData}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <Tooltip cursor={{fill: '#f0f9f9'}} contentStyle={{borderRadius: '12px', border: '1px solid #46a39f'}} />
                <Bar dataKey="views" fill="#46a39f" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      <div className="bg-white border border-[#d19f42] rounded-4xl px-7 py-10">
        <p className="text-lg font-bold mb-7"><PieChartOutlined /> Performance Summary</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="border-l-4 border-[#d19f42] pl-5">
            <p className="text-sm font-bold text-gray-400 uppercase">Conversion Rate</p>
            <h4 className="text-4xl font-black text-slate-800 mt-2">3.5%</h4>
            <p className="text-green-600 text-sm font-bold mt-1">+0.8% vs last month</p>
          </div>

          <div className="border-l-4 border-[#46a39f] pl-5">
            <p className="text-sm font-bold text-gray-400 uppercase">Avg Order Value</p>
            <h4 className="text-4xl font-black text-slate-800 mt-2">$78.50</h4>
            <p className="text-green-600 text-sm font-bold mt-1">+$12 vs last month</p>
          </div>
        </div>
      </div>

      <div className="flex gap-5">
        <button className="text-white bg-[#d19f42] px-7 py-3 rounded-xl font-bold border border-[#d19f42] hover:bg-white hover:text-[#d19f42] transition-all shadow-lg shadow-orange-100">
          Export Report (.PDF)
        </button>
        <button className="text-[#d19f42] bg-white px-7 py-3 rounded-xl font-bold border border-[#d19f42] hover:bg-orange-50 transition-all">
          Refresh Data
        </button>
      </div>
    </div>
  );
}