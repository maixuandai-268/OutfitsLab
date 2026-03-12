"use client";
import { useMemo, useState } from "react";
import {
  CheckOutlined,
  CloseOutlined,
  EyeOutlined,
} from "@ant-design/icons";

type Status = "pending" | "approved" | "blocked";

interface SellerApplication {
  id: string;
  name: string;
  owner: string;
  email: string;
  submitted: string; // ISO date: "2024-01-16"
  docs: number;
  status: Status;
}

interface ApplicationsPageProps {
  dark: boolean;
}

const seed: SellerApplication[] = [
  {
    id: "APP-1001",
    name: "Fashion Studio Pro",
    owner: "Nguyễn Tuấn",
    email: "tuanfashion@example.com",
    submitted: "2024-01-16",
    docs: 3,
    status: "pending",
  },
  {
    id: "APP-1002",
    name: "Vintage Closet",
    owner: "Trần Huỳnh",
    email: "vintage@example.com",
    submitted: "2024-01-15",
    docs: 4,
    status: "pending",
  },
  {
    id: "APP-1003",
    name: "Modern Threads",
    owner: "Lê Quỳnh",
    email: "modern@example.com",
    submitted: "2024-01-14",
    docs: 2,
    status: "pending",
  },
];

type TabKey = "all" | "pending" | "approved" | "blocked";

export default function SellerApplicationsPage({ dark }: ApplicationsPageProps) {
  const [tab, setTab] = useState<TabKey>("all");
  const [apps, setApps] = useState<SellerApplication[]>(seed);

  const filtered = useMemo(() => {
    if (tab === "all") return apps;
    if (tab === "pending") return apps.filter((a) => a.status === "pending");
    if (tab === "approved") return apps.filter((a) => a.status === "approved");
    return apps.filter((a) => a.status === "blocked");
  }, [tab, apps]);

  const onApprove = (id: string) =>
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, status: "approved" } : a)));

  const onReject = (id: string) =>
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, status: "blocked" } : a)));

  const onView = (app: SellerApplication) => {
    // Tùy bạn mở Drawer/Modal; tạm thời dùng alert
    alert(`View details:\n\n${app.name}\nOwner: ${app.owner}\nEmail: ${app.email}\nSubmitted: ${app.submitted}\nDocs: ${app.docs}`);
  };

  const wrapBg = dark ? "" : "bg-amber-50/40";

  return (
    <main className={`flex-1 overflow-y-auto p-6 ${wrapBg}`}>
      {/* Filter pills */}
      <FiltersRow dark={dark} tab={tab} setTab={setTab} counts={{
        all: apps.length,
        pending: apps.filter(a => a.status === "pending").length,
        approved: apps.filter(a => a.status === "approved").length,
        blocked: apps.filter(a => a.status === "blocked").length,
      }} />

      {/* List */}
      <div className="mt-4 flex flex-col gap-4">
        {filtered.map((app) => (
          <ApplicationCard
            key={app.id}
            dark={dark}
            app={app}
            onApprove={() => onApprove(app.id)}
            onReject={() => onReject(app.id)}
            onView={() => onView(app)}
          />
        ))}

        {filtered.length === 0 && (
          <div className={`rounded-2xl border p-6 text-sm text-center ${dark ? "bg-gray-800 border-gray-700 text-gray-400" : "bg-white border-amber-200 text-amber-900/70"}`}>
            Không có mục nào trong bộ lọc này.
          </div>
        )}
      </div>
    </main>
  );
}

/* ----------------------------- Sub Components ----------------------------- */

function FiltersRow({
  dark,
  tab,
  setTab,
  counts,
}: {
  dark: boolean;
  tab: TabKey;
  setTab: (k: TabKey) => void;
  counts: Record<TabKey, number>;
}) {
  const pills: { key: TabKey; label: string }[] = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending Review" },
    { key: "approved", label: "Approved" },
    { key: "blocked", label: "Blocked" },
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {pills.map((p) => {
        const active = p.key === tab;
        const base =
          "px-3 py-1.5 rounded-full text-sm font-medium transition-colors border";
        const cls = active
          ? "bg-teal-700 text-white border-teal-700"
          : dark
          ? "text-gray-300 border-gray-700 hover:bg-gray-800"
          : "text-amber-800 border-amber-200 hover:bg-white";
        return (
          <button
            key={p.key}
            type="button"
            onClick={() => setTab(p.key)}
            className={`${base} ${cls}`}
            aria-pressed={active}
            title={`${p.label} (${counts[p.key]})`}
          >
            {p.label}
          </button>
        );
      })}
    </div>
  );
}

function ApplicationCard({
  dark,
  app,
  onApprove,
  onReject,
  onView,
}: {
  dark: boolean;
  app: SellerApplication;
  onApprove: () => void;
  onReject: () => void;
  onView: () => void;
}) {
  const cardBase = `rounded-2xl border ${
    dark ? "bg-gray-800 border-gray-700" : "bg-white border-amber-200"
  }`;
  const headerLine = dark ? "border-gray-700/80" : "border-amber-200";
  const subText = "text-xs text-gray-400";

  return (
    <div className={`${cardBase}`}>
      {/* Header */}
      <div className={`px-4 pt-3 pb-2 flex items-start justify-between`}>
        <div>
          <p className={`text-[15px] font-semibold ${dark ? "text-gray-100" : "text-gray-900"}`}>
            {app.name}
          </p>
          <div className="mt-0.5">
            <p className="text-[12.5px] text-gray-500">
              Owner: {app.owner}
            </p>
            <p className="text-[12.5px] text-gray-500">{app.email}</p>
          </div>
        </div>
        <StatusBadge status={app.status} />
      </div>

      {/* Divider */}
      <div className={`border-t ${headerLine}`} />

      {/* Footer row: left meta + right actions */}
      <div className="px-4 py-2.5 flex items-center justify-between gap-3">
        <p className={`${subText}`}>
          Submitted: {app.submitted} • Docs: {app.docs}
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onApprove}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500 hover:bg-emerald-600 text-white"
            title="Approve"
          >
            <CheckOutlined /> Approve
          </button>
          <button
            type="button"
            onClick={onReject}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-rose-500 hover:bg-rose-600 text-white"
            title="Reject"
          >
            <CloseOutlined /> Reject
          </button>
          <button
            type="button"
            onClick={onView}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
              dark
                ? "bg-gray-700 hover:bg-gray-600 text-gray-100"
                : "bg-slate-700 hover:bg-slate-800 text-white"
            }`}
            title="View Details"
          >
            <EyeOutlined /> View Details
          </button>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const map: Record<Status, string> = {
    pending: "bg-amber-100 text-amber-700",
    approved: "bg-emerald-100 text-emerald-700",
    blocked: "bg-slate-200 text-slate-700",
  };
  const label = status === "pending" ? "Pending" : status === "approved" ? "Approved" : "Blocked";
  return (
    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${map[status]}`}>
      {label}
    </span>
  );
}