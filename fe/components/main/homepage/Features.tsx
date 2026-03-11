"use client";
import {
  ExperimentOutlined,
  AppstoreAddOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

const items = [
  {
    icon: <ExperimentOutlined />,
    title: "Thử Nghiệm AI",
    desc: "Mô phỏng vải mượt mà, thay đổi chất liệu trong 0.1s.",
  },
  {
    icon: <AppstoreAddOutlined />,
    title: "Catalog Vô Tận",
    desc: "Hàng nghìn mẫu thiết kế từ cộng đồng thiết kế toàn cầu.",
  },
  {
    icon: <TeamOutlined />,
    title: "Mạng Xã Hội",
    desc: "Chia sẻ outfit, nhận feedback và lên xu hướng.",
  },
  {
    icon: <ShoppingCartOutlined />,
    title: "Mua Sắm 1-Click",
    desc: "Thanh toán an toàn, vận chuyển nhanh chóng tức thì.",
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
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((it, idx) => (
          <div
            key={idx}
            className="group p-10 bg-white/50 backdrop-blur-md border border-white/80 rounded-[2.5rem] hover:bg-white hover:shadow-2xl hover:shadow-pink-100 transition-all duration-500 text-center"
          >
            <div className="mb-6 inline-flex w-16 h-16 rounded-3xl bg-pink-50 text-[#ff0080] items-center justify-center text-3xl group-hover:rotate-12 transition-transform duration-500">
              {it.icon}
            </div>
            <h4 className="font-black text-slate-800 text-xl mb-4 uppercase tracking-tight">
              {it.title}
            </h4>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              {it.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}