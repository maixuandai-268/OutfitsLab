"use client";
import Card from "../shared/card";
import CardTitle from "../shared/cardTitle";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";


const pieData = [
  { name: "Trực tiếp", value: 38, color: "#6366f1" },
  { name: "Tự nhiên", value: 27, color: "#10b981" },
  { name: "Giới thiệu", value: 20, color: "#f59e0b" },
  { name: "Mạng xã hội", value: 15, color: "#ef4444" },
];

interface TrafficChartProps {
  dark: boolean;
}

export default function TrafficChart({ dark }: TrafficChartProps) {
  return (
    <Card dark={dark}>
      <CardTitle dark={dark} title="Nguồn lưu lượng truy cập" sub="Từ đâu đến với bạn" />
      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={72} paddingAngle={3} dataKey="value">
            {pieData.map((d) => <Cell key={d.name} fill={d.color} />)}
          </Pie>
          <Tooltip formatter={(v) => `${v}%`} />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-col gap-2 mt-3">
        {pieData.map((d) => (
          <div key={d.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
              <span className={`text-[12.5px] ${dark ? "text-gray-300" : "text-slate-600"}`}>{d.name}</span>
            </div>
            <span className={`text-[12.5px] font-semibold ${dark ? "text-gray-100" : "text-gray-800"}`}>{d.value}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
}