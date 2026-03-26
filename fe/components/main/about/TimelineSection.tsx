'use client';
import React from 'react';
import { FlagOutlined, StarFilled, ClockCircleOutlined } from '@ant-design/icons';

const TimelineSection: React.FC = () => {
  const items = [
    { year: '2023', text: 'Khởi động dự án CustomOutfit3D', icon: <FlagOutlined /> },
    { year: '2024', text: 'Ra mắt công nghệ Demo Try-On Realtime', icon: <ClockCircleOutlined /> },
    { year: '2025', text: 'Onboard thương hiệu đầu tiên & KOLs thử nghiệm', icon: <StarFilled /> },
  ];

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 text-center">Chặng đường</h2>
        <h3 className="text-4xl font-extrabold text-gray-900 mb-16 text-center">Hành trình chúng tôi đã qua</h3>
        <div className="relative border-l-2 border-gray-100 pl-8 ml-4 md:ml-0 space-y-12">
          {items.map((it) => (
            <div key={it.year} className="relative">
              <span className="absolute -left-[43px] top-1 w-10 h-10 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center text-gray-400">
                {it.icon}
              </span>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">{it.year}</h4>
              <p className="text-lg text-gray-500 font-medium">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default TimelineSection;