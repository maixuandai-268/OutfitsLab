'use client';
import React from 'react';
import SectionTitle from './SectionTitle';
import TimelineItem from './TimelineItem';
import { FlagOutlined, StarFilled, ClockCircleOutlined } from '@ant-design/icons';
import Card from './Card';

const TimelineSection: React.FC = () => {
  const items = [
    { year: '2023', text: 'Khởi động CustomOutfit3D', icon: <FlagOutlined /> },
    { year: '2024', text: 'Ra mắt demo try-on realtime', icon: <ClockCircleOutlined /> },
    { year: '2025', text: 'Onboard brand đầu tiên & pilot KOLs', icon: <StarFilled /> },
  ];

  return (
    <section className="space-y-4">
      <SectionTitle title="Our Journey" />
      <Card>
        <ol className="relative border-l border-gray-200 space-y-4 pl-4">
          {items.map((it) => (
            <TimelineItem key={it.year} year={it.year} text={it.text} icon={it.icon} />
          ))}
        </ol>
      </Card>
    </section>
  );
};

export default TimelineSection;