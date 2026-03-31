"use client";

import { useContext, useMemo, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useReports } from "@/hooks/useReports";
import { Report } from "@/lib/api/reports";
import ReportList from "./ReportList";

interface ReportPageProps {
  dark: boolean;
}

function StatCard({
  dark,
  title,
  value,
  accent = "indigo",
  isActive = false,
  onClick,
}: {
  dark: boolean;
  title: string;
  value: number;
  accent?: "amber" | "indigo" | "emerald" | "red" | "blue";
  isActive?: boolean;
  onClick?: () => void;
}) {
  const border = isActive
    ? dark ? "border-indigo-500" : "border-indigo-400"
    : dark ? "border-gray-700" : "border-amber-200";
  const bg = isActive
    ? dark ? "bg-indigo-900/30" : "bg-indigo-50"
    : dark ? "bg-gray-800" : "bg-white";
  const titleColor = isActive
    ? dark ? "text-indigo-400" : "text-indigo-600"
    : dark ? "text-gray-400" : "text-slate-500";
  const valueColor =
    accent === "amber"
      ? "text-amber-600"
      : accent === "emerald"
        ? "text-emerald-600"
        : accent === "red"
          ? "text-red-600"
          : accent === "blue"
            ? "text-blue-600"
            : "text-indigo-600";

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl ${bg} border ${border} p-4 transition-all ${onClick ? "cursor-pointer hover:scale-105 hover:shadow-lg" : ""
        }`}
    >
      <p className={`text-xs font-medium ${titleColor}`}>{title}</p>
      <p className={`text-2xl font-semibold mt-1 ${valueColor}`}>{value}</p>
    </div>
  );
}

export default function ReportPage({ dark }: ReportPageProps) {
  const auth = useContext(AuthContext);
  const { reports, loading, error, refetch, isRefetching } = useReports(
    auth?.token,
    { autoFetch: true }
  );
  const [selectedStatus, setSelectedStatus] = useState<"ALL" | "pending" | "in_progress" | "resolved" | "rejected">("ALL");

  const stats = useMemo(() => {
    let pending = 0;
    let inProgress = 0;
    let resolved = 0;
    let rejected = 0;

    reports.forEach((r: Report) => {
      if (r.status === "pending") pending++;
      else if (r.status === "in_progress") inProgress++;
      else if (r.status === "resolved") resolved++;
      else if (r.status === "rejected") rejected++;
    });

    return { pending, inProgress, resolved, rejected, total: reports.length };
  }, [reports]);

  return (
    <main className={`flex-1 overflow-y-auto p-6 ${dark ? "" : "bg-amber-50/40"}`}>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <StatCard
          dark={dark}
          title="Tổng số báo cáo"
          value={stats.total}
          accent="indigo"
          isActive={selectedStatus === "ALL"}
          onClick={() => setSelectedStatus("ALL")}
        />
        <StatCard
          dark={dark}
          title="Báo cáo chờ xử lý"
          value={stats.pending}
          accent="amber"
          isActive={selectedStatus === "pending"}
          onClick={() => setSelectedStatus("pending")}
        />
        <StatCard
          dark={dark}
          title="Báo cáo đang xử lý"
          value={stats.inProgress}
          accent="blue"
          isActive={selectedStatus === "in_progress"}
          onClick={() => setSelectedStatus("in_progress")}
        />
        <StatCard
          dark={dark}
          title="Báo cáo đã giải quyết"
          value={stats.resolved}
          accent="emerald"
          isActive={selectedStatus === "resolved"}
          onClick={() => setSelectedStatus("resolved")}
        />
        <StatCard
          dark={dark}
          title="Báo cáo đã từ chối"
          value={stats.rejected}
          accent="red"
          isActive={selectedStatus === "rejected"}
          onClick={() => setSelectedStatus("rejected")}
        />
      </div>

      <section
        className={`rounded-2xl border ${dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          } p-6`}
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center border ${dark ? "border-gray-700 text-gray-300" : "border-gray-300 text-gray-600"
                }`}
            >
              📋
            </span>
            <h2
              className={`text-sm font-semibold ${dark ? "text-gray-100" : "text-gray-900"
                }`}
            >
              {selectedStatus === "ALL"
                ? "Danh sách tất cả báo cáo"
                : `Báo cáo - ${selectedStatus === "pending" ? "Chờ xử lý" :
                  selectedStatus === "in_progress" ? "Đang xử lý" :
                    selectedStatus === "resolved" ? "Đã giải quyết" :
                      "Đã từ chối"
                }`
              }
            </h2>
          </div>

          {isRefetching && (
            <svg className="animate-spin w-4 h-4 text-indigo-600" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          )}
        </div>

        <ReportList
          report={reports}
          loading={loading}
          error={error}
          onRefresh={refetch}
          dark={dark}
          token={auth?.token || undefined}
          selectedStatus={selectedStatus}
        />
      </section>
    </main>
  );
}