"use client";
import { useMemo, useState } from "react";
import {
  CheckOutlined,
  CloseOutlined,
  EyeOutlined,
} from "@ant-design/icons";

type Status = "Chờ xét duyệt" | "Đã duyệt" | "Blocked";

interface SellerApplication {
  id: string;
  name: string;
  owner: string;
  email: string;
  submitted: string; 
  docs: number;
  status: Status;
}

interface SellerApplicationsPageProps {
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
    status: "Chờ xét duyệt",
  },
  {
    id: "APP-1002",
    name: "Vintage Closet",
    owner: "Trần Huỳnh",
    email: "vintage@example.com",
    submitted: "2024-01-15",
    docs: 4,
    status: "Chờ xét duyệt",
  },
  {
    id: "APP-1003",
    name: "Modern Threads",
    owner: "Lê Quỳnh",
    email: "modern@example.com",
    submitted: "2024-01-14",
    docs: 2,
    status: "Chờ xét duyệt",
  },
];

type TabKey = "Tất cả" | "Chờ xét duyệt" | "Đã duyệt" | "Blocked";

export default function SellerApplicationsPage({ dark }: SellerApplicationsPageProps) {
  const [tab, setTab] = useState<TabKey>("Tất cả");
  const [apps, setApps] = useState<SellerApplication[]>(seed);

  const filtered = useMemo(() => {
    if (tab === "Tất cả") return apps;
    if (tab === "Chờ xét duyệt") return apps.filter((a) => a.status === "Chờ xét duyệt");
    if (tab === "Đã duyệt") return apps.filter((a) => a.status === "Đã duyệt");
    return apps.filter((a) => a.status === "Blocked");
  }, [tab, apps]);

  const onApprove = (id: string) =>
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, status: "Đã duyệt" } : a)));

  const onReject = (id: string) =>
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, status: "Blocked" } : a)));

  const onView = (app: SellerApplication) => {
    alert(`View details:\n\n${app.name}\nOwner: ${app.owner}\nEmail: ${app.email}\nSubmitted: ${app.submitted}\nDocs: ${app.docs}`);
  };

  const wrapBg = dark ? "" : "bg-amber-50/40";

  return (
    <main className={`flex-1 overflow-y-auto p-6 ${wrapBg}`}>
      <FiltersRow dark={dark} tab={tab} setTab={setTab} counts={{
        "Tất cả": apps.length,
        "Chờ xét duyệt": apps.filter(a => a.status === "Chờ xét duyệt").length,
        "Đã duyệt": apps.filter(a => a.status === "Đã duyệt").length,
        "Blocked": apps.filter(a => a.status === "Blocked").length,
      }} />

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
    { key: "Tất cả", label: "Tất cả" },
    { key: "Chờ xét duyệt", label: "Chờ xét duyệt" },
    { key: "Đã duyệt", label: "Đã duyệt" },
    { key: "Blocked", label: "Blocked" },
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

      <div className={`border-t ${headerLine}`} />

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
            <CheckOutlined /> Phê duyệt
          </button>
          <button
            type="button"
            onClick={onReject}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-rose-500 hover:bg-rose-600 text-white"
            title="Reject"
          >
            <CloseOutlined /> Từ chối
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
            <EyeOutlined /> Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const map: Record<Status, string> = {
    "Chờ xét duyệt": "bg-amber-100 text-amber-700",
    "Đã duyệt": "bg-emerald-100 text-emerald-700",
    "Blocked": "bg-slate-200 text-slate-700",
  };
  const label = status === "Chờ xét duyệt" ? "Chờ xét duyệt" : status === "Đã duyệt" ? "Đã duyệt" : "Blocked";
  return (
    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${map[status]}`}>
      {label}
    </span>
  );
}