// components/main/homepage/Features.tsx
"use client";
import {
  ExperimentOutlined,
  AppstoreAddOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

const items = [
  {
    icon: <ExperimentOutlined className="text-emerald-600" />,
    title: "Thử Nghiệm Dễ Dàng",
    desc: "Tương tác mượt, thay chất liệu & phụ kiện theo thời gian thực.",
  },
  {
    icon: <AppstoreAddOutlined className="text-emerald-600" />,
    title: "Catalog Đa Dạng",
    desc: "Kho outfit phong phú từ seller độc lập đến thương hiệu lớn.",
  },
  {
    icon: <TeamOutlined className="text-emerald-600" />,
    title: "Cộng Đồng Seller",
    desc: "Chia sẻ preset, nhận phản hồi & phát triển shop nhanh.",
  },
  {
    icon: <ShoppingCartOutlined className="text-emerald-600" />,
    title: "E‑Commerce Tích Hợp",
    desc: "Thanh toán & vận chuyển đồng bộ với nền tảng của bạn.",
  },
];

export default function Features() {
  return (
    <section className="w-full max-w-7xl mx-auto py-16 md:py-20">
      {/* Heading với spacing rộng hơn */}
      <div className="text-center mb-16 space-y-4 gap-4">
        <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900">
          Tại Sao Chọn <span className="text-emerald-600">CustomOutfit3D</span>?
        </h3>
        <p className="text-slate-600 text-lg mx-auto text-center mt-4 mb-4">
          Khám phá những tính năng vượt trội giúp bạn tạo ra trải nghiệm thời trang số hoàn hảo
        </p>
      </div>

      {/* Grid với spacing tốt hơn */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
        {items.map((it, idx) => (
          <div
            key={idx}
            className="group p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
            style={{
              background: "rgba(255,255,255,.75)",
              backdropFilter: "saturate(150%) blur(16px)",
              boxShadow:
                "0 10px 30px rgba(0,0,0,.06), inset 0 1px 0 rgba(255,255,255,.7)",
              border: "1px solid rgba(255,255,255,.7)",
              borderRadius: 24,
            }}
          >
            <div className="flex justify-center mb-6">
              <div 
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 grid place-content-center shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
              >
                <div className="text-3xl text-black">
                  {it.icon}
                </div>
              </div>
            </div>

            {/* Title */}
            <h4 className="font-bold text-xl text-slate-900 text-center mb-3 transition-colors group-hover:text-emerald-600">
              {it.title}
            </h4>

            {/* Description */}
            <p className="text-slate-600 text-sm leading-relaxed text-center">
              {it.desc}
            </p>

            {/* Hover indicator line */}
            <div className="mt-6 h-1 w-0 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full mx-auto transition-all duration-300 group-hover:w-full"></div>
          </div>
        ))}
      </div> 
    </section>
  );
}