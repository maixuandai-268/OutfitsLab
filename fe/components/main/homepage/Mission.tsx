"use client";
import { BulbOutlined, CheckCircleOutlined, SafetyOutlined } from "@ant-design/icons";

export default function Mission() {
  const items = [
    {
      icon: <CheckCircleOutlined />,
      color: "bg-pink-50 text-[#ff0080]",
      title: "Hợp gu tuyệt đối",
      desc: "Đề xuất outfit dựa trên sở thích & số đo AI.",
    },
    {
      icon: <BulbOutlined />,
      color: "bg-orange-50 text-orange-500",
      title: "Sáng tạo không giới hạn",
      desc: "Tuỳ biến vải, phụ kiện theo thời gian thực.",
    },
    {
      icon: <SafetyOutlined />,
      color: "bg-indigo-50 text-indigo-500",
      title: "Bảo mật Avatar",
      desc: "Dữ liệu cơ thể được mã hoá & riêng tư.",
    },
  ];

  return (
    <section className="w-full py-20 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <span className="px-5 py-2 text-[10px] font-black text-[#ff0080] bg-pink-50 rounded-full uppercase tracking-[0.2em] border border-pink-100">
            Sứ mệnh của chúng tôi
          </span>

          <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
            Thời Trang Số<br /> 
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-[#ff0080]">
              Trong Tầm Tay
            </span>
          </h2>

          <p className="text-slate-500 text-xl font-medium leading-relaxed">
            OutfitsLab tin rằng việc thử đồ nên là một trải nghiệm giải trí. Chúng tôi xóa bỏ rào cản giữa tưởng tượng và thực tế.
          </p>

          <div className="grid gap-4">
            {items.map((it, i) => (
              <div key={i} className="group flex items-center gap-5 p-6 bg-white/50 backdrop-blur-sm rounded-4xl border border-white hover:border-pink-200 transition-all cursor-default">
                <div className={`${it.color} w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform`}>
                  {it.icon}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">{it.title}</h4>
                  <p className="text-slate-400 text-sm font-medium">{it.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Decor */}
        <div className="relative group">
           <div className="absolute -inset-4 bg-linear-to-r from-pink-500 to-indigo-500 rounded-[3rem] opacity-10 blur-2xl group-hover:opacity-20 transition-opacity" />
           <div className="relative aspect-square bg-white/60 backdrop-blur-2xl rounded-[3rem] border border-white shadow-2xl flex flex-col items-center justify-center p-10 overflow-hidden">
              <div className="text-8xl mb-6 animate-bounce">✨</div>
              <div className="text-center">
                <p className="text-2xl font-black text-slate-800 uppercase tracking-tighter italic">"Thử trước, yêu sau"</p>
                <div className="mt-6 flex gap-2">
                    {['#3D', '#AI', '#AR'].map(tag => (
                        <span key={tag} className="px-4 py-1 bg-slate-900 text-white text-[10px] font-black rounded-full uppercase">{tag}</span>
                    ))}
                </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}