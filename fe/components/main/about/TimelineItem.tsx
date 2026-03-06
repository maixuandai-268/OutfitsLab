'use client';
import React from 'react';

type Props = {
  year: string;
  text: string;
  icon?: React.ReactNode;
};

const TimelineItem: React.FC<Props> = ({ year, text, icon }) => {
  return (
    <li className="relative pl-8">
      <span className="absolute left-0 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gray-200">
        {icon ?? <span className="h-2 w-2 rounded-full bg-gray-600" />}
      </span>
      <p className="text-sm text-gray-500">{year}</p>
      <p className="font-medium">{text}</p>
    </li>
  );
};

export default TimelineItem;