"use client";

import Link from "next/link";
import { RightOutlined } from "@ant-design/icons";

export default function FashionCTA() {
  return (
    <section className="relative isolate">

      <div className="mx-auto max-w-7.5xl px-6 md:px-8 py-10 md:py-12">
        <div className="text-center">
          <h2 className="text-[20px] md:text-[28px] font-extrabold tracking-tight text-[#111827]">
            Sẵn Sàng Bắt Đầu Cuộc Hành Trình Thời Trang Của Bạn?
          </h2>

          <p className="mt-2 text-sm md:text-base text-[#6B7280]">
            Khám phá hàng ngàn mẫu outfit hoặc tạo gian hàng riêng của bạn
          </p>

          <div className="mt-5 flex justify-center">
            <Link
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C58A2B] px-5 py-2 text-white text-sm font-semibold shadow-sm transition-colors hover:bg-[#b47e27] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C58A2B]"
            >
              Khám Phá Ngay
              <RightOutlined className="text-[12px]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
