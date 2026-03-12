"use client";
import Card from "../shared/card";
import CardTitle from "../shared/cardTitle";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

// Data tại chỗ
const visitorData = [
  { day: "Mon", visitors: 1200 }, { day: "Tue", visitors: 1900 },
  { day: "Wed", visitors: 1600 }, { day: "Thu", visitors: 2300 },
  { day: "Fri", visitors: 2100 }, { day: "Sat", visitors: 1400 },
  { day: "Sun", visitors: 900  },
];

export default function VisitorChart({ dark } : { dark: boolean }) {
  return (
    <Card dark={dark}>
      <CardTitle dark={dark} title="Số lượng người truy cập" sub="Lưu lượng tuần này" />
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={visitorData} barSize={28}>
          <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#374151" : "#f1f5f9"} vertical={false} />
          <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
          <Tooltip />
          <Bar dataKey="visitors" fill="#6366f1" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
