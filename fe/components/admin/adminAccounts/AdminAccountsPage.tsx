"use client";
import React, { useMemo, useState } from "react";
import {
  PlusOutlined,
  SearchOutlined,
  ExportOutlined,
  ReloadOutlined,
  DeleteOutlined,
  LockOutlined,
  UnlockOutlined,
  KeyOutlined,
  EditOutlined,
} from "@ant-design/icons";


type AdminStatus = "Đã kích hoạt" | "Đã vô hiệu hóa";
type AdminRole = "admin";
type RoleFilter = AdminRole | "all";
type StatusFilter = AdminStatus | "all";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  status: AdminStatus;
  twoFA: boolean;
  lastActive: string; 
}

interface AdminAccountsPageProps {
  dark: boolean;
}


const seedAdmins: AdminUser[] = [
  {
    id: "A001",
    name: "Mai Xuân Đại",
    email: "daicl@example.com",
    role: "admin",
    status: "Đã kích hoạt",
    twoFA: true,
    lastActive: "2026-03-09T10:00:00Z",
  },
  {
    id: "A002",
    name: "Nguyễn Văn Công",
    email: "cong@example.com",
    role: "admin",
    status: "Đã kích hoạt",
    twoFA: false,
    lastActive: "2026-03-10T02:10:00Z",
  },
  {
    id: "A003",
    name: "Nguyễn Đức Duyệt",
    email: "duyet@example.com",
    role: "admin",
    status: "Đã vô hiệu hóa",
    twoFA: false,
    lastActive: "2026-03-05T20:25:00Z",
  },
  {
    id: "A004",
    name: "Phạm Quang Trung",
    email: "trung@example.com",
    role: "admin",
    status: "Đã kích hoạt",
    twoFA: true,
    lastActive: "2026-03-10T04:30:00Z",
  },
  {
    id: "A005",
    name: "Trần Ngọc Tú",
    email: "tu@example.com",
    role: "admin",
    status: "Đã kích hoạt",
    twoFA: false,
    lastActive: "2026-02-28T15:00:00Z",
  },
];


function csvExport(rows: readonly AdminUser[], filename = "admins.csv"): void {
  const headers = ["Name", "Email", "Role", "Status", "2FA", "Last Active"];

  const toCsv = (val: unknown): string => {
    if (val === null || val === undefined) return "";
    const s = String(val);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };

  const lines: string[] = [
    headers.join(","),
    ...rows.map((r) =>
      [
        r.name,
        r.email,
        r.role,
        r.status,
        r.twoFA ? "enabled" : "disabled",
        r.lastActive,
      ]
        .map(toCsv)
        .join(",")
    ),
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function cls(...arr: Array<string | false | null | undefined>): string {
  return arr.filter(Boolean).join(" ");
}


function Modal(props: {
  dark: boolean;
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onOk?: () => void;
  okText?: string;
}) {
  const { dark, open, title, children, onClose, onOk, okText = "Save" } = props;
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        className={cls(
          "relative z-10 w-full max-w-md rounded-2xl border p-4",
          dark ? "bg-gray-800 border-gray-700" : "bg-white border-amber-200"
        )}
      >
        <h3
          className={cls(
            "text-[15px] font-semibold mb-3",
            dark ? "text-gray-100" : "text-gray-900"
          )}
        >
          {title}
        </h3>
        <div>{children}</div>
        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className={cls(
              "px-3 py-1.5 rounded-lg text-sm border",
              dark
                ? "text-gray-300 border-gray-700 hover:bg-gray-700"
                : "text-slate-700 border-amber-200 hover:bg-amber-50"
            )}
          >
            Cancel
          </button>
          <button
            onClick={() => onOk?.()}
            className="px-3 py-1.5 rounded-lg text-sm bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {okText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminAccountsPage({ dark }: AdminAccountsPageProps) {
  const [rows, setRows] = useState<AdminUser[]>(seedAdmins);
  const [q, setQ] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");


  const [selected, setSelected] = useState<Set<string>>(new Set());
  const filteredList = useMemo(() => {
    const kw = q.trim().toLowerCase();
    return rows.filter((r) => {
      const passKw =
        kw.length === 0 ||
        r.name.toLowerCase().includes(kw) ||
        r.email.toLowerCase().includes(kw);
      const passRole = roleFilter === "all" || r.role === roleFilter;
      const passStatus = statusFilter === "all" || r.status === statusFilter;
      return passKw && passRole && passStatus;
    });
  }, [rows, q, roleFilter, statusFilter]);

  const allSelected =
    selected.size > 0 && selected.size === filteredList.length;


  const [openInvite, setOpenInvite] = useState<boolean>(false);
  const [inviteEmail, setInviteEmail] = useState<string>("");
  const [inviteRole, setInviteRole] = useState<AdminRole>("admin");


  const [page, setPage] = useState<number>(1);
  const pageSize = 5;

  const pageRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredList.slice(start, start + pageSize);
  }, [filteredList, page]);

  const totalPages = Math.max(1, Math.ceil(filteredList.length / pageSize));


  const toggleAll = (checked: boolean): void => {
    if (checked) {
      setSelected(new Set(filteredList.map((x) => x.id)));
    } else {
      setSelected(new Set());
    }
  };

  const toggleOne = (id: string, checked: boolean): void => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const bulkEnable = (): void =>
    setRows((prev) =>
      prev.map((r) => (selected.has(r.id) ? { ...r, status: "Đã kích hoạt" } : r))
    );

  const bulkDisable = (): void =>
    setRows((prev) =>
      prev.map((r) => (selected.has(r.id) ? { ...r, status: "Đã vô hiệu hóa" } : r))
    );

  const bulkResetPwd = (): void => {
    alert(`Reset password for: ${Array.from(selected).join(", ")}`);
  };

  const bulkRemove = (): void => {
    if (!confirm("Remove selected admins?")) return;
    setRows((prev) => prev.filter((r) => !selected.has(r.id)));
    setSelected(new Set());
  };

  const updateRole = (id: string, role: AdminRole): void =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, role } : r)));

  const updateStatus = (id: string, status: AdminStatus): void =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));

  const update2FA = (id: string, twoFA: boolean): void =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, twoFA } : r)));

  const resetPwd = (id: string): void => {
    alert(`Reset password for ${id}`);
  };

  const removeRow = (id: string): void => {
    if (!confirm(`Remove admin ${id}?`)) return;
    setRows((prev) => prev.filter((r) => r.id !== id));
    setSelected((prev) => {
      const copy = new Set(prev);
      copy.delete(id);
      return copy;
    });
  };

  const exportCsv = (): void => csvExport(filteredList);

  const invite = (): void => {
    if (!inviteEmail) {
      alert("Please enter email");
      return;
    }
    const id = "A" + Math.floor(1000 + Math.random() * 9000);
    setRows((prev) => [
      {
        id,
        name: inviteEmail.split("@")[0],
        email: inviteEmail,
        role: inviteRole,
        status: "Đã kích hoạt",
        twoFA: false,
        lastActive: new Date().toISOString(),
      },
      ...prev,
    ]);
    setInviteEmail("");
    setInviteRole("admin");
    setOpenInvite(false);
  };

  const containerBg = dark ? "" : "bg-amber-50/40";

  

  return (
    <main className={cls("flex-1 overflow-y-auto p-6", containerBg)}>

      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h1
            className={cls(
              "text-xl font-bold",
              dark ? "text-gray-50" : "text-gray-900"
            )}
          >
            Quản lý tài khoản quản trị viên
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Quản lý quyền truy cập và vai trò của các quản trị viên trong cửa hàng của bạn.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpenInvite(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <PlusOutlined /> Thêm quản trị viên
          </button>
          <button
            onClick={exportCsv}
            className={cls(
              "inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm border",
              dark
                ? "text-gray-300 border-gray-700 hover:bg-gray-800"
                : "text-slate-700 border-amber-200 hover:bg-white"
            )}
          >
            <ExportOutlined /> Xuất CSV
          </button>
        </div>
      </div>

   
      <div
        className={cls(
          "rounded-2xl border p-3 flex flex-col md:flex-row md:items-center gap-3",
          dark ? "bg-gray-800 border-gray-700" : "bg-white border-amber-200"
        )}
      >
  
        <div className="relative flex-1">
          <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            value={q}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setQ(e.target.value);
              setPage(1);
            }}
            placeholder="Tìm kiếm theo tên hoặc email"
            className={cls(
              "w-full pl-9 pr-3 py-2 rounded-xl text-sm outline-none border",
              dark
                ? "bg-gray-900 border-gray-700 text-gray-200 placeholder-gray-500 focus:border-indigo-500"
                : "bg-amber-50 border-amber-200 text-gray-700 placeholder-slate-400 focus:border-amber-300"
            )}
          />
        </div>

   
        <select
          value={roleFilter}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            const v = e.target.value as RoleFilter;
            setRoleFilter(v);
            setPage(1);
          }}
          className={cls(
            "px-3 py-2 rounded-xl text-sm outline-none border",
            dark
              ? "bg-gray-900 border-gray-700 text-gray-200"
              : "bg-white border-amber-200 text-slate-700"
          )}
        >
          <option value="all">Tất cả vai trò</option>
          <option value="admin">Admin</option>
        </select>

      
        <select
          value={statusFilter}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            const v = e.target.value as StatusFilter; 
            setStatusFilter(v);
            setPage(1);
          }}
          className={cls(
            "px-3 py-2 rounded-xl text-sm outline-none border",
            dark
              ? "bg-gray-900 border-gray-700 text-gray-200"
              : "bg-white border-amber-200 text-slate-700"
          )}
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="enabled">Đã bật</option>
          <option value="disabled">Đã tắt</option>
        </select>

        <div className="flex items-center gap-2">
          <button
            onClick={bulkEnable}
            disabled={selected.size === 0}
            className={cls(
              "inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold",
              selected.size === 0
                ? "bg-emerald-500/40 text-white/60 cursor-not-allowed"
                : "bg-emerald-500 hover:bg-emerald-600 text-white"
            )}
          >
            <UnlockOutlined /> Đã kích hoạt
          </button>
          <button
            onClick={bulkDisable}
            disabled={selected.size === 0}
            className={cls(
              "inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold",
              selected.size === 0
                ? "bg-amber-500/40 text-white/60 cursor-not-allowed"
                : "bg-amber-500 hover:bg-amber-600 text-white"
            )}
          >
            <LockOutlined /> Đã vô hiệu hóa
          </button>
          <button
            onClick={bulkResetPwd}
            disabled={selected.size === 0}
            className={cls(
              "inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold",
              selected.size === 0
                ? "bg-indigo-500/40 text-white/60 cursor-not-allowed"
                : "bg-indigo-500 hover:bg-indigo-600 text-white"
            )}
          >
            <KeyOutlined /> Đặt lại mật khẩu
          </button>
          <button
            onClick={bulkRemove}
            disabled={selected.size === 0}
            className={cls(
              "inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold",
              selected.size === 0
                ? "bg-rose-500/40 text-white/60 cursor-not-allowed"
                : "bg-rose-500 hover:bg-rose-600 text-white"
            )}
          >
            <DeleteOutlined /> Xóa
          </button>
          <button
            onClick={() => {
              setQ("");
              setRoleFilter("all");
              setStatusFilter("all");
              setPage(1);
              setSelected(new Set());
            }}
            className={cls(
              "inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm border",
              dark
                ? "text-gray-300 border-gray-700 hover:bg-gray-800"
                : "text-slate-700 border-amber-200 hover:bg-white"
            )}
          >
            <ReloadOutlined /> Làm mới
          </button>
        </div>
      </div>

      <div
        className={cls(
          "mt-4 rounded-2xl border overflow-x-auto",
          dark ? "bg-gray-800 border-gray-700" : "bg-white border-amber-200"
        )}
      >
        <table className="w-full border-collapse">
          <thead>
            <tr className={dark ? "border-b border-gray-700" : "border-b border-amber-200"}>
              <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase text-gray-400">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    toggleAll(e.target.checked)
                  }
                  aria-label="Select all"
                />
              </th>
              {["Quản trị viên", "Email", "Vai trò", "Trạng thái", "2FA", "Hoạt động cuối", "Hành động"].map((h) => (
                <th key={h} className="px-3 py-2 text-left text-[11px] font-semibold uppercase text-gray-400">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((r, idx) => {
              const isChecked = selected.has(r.id);
              return (
                <tr
                  key={r.id}
                  className={cls(
                    idx < pageRows.length - 1
                      ? dark
                        ? "border-b border-gray-700/50"
                        : "border-b border-amber-100"
                      : "",
                    dark ? "hover:bg-gray-900/60" : "hover:bg-amber-50/40",
                    "transition-colors"
                  )}
                >
                  <td className="px-3 py-3">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        toggleOne(r.id, e.target.checked)
                      }
                      aria-label={`Select ${r.name}`}
                    />
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
                        style={{ background: `hsl(${r.name.charCodeAt(0) * 7}, 60%, 50%)` }}
                      >
                        {r.name[0]}
                      </div>
                      <div className="min-w-0">
                        <p
                          className={cls(
                            "text-[13px] font-medium truncate",
                            dark ? "text-gray-100" : "text-gray-900"
                          )}
                        >
                          {r.name}
                        </p>
                        <p className="text-[11px] text-gray-400">ID: {r.id}</p>
                      </div>
                    </div>
                  </td>

                  <td
                    className={cls(
                      "px-3 py-3 text-[13px] truncate",
                      dark ? "text-gray-300" : "text-gray-700"
                    )}
                  >
                    {r.email}
                  </td>
               
                  <td className="px-3 py-3">
                    <select
                      value={r.role}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        updateRole(
                          r.id,
                          e.target.value as AdminRole 
                        )
                      }
                      className={cls(
                        "px-2 py-1 rounded-lg text-xs outline-none border",
                        dark
                          ? "bg-gray-900 border-gray-700 text-gray-200"
                          : "bg-white border-amber-200 text-slate-700"
                      )}
                    >
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-3 py-3">
                    <button
                      onClick={() =>
                        updateStatus(r.id, r.status === "Đã kích hoạt" ? "Đã vô hiệu hóa" : "Đã kích hoạt")
                      }
                      className={cls(
                        "px-2 py-0.5 rounded-full text-[11px] font-semibold",
                        r.status === "Đã kích hoạt"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700"
                      )}
                    >
                      {r.status}
                    </button>
                  </td>
                  {/* 2FA */}
                  <td className="px-3 py-3">
                    <label className="inline-flex items-center gap-2 cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        className="accent-indigo-500"
                        checked={r.twoFA}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          update2FA(r.id, e.target.checked)
                        }
                      />
                      <span className={dark ? "text-gray-300" : "text-gray-700"}>
                        {r.twoFA ? "Enabled" : "Disabled"}
                      </span>
                    </label>
                  </td>
                  {/* Last Active */}
                  <td className="px-3 py-3 text-[12px] text-gray-400">
                    {new Date(r.lastActive).toLocaleString()}
                  </td>
                 
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs bg-indigo-500 hover:bg-indigo-600 text-white"
                        onClick={() => resetPwd(r.id)}
                        title="Reset Password"
                        type="button"
                      >
                        <KeyOutlined /> Đăt lại mật khẩu
                      </button>
                      <button
                        className={cls(
                          "inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs border",
                          dark
                            ? "text-gray-300 border-gray-700 hover:bg-gray-800"
                            : "text-slate-700 border-amber-200 hover:bg-white"
                        )}
                        onClick={() => alert(`Edit ${r.id}`)}
                        title="Edit"
                        type="button"
                      >
                        <EditOutlined /> Sửa
                      </button>
                      <button
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs bg-rose-500 hover:bg-rose-600 text-white"
                        onClick={() => removeRow(r.id)}
                        title="Remove"
                        type="button"
                      >
                        <DeleteOutlined /> Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-3 flex items-center justify-between">
        <p className="text-xs text-gray-400">
          Trang {page} / {totalPages} • {filteredList.length} quản trị viên
        </p>
        <div className="flex items-center gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className={cls(
              "px-3 py-1.5 rounded-lg text-sm border",
              `${dark ? "text-gray-300 border-gray-700 hover:bg-gray-800" : "text-slate-700 border-amber-200 hover:bg-white"}`,
              page <= 1
                ? "opacity-50 cursor-not-allowed"
                : dark
                ? "text-gray-300 border-gray-700 hover:bg-gray-800"
                : "text-slate-700 border-amber-200 hover:bg-white"
            )}
          >
            Trước
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className={cls(
              "px-3 py-1.5 rounded-lg text-sm border",
                `${dark ? "text-gray-300 border-gray-700 hover:bg-gray-800" : "text-slate-700 border-amber-200 hover:bg-white"}`,
              page >= totalPages
                ? "opacity-50 cursor-not-allowed"
                : dark
                ? "text-gray-300 border-gray-700 hover:bg-gray-800"
                : "text-slate-700 border-amber-200 hover:bg-white"
            )}
          >
            Sau
          </button>
        </div>
      </div>

     
      <Modal
        dark={dark}
        open={openInvite}
        title="Invite New Admin"
        onClose={() => setOpenInvite(false)}
        onOk={invite}
        okText="Send Invite"
      >
        <div className="flex flex-col gap-3">
          <div>
            <label
              className={cls(
                "block text-xs mb-1",
                dark ? "text-gray-300" : "text-slate-700"
              )}
            >
              Email
            </label>
            <input
              value={inviteEmail}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInviteEmail(e.target.value)
              }
              placeholder="name@example.com"
              className={cls(
                "w-full px-3 py-2 rounded-xl outline-none border text-sm",
                dark
                  ? "bg-gray-900 border-gray-700 text-gray-200"
                  : "bg-white border-amber-200 text-slate-700"
              )}
            />
          </div>
        </div>
      </Modal>
    </main>
  );
}
