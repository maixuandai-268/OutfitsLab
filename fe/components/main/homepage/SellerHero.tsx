"use client";

import Link from "next/link";
import {
  ThunderboltOutlined, // Tăng Doanh Thu
  UploadOutlined,      // Nhập Sản Phẩm Dễ Dàng
  SafetyOutlined,      // Hỗ Trợ Toàn Bộ
} from "@ant-design/icons";

export default function SellerSection() {
  return (
    <section className="relative isolate">
      {/* Không set background tại đây — dùng màu nền của layout/page */}

      <div className="mx-auto max-w-7.5xl px-6 md:px-8 py-14 md:py-20">
        {/* Badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center rounded-full bg-[#E7F3FF] text-[#0B74DA] text-xs md:text-sm font-semibold px-3 py-1 border border-[#BFE0FF]">
            CHO CÁC NHÀ THIẾT KẾ
          </span>
        </div>

        {/* Title */}
        <h1 className="mt-5 text-center text-3xl md:text-5xl font-extrabold tracking-tight text-[#111827]">
          Trở Thành <span className="text-[#F59E0B]">Seller</span> Ngay Hôm Nay!
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-4 max-w-3xl text-center text-[15px] md:text-lg leading-relaxed text-[#6B7280]">
          Mở gian hàng cá nhân, nhập mẫu 3D sẵn có (GLB từ Blender), và bán cho cộng đồng.
          Đăng ký miễn phí chỉ trong 2 phút!
        </p>

        {/* Feature cards */}
        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
  <FeatureCard
    title="Tăng Doanh Thu"
    desc="Tiếp cận 50k+ user trên platform"
    icon={<ThunderboltOutlined style={{ color: "#F59E0B", fontSize: 20 }} />}
    tone="orange"
  />
  <FeatureCard
    title="Nhập Sản Phẩm Dễ Dàng"
    desc="Upload GLB, hình ảnh và chi tiết chỉ trong vài bước"
    icon={<UploadOutlined style={{ color: "#0EA5A4", fontSize: 20 }} />}
    tone="teal"
  />
  <FeatureCard
    title="Hỗ Trợ Toàn Bộ"
    desc="Team support 24/7 giúp bạn thành công"
    icon={<SafetyOutlined style={{ color: "#F59E0B", fontSize: 20 }} />}
    tone="yellow"
  />
</div>

        {/* CTAs */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="#dang-ky"
            className="inline-flex items-center rounded-full bg-[#DDA12C] hover:bg-[#c98f1f] text-white font-semibold px-5 py-3 transition-colors"
          >
            Đăng Ký Mở Gian Hàng
            <svg
              className="ml-2 h-4 w-4 opacity-90"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 5l5 5-5 5" />
            </svg>
          </Link>

          <Link
            href="#huong-dan"
            className="inline-flex items-center rounded-full border-2 border-[#14B8A6] text-[#0F766E] hover:bg-[#E6FFFB] font-semibold px-5 py-3 transition-colors bg-white"
          >
            Hướng Dẫn Nhập Sản Phẩm
            <svg
              className="ml-2 h-4 w-4 opacity-90"
              viewBox="0 0 20 20"
              fill="none"
              stroke="#14B8A6"
              strokeWidth="2"
            >
              <path d="M7 5l5 5-5 5" />
            </svg>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
  <Stat
    value={<span className="text-[#F59E0B]">15K+</span>}
    label="Seller Đã Tham Gia"
    align="center"
    boxed
  />
  <Stat
    value={<span className="text-[#059669]">$2M+</span>}
    label="Tổng Doanh Thu"
    align="center"
    boxed
  />
  <Stat
    value={<span className="text-[#F59E0B]">98%</span>}
    label="Độ Hài Lòng Seller"
    align="center"
    boxed
  />
</div>
      </div>

    </section>
  );
}


function FeatureCard({
  icon,
  title,
  desc,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tone: "orange" | "teal" | "yellow";
}) {
  // Màu nền nhạt cho ô icon (nhẹ nhàng như bản gốc)
  const toneStyles = {
    orange: { badgeTo: "#FFF3E0", dot: "#F59E0B" },
    teal:   { badgeTo: "#E6FFFB", dot: "#14B8A6" },
    yellow: { badgeTo: "#FFF8DB", dot: "#F59E0B" },
  }[tone];

  return (
    <div className="rounded-2xl bg-white p-4 md:p-5 shadow-[0_10px_30px_rgba(16,24,40,0.06)] border border-black/5">
      {/* Stack dọc + căn giữa */}
      <div className="flex flex-col items-center text-center">
        {/* Ô icon ở chính giữa */}
        <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-black/5">
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              background: `linear-gradient(180deg, #FFFFFF 0%, ${toneStyles.badgeTo} 100%)`,
              opacity: 0.85,
            }}
          />
          <div className="relative z-[1]">{icon}</div>

          {/* chấm trang trí nhỏ (giữ lại như bản gốc; có thể bỏ nếu muốn tối giản) */}
          <span
            className="absolute -top-1 -right-1 h-2 w-2 rounded-full"
            style={{ backgroundColor: toneStyles.dot }}
          />
        </div>

        {/* Text */}
        <h3 className="mt-3 text-[15px] md:text-base font-semibold text-[#111827]">
          {title}
        </h3>
        <p className="mt-1 text-xs md:text-sm leading-relaxed text-[#6B7280]">
          {desc}
        </p>
      </div>
    </div>
  );
}

function Stat({
  value,
  label,
  align = "left",
  boxed = false,
}: {
  value: React.ReactNode;
  label: React.ReactNode;
  align?: "left" | "center" | "right";
  boxed?: boolean;
}) {
  const alignCls =
    align === "center" ? "text-center" : align === "right" ? "text-right" : "";

  return (
    <div
      className={
        boxed
          ? `rounded-2xl border border-black/10 bg-white/70 p-4 md:p-5 shadow-[0_6px_18px_rgba(16,24,40,0.06)] ${alignCls}`
          : `${alignCls}`
      }
    >
      <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#111827]">
        {value}
      </div>
      <div className="mt-1 text-sm text-[#6B7280]">{label}</div>
    </div>
  );
}