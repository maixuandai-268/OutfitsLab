'use client';
import React from 'react';
import { BulbOutlined, TeamOutlined, ThunderboltOutlined } from '@ant-design/icons';

const MissionSection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Sứ mệnh của chúng tôi</h2>
          <h3 className="text-4xl font-extrabold text-gray-900 mb-6">Tái định nghĩa quy trình làm việc</h3>
          <p className="text-gray-600 mb-10 leading-relaxed text-lg">
            Cắt giảm chi phí mẫu, rút ngắn thời gian ra mắt sản phẩm, và nâng tầm trải nghiệm thử đồ bằng công nghệ 3D thời gian thực.
          </p>
          <ul className="space-y-6">
            <li className="flex items-center gap-4 text-gray-800 font-semibold tracking-wide">
              <span className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)]"><ThunderboltOutlined className="text-xl text-gray-500" /></span> 
              Giảm vòng lặp làm mẫu (prototype) đắt đỏ
            </li>
            <li className="flex items-center gap-4 text-gray-800 font-semibold tracking-wide">
              <span className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)]"><TeamOutlined className="text-xl text-gray-500" /></span> 
              Kết nối xuyên suốt giữa thiết kế & sản xuất
            </li>
            <li className="flex items-center gap-4 text-gray-800 font-semibold tracking-wide">
              <span className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)]"><BulbOutlined className="text-xl text-gray-500" /></span> 
              Đột phá tỉ lệ chuyển đổi nhờ thử đồ trực tuyến
            </li>
          </ul>
        </div>
        <div className="hidden md:block rounded-[2.5rem] overflow-hidden shadow-2xl bg-white aspect-square relative">
           <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
              <ThunderboltOutlined className="text-8xl text-gray-200" />
           </div>
        </div>
      </div>
    </section>
  );
};
export default MissionSection;