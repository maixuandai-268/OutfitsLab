"use client";
import { ShoppingOutlined, AppstoreOutlined  } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full pb-20  pt-26 relative">
      {/* Hiệu ứng phát sáng nền */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-200/30 rounded-full blur-[120px] -z-10" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">
        {/* Left Column - Content */}
        <div className="flex flex-col justify-center space-y-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] text-slate-900 tracking-tighter">
            Khám Phá Outfit{" "}
            <span className="inline-block text-transparent bg-clip-text bg-linear-to-r from-[#ff0080] to-[#7928ca]">
              Hoàn Hảo
            </span>
            <br />
            <span className="inline-block mt-1 text-slate-800">
              Tại OutfitsLab
            </span>
          </h1>

          <p className="text-slate-500 max-w-xl text-xl leading-relaxed font-medium">
            Trải nghiệm thử đồ ảo trên avatar 3D với cảm giác chân thực — chỉnh màu,
            vải và phụ kiện chỉ bằng vài cú nhấp!
          </p>

          <div className="flex flex-wrap gap-5">
            <Link
              href="/try-on"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-gray-900 text-white font-bold text-lg transition-all hover:bg-black hover:scale-105 active:scale-95 shadow-xl shadow-gray-200"
            >
              <ShoppingOutlined className="text-xl" /> 
              Bắt đầu thử ngay
            </Link>

            <Link
              href="/product"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl border-2 border-pink-100 text-slate-700 bg-white/50 backdrop-blur-md hover:bg-pink-50 hover:border-pink-200 font-bold text-lg transition-all"
            >
              <AppstoreOutlined className="text-xl text-[#ff0080]" /> 
              Khám phá sản phẩm
            </Link>

          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-4 mt-12">
            {[
              { v: "10K+", l: "Mẫu Outfit" },
              { v: "500+", l: "Sellers" },
              { v: "99%", l: "Hài lòng" },
            ].map((s, i) => (
              <div
                key={i}
                className="p-6 bg-white/40 backdrop-blur-xl border border-white/60 rounded-4xl shadow-sm hover:shadow-md transition-all group text-center"
              >
                <div className="text-2xl font-black text-[#ff0080] mb-1 group-hover:scale-110 transition-transform">
                  {s.v}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Image Replacement */}
        <div className="flex items-center justify-center relative">
            <div className="absolute inset-0 bg-linear-to-tr from-pink-100/40 to-indigo-100/40 blur-3xl -z-10 rounded-full" />
            
            <div className="relative w-full max-w-125 aspect-square flex items-center justify-center group">
              <div className="absolute top-10 right-0 z-20 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-pink-100 shadow-lg animate-bounce">
                <span className="text-[10px] font-black text-pink-600 uppercase tracking-widest">Live Try-On</span>
              </div>

              <Image 
                src="/images/Object.png" 
                alt="3D Outfit Preview"
                width={550}
                height={550}
                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>
        </div>
      </div>
    </section>
  );
}