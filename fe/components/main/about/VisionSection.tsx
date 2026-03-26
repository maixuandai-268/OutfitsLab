'use client';
import React from 'react';
import { EyeOutlined, RocketOutlined, CrownFilled } from '@ant-design/icons';

const VisionSection: React.FC = () => {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="hidden md:block rounded-2xl overflow-hidden shadow-2xl bg-gray-50 aspect-square relative order-2 md:order-1">
           <div className="absolute inset-0 from-gray-100 to-white flex items-center justify-center">
              <EyeOutlined className="text-8xl text-gray-200" />
           </div>
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Tầm nhìn</h2>
          <h3 className="text-4xl font-extrabold text-gray-900 mb-6">Một hệ sinh thái kết nối</h3>
          <p className="text-gray-600 mb-10 leading-relaxed text-lg">
            Xây dựng hệ sinh thái thời trang 3D từ việc số hóa studio cho tới marketplace, 
            biến mọi gian hàng thành một “phòng thử đồ số” hiện đại.
          </p>
          <ul className="space-y-6">
            <li className="flex items-center gap-4 text-gray-800 font-semibold tracking-wide">
              <span className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100"><EyeOutlined className="text-xl text-gray-500" /></span> 
              Khắc hoạ chân thực từng sợi vải và người mẫu
            </li>
            <li className="flex items-center gap-4 text-gray-800 font-semibold tracking-wide">
              <span className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100"><RocketOutlined className="text-xl text-gray-500" /></span> 
              Xử lý và tải nghiệm hình ảnh siêu tốc theo thời gian thực
            </li>
            <li className="flex items-center gap-4 text-gray-800 font-semibold tracking-wide">
              <span className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100"><CrownFilled className="text-xl text-gray-500" /></span> 
              Gắn kết chặt chẽ giá trị giữa người dùng, thương hiệu và chuyên gia
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
export default VisionSection;