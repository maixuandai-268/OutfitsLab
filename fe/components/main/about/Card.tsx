'use client';
import React from 'react';
import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Card: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={clsx('rounded-xl border border-gray-200 p-5 shadow-sm bg-white', className)}>
      {children}
    </div>
  );
};

export default Card;