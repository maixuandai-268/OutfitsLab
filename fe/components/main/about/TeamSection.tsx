'use client';
import React from 'react';
import SectionTitle from './SectionTitle';
import MemberCard from './MemberCard';
import { UserOutlined, CrownFilled, BulbOutlined, SmileOutlined, MessageOutlined } from '@ant-design/icons';

const TeamSection: React.FC = () => {
  return (
    <section className="space-y-4">
      <SectionTitle title="Team" />
      <div className="grid gap-4 md:grid-cols-2">
        <MemberCard
          name="Mai Xuân Đại"
          role="Founder / CEO"
          desc="Định hướng sản phẩm, phát triển đối tác chiến lược."
          icon={<CrownFilled className="text-amber-500" />}
          badges={[
            { text: 'Leadership', icon: <UserOutlined /> },
            { text: 'Strategy', icon: <MessageOutlined /> },
          ]}
        />
        <MemberCard
          name="Trần Ngọc Tú"
          role="Head of 3D"
          desc="Quy trình digitize, shading, sim vật lý vải."
          icon={<BulbOutlined className="text-indigo-600" />}
          badges={[
            { text: 'CLO/Blender', icon: <UserOutlined /> },
            { text: 'PBR', icon: <SmileOutlined /> },
          ]}
        />
        <MemberCard
          name="Nguyễn Văn Công"
          role="Lead Frontend"
          desc="Realtime try-on, web performance & DX."
          icon={<BulbOutlined className="text-emerald-600" />}
          badges={[
            { text: 'WebGL', icon: <UserOutlined /> },
            { text: 'UX', icon: <SmileOutlined /> },
          ]}
        />
        <MemberCard
          name="Nguyễn Đức Duyệt"
          role="Partnership"
          desc="Kết nối brand, KOLs, cộng đồng thiết kế."
          icon={<MessageOutlined className="text-rose-600" />}
          badges={[
            { text: 'Networking', icon: <UserOutlined /> },
            { text: 'BD', icon: <SmileOutlined /> },
          ]}
        />
        <MemberCard
          name="Phạm Quang Trung"
          role="3D Artist"
          desc="Hỗ trợ digitize, shading, sim vật lý vải."
          icon={<BulbOutlined className="text-indigo-600" />}
          badges={[
            { text: 'CLO/Blender', icon: <UserOutlined /> },
            { text: 'PBR', icon: <SmileOutlined /> },
          ]}
        />
      </div>
    </section>
  );
};

export default TeamSection;
