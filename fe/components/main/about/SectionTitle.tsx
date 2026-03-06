'use client';
import React from 'react';

type Props = {
  title: string;
  subtitle?: string;
  className?: string;
};

const SectionTitle: React.FC<Props> = ({ title, subtitle, className }) => {
  return (
    <header className={className}>
      <h4 className="text-2xl font-semibold">{title}</h4>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </header>
  );
};

export default SectionTitle;