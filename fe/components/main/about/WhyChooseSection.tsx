'use client';
import React from 'react';
import { CheckCircleTwoTone, SafetyOutlined, TeamOutlined } from '@ant-design/icons';

const WhyChooseSection: React.FC = () => {
  const items = [
    {
      title: 'Tối ưu hiệu suất',
      desc: 'Giảm thiểu thời gian, quy trình rõ ràng, minh bạch dễ dàng tích hợp vào hệ thống có sẵn.',
      icon: <CheckCircleTwoTone twoToneColor="#52c41a" className="text-2xl" />,
    },
    {
      title: 'Chất lượng đảm bảo',
      desc: 'Chụp quét ánh sáng chuyên môn cao, vật liệu PBR, độ chân thực chuẩn xác.',
      icon: <SafetyOutlined className="text-blue-600 text-2xl" />,
    },
    {
      title: 'Gắn kết thiết thực',
      desc: 'Không ngừng thay đổi và nâng cấp từ những phản hồi thật của cộng đồng.',
      icon: <TeamOutlined className="text-purple-600 text-2xl" />,
    },
  ];

  return (
    <section className="bg-gray-50 py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 text-center">Tại sao chọn chúng tôi</h2>
        <h3 className="text-4xl font-extrabold text-gray-900 mb-16 text-center">Sự khác biệt vượt trội</h3>
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((it) => (
             <div key={it.title} className="p-8 rounded-[2rem] bg-white border border-gray-100 flex flex-col items-center text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]">
               <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-6">
                 {it.icon}
               </div>
               <h6 className="text-xl font-bold text-gray-900 mb-4">{it.title}</h6>
               <p className="text-gray-500 font-medium leading-relaxed">{it.desc}</p>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default WhyChooseSection;