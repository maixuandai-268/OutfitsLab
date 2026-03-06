'use client';
import React from 'react';
import SectionTitle from './SectionTitle';
import { EyeOutlined, RocketOutlined, CrownFilled } from '@ant-design/icons';

const VisionSection: React.FC = () => {
  return (
    <section className="space-y-4">
      <SectionTitle title="Our Vision" />
      <p className="text-gray-700">
        Xây dựng hệ sinh thái 3D Fashion từ studio số hóa đến marketplace thử đồ, đưa mọi thương hiệu lên “phòng thử đồ số”.
      </p>
      <ul className="grid gap-3 md:grid-cols-3">
        <li className="flex items-start gap-2">
          <EyeOutlined className="text-indigo-600 mt-1" />
          <span>Digitize sản phẩm và avatar chính xác</span>
        </li>
        <li className="flex items-start gap-2">
          <RocketOutlined className="text-rose-600 mt-1" />
          <span>Hạ tầng realtime try-on tốc độ cao</span>
        </li>
        <li className="flex items-start gap-2">
          <CrownFilled className="text-amber-500 mt-1" />
          <span>Kết nối thương hiệu – người dùng – KOLs</span>
        </li>
      </ul>
    </section>
  );
};

export default VisionSection;