'use client';
import React from 'react';
import Card from './Card';

type Badge = { text: string; icon: React.ReactNode };

type Props = {
  name: string;
  role: string;
  desc: string;
  badges?: Badge[];
  icon?: React.ReactNode;
};

const MemberCard: React.FC<Props> = ({ name, role, desc, badges = [], icon }) => {
  return (
    <Card className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <div className="text-2xl">{icon}</div>
        <div>
          <h6 className="font-semibold">{name}</h6>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
      <p className="text-gray-700">{desc}</p>
      {badges.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {badges.map((b, i) => (
            <span
              key={`${b.text}-${i}`}
              className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
            >
              {b.icon}
              {b.text}
            </span>
          ))}
        </div>
      )}
    </Card>
  );
};

export default MemberCard;