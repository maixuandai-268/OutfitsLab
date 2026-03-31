"use client";
import React, { useMemo, useState, useEffect, useCallback } from "react";
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

// ─── Types ────────────────────────────────────────────────────────────────────

type AdminStatus = "Đã kích hoạt" | "Đã vô hiệu hóa";
type AdminRole = "super-admin" | "admin" | "auditor";
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

// ─── Toast ────────────────────────────────────────────────────────────────────

interface ToastItem {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const show = useCallback(
    (message: string, type: ToastItem["type"] = "info") => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
    },
    []
  );
  return { toasts, show };
}

function ToastContainer({
  toasts,
  dark,
}: {
  toasts: ToastItem[];
  dark: boolean;
}) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cls(
            "px-4 py-2.5 rounded-xl text-sm font-medium shadow-lg border",
            t.type === "success"
              ? dark
                ? "bg-emerald-900 border-emerald-700 text-emerald-200"
                : "bg-emerald-50 border-emerald-300 text-emerald-800"
              : t.type === "error"
                ? dark
                  ? "bg-red-900 border-red-700 text-red-200"
                  : "bg-red-50 border-red-300 text-red-800"
                : dark
                  ? "bg-gray-700 border-gray-600 text-gray-200"
                  : "bg-white border-amber-200 text-gray-800"
          )}
        >
          {t.type === "success" ? "✅ " : t.type === "error" ? "❌ " : "ℹ️ "}
          {t.message}
        </div>
      ))}
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

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
      [r.name, r.email, r.role, r.status, r.twoFA ? "enabled" : "disabled", r.lastActive]
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

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function apiPut(id: string, body: Record<string, unknown>): Promise<void> {
  const res = await fetch(`${API_BASE}/api/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error((await res.text()) || "Cập nhật thất bại");
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function Modal(props: {
  dark: boolean;
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onOk?: () => void;
  okText?: string;
  loading?: boolean;
}) {
  const { dark, open, title, children, onClose, onOk, okText = "Lưu", loading } = props;
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
            disabled={loading}
            className={cls(
              "px-3 py-1.5 rounded-lg text-sm border disabled:opacity-50",
              dark
                ? "text-gray-300 border-gray-700 hover:bg-gray-700"
                : "text-slate-700 border-amber-200 hover:bg-amber-50"
            )}
          >
            Hủy
          </button>
          <button
            onClick={() => onOk?.()}
            disabled={loading}
            className="px-3 py-1.5 rounded-lg text-sm bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50"
          >
            {loading ? "⏳ Đang xử lý..." : okText}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminAccountsPage({ dark }: AdminAccountsPageProps) {
  const { toasts, show: toast } = useToast();

  // ── State ──
  const [rows, setRows] = useState<AdminUser[]>([]);
  const [q, setQ] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // tracks which action is in progress, e.g. "role-5", "status-3", "bulk-remove"
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Create Admin Modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createValues, setCreateValues] = useState({ name: "", email: "", password: "" });
  const [creatingAdmin, setCreatingAdmin] = useState(false);

  // Edit Admin Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTarget, setEditTarget] = useState<AdminUser | null>(null);
  const [editValues, setEditValues] = useState({
    name: "",
    email: "",
    role: "admin" as AdminRole,
    status: "Đã kích hoạt" as AdminStatus,
  });
  const [savingEdit, setSavingEdit] = useState(false);

  // Selection & Pagination
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState<number>(1);
  const pageSize = 5;

  // ── Fetch ──────────────────────────────────────────────────────────────────

  const fetchAdmins = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE}/api/users?role=admin`);
      if (!res.ok) throw new Error(`Lỗi khi tải danh sách admin: ${res.statusText}`);

      const data = await res.json();
      const adminList = Array.isArray(data) ? data : data.data || [];

      const mappedAdmins: AdminUser[] = adminList.map((u: any) => ({
        id: String(u.id),
        name:
          u.displayName ||
          `${u.firstName || ""} ${u.lastName || ""}`.trim() ||
          u.email,
        email: u.email,
        role: (u.role === "admin" ? "admin" : "auditor") as AdminRole,
        status: u.isActive ? "Đã kích hoạt" : "Đã vô hiệu hóa",
        twoFA: false,
        lastActive: new Date().toISOString(),
      }));

      setRows(mappedAdmins);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Lỗi không xác định";
      setError(msg);
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  // ── Create ─────────────────────────────────────────────────────────────────

  async function handleCreateAdmin() {
    if (!createValues.name.trim()) { toast("Tên không được để trống", "error"); return; }
    if (!createValues.email.trim()) { toast("Email không được để trống", "error"); return; }
    if (!createValues.password.trim()) { toast("Mật khẩu không được để trống", "error"); return; }

    try {
      setCreatingAdmin(true);
      const response = await fetch(`${API_BASE}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: createValues.name,
          email: createValues.email,
          password: createValues.password,
          role: "admin",
          isActive: true,
        }),
      });

      if (!response.ok) throw new Error((await response.text()) || "Tạo thất bại");

      setShowCreateModal(false);
      setCreateValues({ name: "", email: "", password: "" });
      toast("Tạo quản trị viên thành công", "success");
      await fetchAdmins();
    } catch (err) {
      toast(
        "Tạo thất bại: " + (err instanceof Error ? err.message : "Lỗi không xác định"),
        "error"
      );
    } finally {
      setCreatingAdmin(false);
    }
  }

  // ── Edit ───────────────────────────────────────────────────────────────────

  function openEdit(r: AdminUser) {
    setEditTarget(r);
    setEditValues({ name: r.name, email: r.email, role: r.role, status: r.status });
    setShowEditModal(true);
  }

  async function handleSaveEdit() {
    if (!editTarget) return;
    try {
      setSavingEdit(true);
      await apiPut(editTarget.id, {
        displayName: editValues.name,
        email: editValues.email,
        role: editValues.role,
        isActive: editValues.status === "Đã kích hoạt",
      });
      toast("Cập nhật thành công", "success");
      setShowEditModal(false);
      setEditTarget(null);
      await fetchAdmins();
    } catch (err) {
      toast(
        "Cập nhật thất bại: " + (err instanceof Error ? err.message : "Lỗi không xác định"),
        "error"
      );
    } finally {
      setSavingEdit(false);
    }
  }

  // ── Update Role (per row inline select) ────────────────────────────────────

  async function handleUpdateRole(id: string, role: AdminRole) {
    try {
      setActionLoading(`role-${id}`);
      await apiPut(id, { role });
      toast("Cập nhật vai trò thành công", "success");
      await fetchAdmins();
    } catch (err) {
      toast(
        "Cập nhật vai trò thất bại: " + (err instanceof Error ? err.message : "Lỗi"),
        "error"
      );
    } finally {
      setActionLoading(null);
    }
  }

  // ── Toggle Status (per row) ────────────────────────────────────────────────

  async function handleToggleStatus(id: string, currentStatus: AdminStatus) {
    // Toggle: if currently active → deactivate, and vice versa
    const isActive = currentStatus !== "Đã kích hoạt";
    try {
      setActionLoading(`status-${id}`);
      await apiPut(id, { isActive });
      toast(
        isActive ? "Đã kích hoạt tài khoản" : "Đã vô hiệu hóa tài khoản",
        "success"
      );
      await fetchAdmins();
    } catch (err) {
      toast(
        "Thay đổi trạng thái thất bại: " + (err instanceof Error ? err.message : "Lỗi"),
        "error"
      );
    } finally {
      setActionLoading(null);
    }
  }

  // ── Remove Admin → downgrade role to "user" ────────────────────────────────

  async function handleRemoveAdmin(id: string) {
    if (!confirm("Bạn có chắc muốn gỡ quyền admin? (Người dùng sẽ trở về role 'User')")) return;
    try {
      setActionLoading(`remove-${id}`);
      await apiPut(id, { role: "user" });
      toast("Đã gỡ quyền admin", "success");
      await fetchAdmins();
    } catch (err) {
      toast(
        "Gỡ quyền thất bại: " + (err instanceof Error ? err.message : "Lỗi"),
        "error"
      );
    } finally {
      setActionLoading(null);
    }
  }

  // ── Reset Password ─────────────────────────────────────────────────────────

  function resetPwd(id: string) {
    // TODO: call actual reset-password API when backend supports it
    toast(`Đã gửi yêu cầu đặt lại mật khẩu cho ID: ${id}`, "info");
  }

  // ── Bulk Actions ───────────────────────────────────────────────────────────

  async function bulkEnable() {
    if (selected.size === 0) return;
    try {
      setActionLoading("bulk-enable");
      await Promise.all(Array.from(selected).map((id) => apiPut(id, { isActive: true })));
      toast(`Đã kích hoạt ${selected.size} tài khoản`, "success");
      setSelected(new Set());
      await fetchAdmins();
    } catch (err) {
      toast("Thao tác thất bại: " + (err instanceof Error ? err.message : "Lỗi"), "error");
    } finally {
      setActionLoading(null);
    }
  }

  async function bulkDisable() {
    if (selected.size === 0) return;
    try {
      setActionLoading("bulk-disable");
      await Promise.all(Array.from(selected).map((id) => apiPut(id, { isActive: false })));
      toast(`Đã vô hiệu hóa ${selected.size} tài khoản`, "success");
      setSelected(new Set());
      await fetchAdmins();
    } catch (err) {
      toast("Thao tác thất bại: " + (err instanceof Error ? err.message : "Lỗi"), "error");
    } finally {
      setActionLoading(null);
    }
  }

  function bulkResetPwd() {
    toast(`Đã gửi yêu cầu đặt lại mật khẩu cho ${selected.size} tài khoản`, "info");
  }

  async function bulkRemove() {
    if (!confirm("Gỡ quyền admin cho các tài khoản này? (Tài khoản sẽ trở về role 'User')")) return;
    try {
      setActionLoading("bulk-remove");
      await Promise.all(Array.from(selected).map((id) => apiPut(id, { role: "user" })));
      toast(`Đã gỡ quyền ${selected.size} tài khoản`, "success");
      setSelected(new Set());
      await fetchAdmins();
    } catch (err) {
      toast("Thao tác thất bại: " + (err instanceof Error ? err.message : "Lỗi"), "error");
    } finally {
      setActionLoading(null);
    }
  }

  // ── Filter & Pagination ────────────────────────────────────────────────────

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

  const allSelected = selected.size > 0 && selected.size === filteredList.length;

  const pageRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredList.slice(start, start + pageSize);
  }, [filteredList, page]);

  const totalPages = Math.max(1, Math.ceil(filteredList.length / pageSize));

  const toggleAll = (checked: boolean) => {
    setSelected(checked ? new Set(filteredList.map((x) => x.id)) : new Set());
  };

  const toggleOne = (id: string, checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const isBulkLoading = actionLoading?.startsWith("bulk") ?? false;

  const containerBg = dark ? "" : "bg-amber-50/40";

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <main className={cls("flex-1 overflow-y-auto p-6", containerBg)}>
      <ToastContainer toasts={toasts} dark={dark} />

      {/* Error Banner */}
      {error && (
        <div
          className={`p-3 rounded-lg mb-4 text-sm ${dark
            ? "bg-red-900/30 text-red-400 border border-red-800"
            : "bg-red-50 text-red-700 border border-red-200"
            }`}
        >
          ⚠️ {error}
        </div>
      )}

      {/* Loading Banner */}
      {loading && (
        <div
          className={`p-3 rounded-lg mb-4 text-sm ${dark
            ? "bg-blue-900/30 text-blue-400 border border-blue-800"
            : "bg-blue-50 text-blue-700 border border-blue-200"
            }`}
        >
          ⏳ Đang tải dữ liệu admin...
        </div>
      )}

      {/* Header */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h1 className={cls("text-xl font-bold", dark ? "text-gray-50" : "text-gray-900")}>
            Quản lý tài khoản quản trị viên
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Quản lý quyền truy cập và vai trò của các quản trị viên trong cửa hàng của bạn.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <PlusOutlined /> Thêm quản trị viên
          </button>
          <button
            onClick={fetchAdmins}
            disabled={loading}
            className={cls(
              "inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm border disabled:opacity-50",
              dark
                ? "text-gray-300 border-gray-700 hover:bg-gray-800"
                : "text-slate-700 border-amber-200 hover:bg-white"
            )}
          >
            <ReloadOutlined /> Làm mới
          </button>
          <button
            onClick={() => csvExport(filteredList)}
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

      {/* Filters + Bulk Actions */}
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
            onChange={(e) => { setQ(e.target.value); setPage(1); }}
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
          onChange={(e) => { setRoleFilter(e.target.value as RoleFilter); setPage(1); }}
          className={cls(
            "px-3 py-2 rounded-xl text-sm outline-none border",
            dark ? "bg-gray-900 border-gray-700 text-gray-200" : "bg-white border-amber-200 text-slate-700"
          )}
        >
          <option value="all">Tất cả vai trò</option>
          <option value="super-admin">Super Admin</option>
          <option value="admin">Admin</option>
          <option value="auditor">Auditor</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value as StatusFilter); setPage(1); }}
          className={cls(
            "px-3 py-2 rounded-xl text-sm outline-none border",
            dark ? "bg-gray-900 border-gray-700 text-gray-200" : "bg-white border-amber-200 text-slate-700"
          )}
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="Đã kích hoạt">Đã kích hoạt</option>
          <option value="Đã vô hiệu hóa">Đã vô hiệu hóa</option>
        </select>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={bulkEnable}
            disabled={selected.size === 0 || isBulkLoading}
            className={cls(
              "inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold disabled:cursor-not-allowed",
              selected.size === 0 || isBulkLoading
                ? "bg-emerald-500/40 text-white/60"
                : "bg-emerald-500 hover:bg-emerald-600 text-white"
            )}
          >
            <UnlockOutlined />
            {actionLoading === "bulk-enable" ? "⏳..." : "Đã kích hoạt"}
          </button>
          <button
            onClick={bulkDisable}
            disabled={selected.size === 0 || isBulkLoading}
            className={cls(
              "inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold disabled:cursor-not-allowed",
              selected.size === 0 || isBulkLoading
                ? "bg-amber-500/40 text-white/60"
                : "bg-amber-500 hover:bg-amber-600 text-white"
            )}
          >
            <LockOutlined />
            {actionLoading === "bulk-disable" ? "⏳..." : "Đã vô hiệu hóa"}
          </button>
          <button
            onClick={bulkResetPwd}
            disabled={selected.size === 0 || isBulkLoading}
            className={cls(
              "inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold disabled:cursor-not-allowed",
              selected.size === 0 || isBulkLoading
                ? "bg-indigo-500/40 text-white/60"
                : "bg-indigo-500 hover:bg-indigo-600 text-white"
            )}
          >
            <KeyOutlined /> Đặt lại mật khẩu
          </button>
          <button
            onClick={bulkRemove}
            disabled={selected.size === 0 || isBulkLoading}
            className={cls(
              "inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold disabled:cursor-not-allowed",
              selected.size === 0 || isBulkLoading
                ? "bg-rose-500/40 text-white/60"
                : "bg-rose-500 hover:bg-rose-600 text-white"
            )}
          >
            <DeleteOutlined />
            {actionLoading === "bulk-remove" ? "⏳..." : "Xóa"}
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

      {/* Table */}
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
                  onChange={(e) => toggleAll(e.target.checked)}
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
              const isRowLoading =
                actionLoading === `role-${r.id}` ||
                actionLoading === `status-${r.id}` ||
                actionLoading === `remove-${r.id}`;

              return (
                <tr
                  key={r.id}
                  className={cls(
                    idx < pageRows.length - 1
                      ? dark ? "border-b border-gray-700/50" : "border-b border-amber-100"
                      : "",
                    dark ? "hover:bg-gray-900/60" : "hover:bg-amber-50/40",
                    isRowLoading ? "opacity-60 pointer-events-none" : "",
                    "transition-colors"
                  )}
                >
                  <td className="px-3 py-3">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => toggleOne(r.id, e.target.checked)}
                      aria-label={`Select ${r.name}`}
                    />
                  </td>

                  {/* Name + Avatar */}
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
                        style={{ background: `hsl(${r.name.charCodeAt(0) * 7}, 60%, 50%)` }}
                      >
                        {r.name[0]}
                      </div>
                      <div className="min-w-0">
                        <p className={cls("text-[13px] font-medium truncate", dark ? "text-gray-100" : "text-gray-900")}>
                          {r.name}
                        </p>
                        <p className="text-[11px] text-gray-400">ID: {r.id}</p>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className={cls("px-3 py-3 text-[13px] truncate", dark ? "text-gray-300" : "text-gray-700")}>
                    {r.email}
                  </td>

                  {/* Role — calls real API on change */}
                  <td className="px-3 py-3">
                    <select
                      value={r.role}
                      onChange={(e) => handleUpdateRole(r.id, e.target.value as AdminRole)}
                      disabled={isRowLoading}
                      className={cls(
                        "px-2 py-1 rounded-lg text-xs outline-none border disabled:opacity-50",
                        dark
                          ? "bg-gray-900 border-gray-700 text-gray-200"
                          : "bg-white border-amber-200 text-slate-700"
                      )}
                    >
                      <option value="super-admin">Super Admin</option>
                      <option value="admin">Admin</option>
                      <option value="auditor">Auditor</option>
                    </select>
                  </td>

                  {/* Status — calls real API on click */}
                  <td className="px-3 py-3">
                    <button
                      onClick={() => handleToggleStatus(r.id, r.status)}
                      disabled={isRowLoading}
                      className={cls(
                        "px-2 py-0.5 rounded-full text-[11px] font-semibold disabled:opacity-50",
                        r.status === "Đã kích hoạt"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700"
                      )}
                    >
                      {actionLoading === `status-${r.id}` ? "⏳..." : r.status}
                    </button>
                  </td>

                  {/* 2FA — UI-only toggle (no backend field) */}
                  <td className="px-3 py-3">
                    <label className="inline-flex items-center gap-2 cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        className="accent-indigo-500"
                        checked={r.twoFA}
                        onChange={() =>
                          setRows((prev) =>
                            prev.map((x) => (x.id === r.id ? { ...x, twoFA: !x.twoFA } : x))
                          )
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

                  {/* Actions */}
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs bg-indigo-500 hover:bg-indigo-600 text-white disabled:opacity-50"
                        onClick={() => resetPwd(r.id)}
                        disabled={isRowLoading}
                        title="Reset Password"
                        type="button"
                      >
                        <KeyOutlined /> Đặt lại mật khẩu
                      </button>
                      <button
                        className={cls(
                          "inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs border disabled:opacity-50",
                          dark
                            ? "text-gray-300 border-gray-700 hover:bg-gray-800"
                            : "text-slate-700 border-amber-200 hover:bg-white"
                        )}
                        onClick={() => openEdit(r)}
                        disabled={isRowLoading}
                        title="Edit"
                        type="button"
                      >
                        <EditOutlined /> Sửa
                      </button>
                      <button
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs bg-rose-500 hover:bg-rose-600 text-white disabled:opacity-50"
                        onClick={() => handleRemoveAdmin(r.id)}
                        disabled={isRowLoading}
                        title="Remove"
                        type="button"
                      >
                        {actionLoading === `remove-${r.id}` ? "⏳" : <DeleteOutlined />} Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {!loading && pageRows.length === 0 && (
              <tr>
                <td colSpan={8} className="px-3 py-8 text-center text-sm text-gray-400">
                  Không tìm thấy quản trị viên nào.
                </td>
              </tr>
            )}
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
              dark ? "text-gray-300 border-gray-700 hover:bg-gray-800" : "text-slate-700 border-amber-200 hover:bg-white",
              page <= 1 ? "opacity-50 cursor-not-allowed" : ""
            )}
          >
            Trước
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className={cls(
              "px-3 py-1.5 rounded-lg text-sm border",
              dark ? "text-gray-300 border-gray-700 hover:bg-gray-800" : "text-slate-700 border-amber-200 hover:bg-white",
              page >= totalPages ? "opacity-50 cursor-not-allowed" : ""
            )}
          >
            Sau
          </button>
        </div>
      </div>

      {/* ── Create Admin Modal ── */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className={`max-w-sm w-full mx-4 rounded-2xl p-6 ${dark ? "bg-gray-800" : "bg-white"}`}>
            <h2 className={`text-lg font-bold mb-4 ${dark ? "text-gray-100" : "text-gray-900"}`}>
              👑 Thêm Quản Trị Viên
            </h2>

            <div className="space-y-3 mb-6">
              {(["name", "email", "password"] as const).map((field) => (
                <div key={field}>
                  <label className={`text-xs font-semibold block mb-1 ${dark ? "text-gray-300" : "text-gray-700"}`}>
                    {field === "name" ? "Tên" : field === "email" ? "Email" : "Mật Khẩu"}
                  </label>
                  <input
                    type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                    value={createValues[field]}
                    onChange={(e) => setCreateValues((s) => ({ ...s, [field]: e.target.value }))}
                    placeholder={`Nhập ${field === "name" ? "tên" : field === "email" ? "email" : "mật khẩu"}`}
                    className={`w-full px-3 py-2 text-sm rounded-lg border outline-none ${dark
                      ? "bg-gray-900 border-gray-600 text-gray-200 focus:border-indigo-400"
                      : "bg-white border-amber-300 text-gray-800 focus:border-amber-500"
                      }`}
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => { setShowCreateModal(false); setCreateValues({ name: "", email: "", password: "" }); }}
                disabled={creatingAdmin}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 ${dark ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                ❌ Hủy
              </button>
              <button
                onClick={handleCreateAdmin}
                disabled={creatingAdmin}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold text-white transition-colors disabled:opacity-50 ${dark ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-500 hover:bg-indigo-600"
                  }`}
              >
                {creatingAdmin ? "⏳ Đang tạo..." : "💾 Tạo"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit Admin Modal ── */}
      <Modal
        dark={dark}
        open={showEditModal}
        title="✏️ Chỉnh sửa quản trị viên"
        onClose={() => { setShowEditModal(false); setEditTarget(null); }}
        onOk={handleSaveEdit}
        okText="Lưu thay đổi"
        loading={savingEdit}
      >
        <div className="space-y-3">
          <div>
            <label className={`text-xs font-semibold block mb-1 ${dark ? "text-gray-300" : "text-gray-700"}`}>
              Tên
            </label>
            <input
              value={editValues.name}
              onChange={(e) => setEditValues((s) => ({ ...s, name: e.target.value }))}
              className={`w-full px-3 py-2 text-sm rounded-lg border outline-none ${dark
                ? "bg-gray-900 border-gray-600 text-gray-200 focus:border-indigo-400"
                : "bg-white border-amber-300 text-gray-800 focus:border-amber-500"
                }`}
            />
          </div>
          <div>
            <label className={`text-xs font-semibold block mb-1 ${dark ? "text-gray-300" : "text-gray-700"}`}>
              Email
            </label>
            <input
              type="email"
              value={editValues.email}
              onChange={(e) => setEditValues((s) => ({ ...s, email: e.target.value }))}
              className={`w-full px-3 py-2 text-sm rounded-lg border outline-none ${dark
                ? "bg-gray-900 border-gray-600 text-gray-200 focus:border-indigo-400"
                : "bg-white border-amber-300 text-gray-800 focus:border-amber-500"
                }`}
            />
          </div>
          <div>
            <label className={`text-xs font-semibold block mb-1 ${dark ? "text-gray-300" : "text-gray-700"}`}>
              Vai trò
            </label>
            <select
              value={editValues.role}
              onChange={(e) => setEditValues((s) => ({ ...s, role: e.target.value as AdminRole }))}
              className={`w-full px-3 py-2 text-sm rounded-lg border outline-none ${dark ? "bg-gray-900 border-gray-600 text-gray-200" : "bg-white border-amber-300 text-gray-800"
                }`}
            >
              <option value="super-admin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="auditor">Auditor</option>
            </select>
          </div>
          <div>
            <label className={`text-xs font-semibold block mb-1 ${dark ? "text-gray-300" : "text-gray-700"}`}>
              Trạng thái
            </label>
            <select
              value={editValues.status}
              onChange={(e) => setEditValues((s) => ({ ...s, status: e.target.value as AdminStatus }))}
              className={`w-full px-3 py-2 text-sm rounded-lg border outline-none ${dark ? "bg-gray-900 border-gray-600 text-gray-200" : "bg-white border-amber-300 text-gray-800"
                }`}
            >
              <option value="Đã kích hoạt">Đã kích hoạt</option>
              <option value="Đã vô hiệu hóa">Đã vô hiệu hóa</option>
            </select>
          </div>
        </div>
      </Modal>
    </main>
  );
}