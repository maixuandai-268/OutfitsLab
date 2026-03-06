'use client';
import React from 'react';
import SectionTitle from './SectionTitle';

const CtaSection: React.FC = () => {
  return (
    <section className="space-y-4 text-center">
      <SectionTitle title="Ready to Join Our Community?" />
      <p className="text-gray-700">
        Đăng ký sớm để nhận ưu đãi digitize và demo TRY-ON cho bộ sưu tập của bạn.
      </p>
      <div className="flex justify-center gap-3">
        <button className="rounded-md bg-black px-4 py-2 text-white">Get Started</button>
        <button className="rounded-md border px-4 py-2">Request a Demo</button>
      </div>
    </section>
  );
};

export default CtaSection;
