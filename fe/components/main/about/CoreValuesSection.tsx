'use client';
import React from 'react';
import SectionTitle from './SectionTitle';
import { HeartOutlined, BulbOutlined, TeamOutlined, SafetyOutlined } from '@ant-design/icons';
import Card from './Card';

const CoreValuesSection: React.FC = () => {
  const values = [
    { title: 'Passion for Fashion', desc: 'Sống cùng sản phẩm, sáng tạo vì người mặc.', icon: <HeartOutlined /> },
    { title: 'Innovation', desc: 'Liên tục thử nghiệm công nghệ 3D/AI mới.', icon: <BulbOutlined /> },
    { title: 'Community First', desc: 'Trao quyền cho designer, brand và người dùng.', icon: <TeamOutlined /> },
    { title: 'Accessibility', desc: 'Trải nghiệm mượt trên mọi thiết bị.', icon: <SafetyOutlined /> },
  ];

  return (
    <section className="space-y-4">
      <SectionTitle title="Core Values" />
      <div className="grid gap-4 md:grid-cols-2">
        {values.map((v) => (
          <Card key={v.title} className="flex items-start gap-3">
            <div className="text-primary text-xl mt-1">{v.icon}</div>
            <div>
              <h5 className="font-semibold">{v.title}</h5>
              <p className="text-gray-600">{v.desc}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CoreValuesSection;