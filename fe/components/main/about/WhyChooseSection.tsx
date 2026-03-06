'use client';
import React from 'react';
import SectionTitle from './SectionTitle';
import Card from './Card';
import { CheckCircleTwoTone, SafetyOutlined, TeamOutlined } from '@ant-design/icons';

const WhyChooseSection: React.FC = () => {
  const items = [
    {
      title: 'Efficiency First',
      desc: 'Tối ưu chi phí – thời gian, quy trình minh bạch, dễ tích hợp.',
      icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
    },
    {
      title: 'Quality Assured',
      desc: 'Chuẩn quét – vật liệu – ánh sáng đồng nhất, đúng PBR.',
      icon: <SafetyOutlined className="text-blue-600" />,
    },
    {
      title: 'Community Driven',
      desc: 'Liên tục cải tiến dựa trên phản hồi thực tế.',
      icon: <TeamOutlined className="text-purple-600" />,
    },
  ];

  return (
    <section className="space-y-4">
      <SectionTitle title="Why Choose CustomOutfit3D" />
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((it) => (
          <Card key={it.title}>
            <div className="flex items-start gap-3">
              <div className="text-xl">{it.icon}</div>
              <div>
                <h6 className="font-semibold">{it.title}</h6>
                <p className="text-gray-600">{it.desc}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseSection;