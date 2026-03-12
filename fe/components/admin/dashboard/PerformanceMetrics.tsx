"use client";
import Card from "../shared/card";
import CardTitle from "../shared/cardTitle";

// Data tại chỗ
const performanceMetrics = [
  { label: "Tỷ lệ chuyển đổi", value: "3.6%",  progress: 36, color: "#6366f1" },
  { label: "Phiên trung bình",     value: "4m 32s", progress: 62, color: "#10b981" },
  { label: "Trang / lượt truy cập",   value: "5.4",    progress: 54, color: "#f59e0b" },
  { label: "Tỷ lệ quay lại",     value: "68.2%",  progress: 68, color: "#8b5cf6" },
];

export default function PerformanceMetrics({ dark } : { dark: boolean }) {
  return (
    <Card dark={dark}>
      <CardTitle dark={dark} title="Performance Metrics" />
      <div className="grid grid-cols-2 gap-3">
        {performanceMetrics.map((m) => (
          <div key={m.label} className={`p-3.5 rounded-xl ${dark ? "bg-gray-900" : "bg-slate-50"}`}>
            <p className="text-[11px] text-gray-400 mb-1.5">{m.label}</p>
            <p className={`text-xl font-bold mb-2 ${dark ? "text-gray-50" : "text-gray-900"}`}>{m.value}</p>
            <div className={`h-1 rounded-full ${dark ? "bg-gray-700" : "bg-slate-200"}`}>
              <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${m.progress}%`, background: m.color }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}