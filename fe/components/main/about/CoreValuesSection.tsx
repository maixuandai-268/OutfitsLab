'use client';
import React from 'react';
import { HeartOutlined, BulbOutlined, TeamOutlined, SafetyOutlined } from '@ant-design/icons';

const CoreValuesSection: React.FC = () => {
  const values = [
    { title: 'Đam mê thời trang', desc: 'Lấy thời trang làm cảm hứng sáng tạo cho cuộc sống.', icon: <HeartOutlined /> },
    { title: 'Tiến bước mỗi ngày', desc: 'Luôn tìm kiếm và mang công nghệ 3D/AI đột phá vào thực tế.', icon: <BulbOutlined /> },
    { title: 'Cộng đồng làm cốt lõi', desc: 'Thấu hiểu giá trị của người tạo ra tác phẩm thiết kế.', icon: <TeamOutlined /> },
    { title: 'Trải nghiệm mượt mà', desc: 'Đem một giao diện ổn định, thích ứng trên mọi thiết bị.', icon: <SafetyOutlined /> },
  ];

  return (
    <section className="bg-gray-50 py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 text-center">Giá trị cốt lõi</h2>
        <h3 className="text-4xl font-extrabold text-gray-900 mb-16 text-center">Những nguyên tắc chúng tôi gìn giữ</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-white shadow-lg hover:-translate-y-1 border border-gray-300">
              <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center text-2xl mb-6 text-gray-700">
                {v.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{v.title}</h4>
              <p className="text-gray-500 leading-relaxed font-medium">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default CoreValuesSection;