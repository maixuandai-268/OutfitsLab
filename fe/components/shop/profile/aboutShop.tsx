'use client';
import React from 'react';
import { CalendarIcon, MapPinIcon, ZapIcon, InfoIcon } from 'lucide-react';

interface Shop {
  location: string;
  created_at: string;
}

interface AboutShopProps {
  shop: Shop;
}

export const AboutShop = ({ shop }: AboutShopProps) => {

  // Định dạng ngày tham gia thân thiện hơn
  const joinDate = shop.created_at ? new Date(shop.created_at).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }) : 'Tham gia từ đầu 2024';

  const stats = [
    {
      label: 'Thành Viên Từ',
      value: joinDate,
      icon: <CalendarIcon className="w-5 h-5 text-pink-500" />,
      color: 'bg-pink-50'
    },
    {
      label: 'Địa Điểm',
      value: shop.location || 'Chưa cập nhật',
      icon: <MapPinIcon className="w-5 h-5 text-amber-500" />,
      color: 'bg-amber-50'
    },
    {
      label: 'Tỷ Lệ Phản Hồi',
      value: '98% trong 24h',
      icon: <ZapIcon className="w-5 h-5 text-sky-500" />,
      color: 'bg-sky-50'
    }
  ];

  return (
    <div className="relative mb-14">
        {/* Section Heading with Accent */}
        <div className="flex items-center gap-3 mb-8">
           <div className="h-8 w-1.5 bg-pink-500 rounded-full" />
           <h3 className="text-2xl font-black text-gray-900 tracking-tight">VỀ CHÚNG TÔI</h3>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {stats.map((stat, idx) => (
             <div key={idx} className="flex flex-col gap-4 p-7 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className={`${stat.color} w-12 h-12 flex items-center justify-center rounded-2xl`}>
                   {stat.icon}
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-xl font-extrabold text-gray-800 line-clamp-1">{stat.value}</p>
                </div>
             </div>
           ))}
        </div>

        {/* Story Section */}
        <div className="mt-8 p-8 bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-100 flex items-start gap-5">
           <div className="p-3 bg-white rounded-2xl shadow-sm">
              <InfoIcon className="w-6 h-6 text-gray-400" />
           </div>
           <p className="text-gray-500 text-base leading-relaxed font-medium">
             Tận tâm mang đến những trải nghiệm thời trang tốt nhất với sự chú trọng đến từng đường kim mũi chỉ và chất liệu an toàn cho người mặc. Cam kết hỗ trợ khách hàng nhanh chóng và chu đáo nhất.
           </p>
        </div>
    </div>
  );
};