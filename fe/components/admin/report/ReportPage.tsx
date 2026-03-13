"use client";
import { useMemo } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";

interface ReportPageProps {
  dark: boolean;
}

type Report= {
  id: string;
  title: string;
  desc: string;
  severity: "Khẩn cấp" | "Trung bình" | "Thấp";
  ago: string;
};

const reportSeed: Report[] = [
  {
    id: "ISS-1001",
    title: "Sản phẩm bị cấm",
    desc: "Báo cáo về sản phẩm vi phạm chính sách",
    severity: "Khẩn cấp",
    ago: "2 giờ trước",
  },
  {
    id: "ISS-1002",
    title: "Khiếu nại người dùng",
    desc: "Báo cáo sản phẩm giả mạo",
    severity: "Trung bình",
    ago: "5 giờ trước",
  },
  {
    id: "ISS-1003",
    title: "Vấn đề thanh toán",
    desc: "Tranh chấp giao dịch thất bại",
    severity: "Thấp",
    ago: "1 ngày trước",
  },
  {
    id: "ISS-1004",
    title: "Đánh giá chất lượng",
    desc: "Hình ảnh sản phẩm không khớp với mô tả",
    severity: "Trung bình",
    ago: "2 ngày trước",
  },
];

function StatCard({
  dark,
  title,
  value,
  accent = "indigo",
  link = "Xem chi tiết",
}: {
  dark: boolean;
  title: string;
  value: number;
  accent?: "amber" | "indigo" | "emerald";
  link?: string;
}) {
  const border = dark ? "border-gray-700" : "border-amber-200";
  const bg = dark ? "bg-gray-800" : "bg-white";
  const titleColor = dark ? "text-gray-400" : "text-slate-500";
  const valueColor =
    accent === "amber"
      ? "text-amber-600"
      : accent === "emerald"
      ? "text-emerald-600"
      : "text-indigo-600";
  const linkColor =
    accent === "amber"
      ? "text-amber-600"
      : accent === "emerald"
      ? "text-emerald-600"
      : "text-indigo-600";

  return (
    <div
      className={`rounded-2xl ${bg} border ${border} p-4`}
    >
      <p className={`text-xs font-medium ${titleColor}`}>{title}</p>
      <p className={`text-2xl font-semibold mt-1 ${valueColor}`}>{value}</p>
      <button
        type="button"
        className={`text-xs font-semibold mt-2 ${linkColor} hover:underline`}
        onClick={() => alert(`Open list for ${title}`)}
      >
        {link}
      </button>
    </div>
  );
}

function SeverityPill({ level }: { level: Report["severity"] }) {
  const map = {
    "Khẩn cấp": "bg-rose-100 text-rose-700",
    "Trung bình": "bg-amber-100 text-amber-700",
    "Thấp": "bg-emerald-100 text-emerald-700",
  } as const;
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${map[level]}`}
    >
      {level}
    </span>
  );
}

function IssueItem({ dark, issue }: { dark: boolean; issue: Report }) {
  const cardBg = dark ? "bg-gray-900" : "bg-amber-50";
  const border = dark ? "border-gray-700/60" : "border-amber-200";

  return (
    <div
      className={`rounded-xl ${cardBg} border ${border} p-3`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            dark ? "bg-gray-800 text-amber-400" : "bg-white text-amber-500"
          } border ${border}`}
        >
          <ExclamationCircleOutlined />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p
                className={`text-[13px] font-semibold ${
                  dark ? "text-gray-100" : "text-gray-900"
                }`}
              >
                {issue.title}
              </p>
              <p className="text-xs text-gray-400">{issue.desc}</p>
            </div>
            <SeverityPill level={issue.severity} />
          </div>

          <p className="text-[11px] text-gray-400 mt-2">{issue.ago}</p>
        </div>
      </div>
    </div>
  );
}

export default function ReportPage({ dark }: ReportPageProps) {
  const stats = useMemo(
    () => ({
      pending: 24,
      thisMonth: 156,
      resolved: 892,
    }),
    []
  );

  return (
    <main className={`flex-1 overflow-y-auto p-6 ${dark ? "" : "bg-amber-50/40"}`}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <StatCard dark={dark} title="Vấn đề đang chờ" value={stats.pending} accent="amber" />
        <StatCard dark={dark} title="Tháng này" value={stats.thisMonth} accent="indigo" />
        <StatCard dark={dark} title="Đã giải quyết" value={stats.resolved} accent="emerald" />
      </div>

      <section
        className={`rounded-2xl border ${
          dark ? "bg-gray-800 border-gray-700" : "bg-white border-amber-200"
        } p-4`}
      >
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`w-5 h-5 rounded-full flex items-center justify-center border ${
              dark ? "border-gray-700 text-gray-300" : "border-amber-300 text-amber-700"
            }`}
          >
            ⓘ
          </span>
          <h2
            className={`text-sm font-semibold ${
              dark ? "text-gray-100" : "text-amber-900"
            }`}
          >
            Các vấn đề gần đây
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {reportSeed.map((it) => (
            <IssueItem key={it.id} dark={dark} issue={it} />
          ))}
        </div>
      </section>
    </main>
  );
}