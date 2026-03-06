'use client';
import React from 'react';
import SectionTitle from './SectionTitle';
import { BulbOutlined, TeamOutlined, ThunderboltOutlined } from '@ant-design/icons';

const MissionSection: React.FC = () => {
  return (
    <section className="space-y-4">
      <SectionTitle title="Our Mission" />
      <p className="text-gray-700">
        Cắt giảm chi phí mẫu, rút ngắn thời gian ra mắt sản phẩm, và nâng trải nghiệm thử đồ bằng công nghệ 3D thời gian thực.
      </p>
      <ul className="grid gap-3 md:grid-cols-3">
        <li className="flex items-start gap-2">
          <ThunderboltOutlined className="text-yellow-500 mt-1" />
          <span>Giảm vòng lặp mẫu (prototype) tốn kém</span>
        </li>
        <li className="flex items-start gap-2">
          <TeamOutlined className="text-blue-600 mt-1" />
          <span>Đồng bộ team thiết kế – sản xuất</span>
        </li>
        <li className="flex items-start gap-2">
          <BulbOutlined className="text-emerald-600 mt-1" />
          <span>Tăng tỉ lệ chuyển đổi khi thử đồ online</span>
        </li>
      </ul>
    </section>
  );
};

export default MissionSection;