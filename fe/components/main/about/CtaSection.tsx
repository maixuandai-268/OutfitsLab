'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRightOutlined } from '@ant-design/icons';

const CtaSection: React.FC = () => {
  return (
    <section className="bg-white py-24 md:py-40 text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">Sẵn sàng trải nghiệm <br/>kỷ nguyên thời trang mới?</h2>
        <p className="text-xl text-gray-500 mb-12 font-medium">
          Đăng ký sớm nhất ngay hôm nay để nhận ưu đãi digitize và demo phòng thử đồ TRY-ON.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/try-on" className="inline-flex justify-center items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all hover:scale-105 shadow-xl shadow-gray-200 text-lg">
            Khám phá phòng thử đồ <ArrowRightOutlined />
          </Link>
          <button className="inline-flex justify-center items-center px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-colors text-lg">
            Yêu cầu Tư vấn
          </button>
        </div>
      </div>
    </section>
  );
};
export default CtaSection;
