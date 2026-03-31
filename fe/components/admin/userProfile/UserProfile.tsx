import { useMemo, useState, useEffect } from "react";
import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://outfitslab.onrender.com";

interface User {
  id: string | number;
  name: string;
  email: string;
  joined: string;
  orders: number;
  status: "Hoạt động" | "Không hoạt động";
  role: "user" | "admin" | "shop";
}

interface UsersPageProps {
  dark: boolean;
}

function normalizeVN(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

function exportCsv(rows: User[], filename = "users.csv") {
  const headers = ["ID", "Người dùng", "Email", "Tham gia", "Đơn hàng", "Trạng thái", "Vai trò"];
  const toCsv = (value: string | number | null | undefined) => {
    if (value == null) return "";
    const s = String(value);
    return s.includes(",") || s.includes('"') || s.includes("\n")
      ? `"${s.replace(/"/g, '""')}"`
      : s;
  };
  const lines = [
    headers.join(","),
    ...rows.map((u) =>
      [u.id, u.name, u.email, u.joined, u.orders, u.status, u.role].map(toCsv).join(",")
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

function StatusPill({ status }: { status: string }) {
  const isActive = status === "Hoạt động";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${isActive ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"
        }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-red-400"}`} />
      {status}
    </span>
  );
}

function RolePill({ role }: { role: string }) {
  const map: Record<string, string> = {
    admin: "bg-red-100 text-red-700 border border-red-200",
    user: "bg-blue-100 text-blue-700 border border-blue-200",
    shop: "bg-purple-100 text-purple-700 border border-purple-200",
  };
  const label: Record<string, string> = {
    admin: "👑 Admin",
    user: "👤 User",
    shop: "🏪 Shop",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${map[role] || "bg-slate-100 text-slate-600"
        }`}
    >
      {label[role] ?? role}
    </span>
  );
}

function Avatar({ name }: { name: string }) {
  const hue =
    ((name.charCodeAt(0) ?? 0) * 37 + (name.charCodeAt(1) ?? 0) * 17) % 360;
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
      style={{ background: `hsl(${hue}, 58%, 50%)` }}
    >
      {name[0]?.toUpperCase() ?? "?"}
    </div>
  );
}

export default function UsersPage({ dark }: UsersPageProps) {
  const [q, setQ] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editId, setEditId] = useState<string | number | null>(null);
  const [editValues, setEditValues] = useState<{
    name: string;
    email: string;
    status: "Hoạt động" | "Không hoạt động";
    role: "user" | "admin" | "shop";
  }>({ name: "", email: "", status: "Hoạt động", role: "user" });

  const refetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const API_BASE =
        process.env.NEXT_PUBLIC_API_URL || "https://outfitslab.onrender.com";
      const response = await fetch(`${API_BASE}/api/users`);
      if (!response.ok) throw new Error(`Failed to fetch users: ${response.statusText}`);

      const data = await response.json();
      const userList = Array.isArray(data) ? data : data.data || [];

      const mappedUsers: User[] = userList.map((u: any) => ({
        id: u.id,
        name:
          u.displayName ||
          `${u.firstName || ""} ${u.lastName || ""}`.trim() ||
          u.email,
        email: u.email,
        joined: u.createdAt,
        orders: 0,
        status: u.isActive ? "Hoạt động" : "Không hoạt động",
        role: u.role || "user",
      }));

      setUsers(mappedUsers);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetchUsers();
  }, []);

  const filtered = useMemo(() => {
    const kw = normalizeVN(q);
    if (!kw) return users;
    return users.filter(
      (u) =>
        normalizeVN(u.name).includes(kw) ||
        normalizeVN(u.email).includes(kw)
    );
  }, [q, users]);

  async function handleDelete(id: string | number) {
    if (!confirm("Bạn có chắc muốn xóa user này?")) return;

    try {
      console.log("DELETE ID:", id, "TYPE:", typeof id);
      const deleteUrl = `${API_BASE}/api/users/${Number(id)}`;
      console.log("DELETE URL:", deleteUrl);

      const res = await fetch(deleteUrl, { method: "DELETE" });

      console.log("DELETE RESPONSE STATUS:", res.status);
      const responseText = await res.text();
      console.log("DELETE RESPONSE:", responseText);

      if (!res.ok) throw new Error(responseText || "Delete failed");

      console.log("Refetching users after delete...");
      await refetchUsers();
      alert("Xóa người dùng thành công");
    } catch (err) {
      console.error("DELETE ERROR:", err);
      alert(
        "Xóa thất bại: " +
        (err instanceof Error ? err.message : "Lỗi không xác định")
      );
    }
  }

  function handleEditStart(user: User) {
    setEditId(user.id);
    setEditValues({
      name: user.name,
      email: user.email,
      status: user.status,
      role: user.role,
    });
  }

  function handleEditCancel() {
    setEditId(null);
    setEditValues({ name: "", email: "", status: "Hoạt động", role: "user" });
  }

  async function handleEditSave(id: string | number) {
    if (!editValues.name.trim()) { alert("Tên không được để trống"); return; }
    if (!editValues.email.trim()) { alert("Email không được để trống"); return; }

    // Confirm admin escalation
    const currentUser = users.find((u) => u.id === id);
    if (editValues.role === "admin" && currentUser?.role !== "admin") {
      if (!confirm("Bạn chắc chắn muốn cấp quyền ADMIN cho người dùng này?")) return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: editValues.name,
          email: editValues.email,
          isActive: editValues.status === "Hoạt động",
          role: editValues.role,
        }),
      });

      if (!response.ok) throw new Error((await response.text()) || "Update failed");

      await refetchUsers();
      setEditId(null);
      alert("Cập nhật thành công");
    } catch (err) {
      alert("Cập nhật thất bại: " + (err instanceof Error ? err.message : "Lỗi không xác định"));
    }
  }

  const inputCls = `text-[13px] rounded-lg px-2 py-1 border outline-none w-full ${dark
    ? "bg-gray-900 border-gray-600 text-gray-200 focus:border-indigo-400"
    : "bg-white border-amber-300 text-gray-800 focus:border-amber-500"
    }`;

  const selectCls = `text-[13px] rounded-lg px-2 py-1 border outline-none cursor-pointer ${dark
    ? "bg-gray-900 border-gray-600 text-gray-200"
    : "bg-white border-amber-300 text-gray-800"
    }`;

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="mb-4">
        <h1 className={`text-xl font-bold ${dark ? "text-gray-50" : "text-gray-900"}`}>
          Người dùng
        </h1>
        <p className="text-xs text-gray-400 mt-0.5">
          Quản lý người dùng, chỉnh sửa thông tin và theo dõi trạng thái hoạt động.
        </p>
      </div>
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
      {loading && (
        <div
          className={`p-3 rounded-lg mb-4 text-sm ${dark
            ? "bg-blue-900/30 text-blue-400 border border-blue-800"
            : "bg-blue-50 text-blue-700 border border-blue-200"
            }`}
        >
          Đang tải dữ liệu người dùng...
        </div>
      )}

      <div
        className={`flex items-center gap-3 p-2.5 rounded-xl mb-3 ${dark ? "bg-gray-800 border border-gray-700" : "bg-amber-50 border border-amber-200"
          }`}
      >
        <div className="relative flex-1">
          <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm kiếm theo tên, email..."
            className={`w-full pl-9 pr-4 py-2 rounded-xl text-[13px] outline-none border transition-colors ${dark
              ? "bg-gray-900 border-gray-700 text-gray-200 placeholder-gray-500 focus:border-indigo-500"
              : "bg-white border-amber-200 text-gray-700 placeholder-slate-400 focus:border-amber-300"
              }`}
          />
        </div>
        <button
          onClick={() => exportCsv(filtered)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-amber-500 hover:bg-amber-600 text-white transition-colors"
        >
          <DownloadOutlined /> Xuất
        </button>
      </div>
      <div
        className={`rounded-2xl border ${dark ? "border-gray-700 bg-gray-800" : "border-amber-200 bg-amber-50"
          }`}
      >
        <div className={`overflow-x-auto rounded-2xl ${dark ? "" : "p-2"}`}>
          <table className="w-full border-collapse">
            <thead>
              <tr className={dark ? "border-b border-gray-700" : "border-b border-amber-200"}>
                {["Người dùng", "Email", "Ngày tham gia", "Số đơn", "Trạng thái", "Vai trò", "Hành động"].map(
                  (h) => (
                    <th
                      key={h}
                      className={`px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide ${dark ? "text-gray-400" : "text-amber-800"
                        }`}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {filtered.map((u, idx) => {
                const isEditing = editId === u.id;
                const isLast = idx === filtered.length - 1;

                return (
                  <tr
                    key={u.id}
                    className={`${!isLast
                      ? dark
                        ? "border-b border-gray-700/50"
                        : "border-b border-amber-100"
                      : ""
                      } ${dark ? "hover:bg-gray-900/60" : "hover:bg-white/60"} transition-colors`}
                  >

                    <td className="px-3 py-3.5">
                      <div className="flex items-center gap-2">
                        <Avatar name={u.name} />
                        <div className="flex flex-col min-w-0">
                          {isEditing ? (
                            <input
                              value={editValues.name}
                              onChange={(e) =>
                                setEditValues((s) => ({ ...s, name: e.target.value }))
                              }
                              placeholder="Tên người dùng"
                              className={inputCls}
                            />
                          ) : (
                            <span
                              className={`text-[13px] font-semibold leading-tight truncate ${dark ? "text-gray-200" : "text-gray-800"
                                }`}
                            >
                              {u.name}
                            </span>
                          )}
                          <span className="text-[11px] text-gray-400 font-mono mt-0.5">
                            #{u.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className={`px-3 py-3.5 text-[13px] ${dark ? "text-gray-300" : "text-gray-700"}`}>
                      {isEditing ? (
                        <input
                          value={editValues.email}
                          onChange={(e) =>
                            setEditValues((s) => ({ ...s, email: e.target.value }))
                          }
                          placeholder="Email"
                          className={inputCls}
                        />
                      ) : (
                        u.email
                      )}
                    </td>

                    <td className="px-3 py-3.5 text-[13px] text-gray-400 whitespace-nowrap">
                      {u.joined
                        ? new Date(u.joined).toLocaleString("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                        : "—"}
                    </td>

                    <td
                      className={`px-3 py-3.5 text-[13px] font-semibold ${dark ? "text-gray-100" : "text-gray-900"
                        }`}
                    >
                      {u.orders}
                    </td>

                    <td className="px-3 py-3.5">
                      {isEditing ? (
                        <select
                          value={editValues.status}
                          onChange={(e) =>
                            setEditValues((s) => ({
                              ...s,
                              status: e.target.value as "Hoạt động" | "Không hoạt động",
                            }))
                          }
                          className={selectCls}
                        >
                          <option value="Hoạt động">Hoạt động</option>
                          <option value="Không hoạt động">Không hoạt động</option>
                        </select>
                      ) : (
                        <StatusPill status={u.status} />
                      )}
                    </td>

                    <td className="px-3 py-3.5">
                      {isEditing ? (
                        <select
                          value={editValues.role}
                          onChange={(e) =>
                            setEditValues((s) => ({
                              ...s,
                              role: e.target.value as "user" | "admin" | "shop",
                            }))
                          }
                          className={selectCls}
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                          <option value="shop">Shop</option>
                        </select>
                      ) : (
                        <RolePill role={u.role} />
                      )}
                    </td>

                    <td className="px-3 py-3.5">
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <button
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer hover:scale-105 active:scale-95 ${dark
                              ? "bg-emerald-600 text-white hover:bg-emerald-700"
                              : "bg-emerald-500 text-white hover:bg-emerald-600"
                              }`}
                            onClick={() => handleEditSave(u.id)}
                            title="Lưu thay đổi"
                          >
                            💾 Lưu
                          </button>
                          <button
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer hover:scale-105 active:scale-95 ${dark
                              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                              }`}
                            onClick={handleEditCancel}
                            title="Hủy bỏ"
                          >
                            ❌ Hủy
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer hover:scale-105 active:scale-95 ${dark
                              ? "bg-amber-900/30 text-amber-400 hover:bg-amber-900/50"
                              : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                              }`}
                            onClick={() => handleEditStart(u)}
                            title="Chỉnh sửa người dùng"
                          >
                            ✏️ Sửa
                          </button>
                          <button
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer hover:scale-105 active:scale-95 ${dark
                              ? "bg-red-900/30 text-red-400 hover:bg-red-900/50"
                              : "bg-red-100 text-red-600 hover:bg-red-200"
                              }`}
                            onClick={() => {
                              console.log("🗑️ DELETE BUTTON CLICKED - USER ID:", u.id, "NAME:", u.name);
                              handleDelete(u.id);
                            }}
                            title="Xóa người dùng"
                          >
                            🗑️ Xóa
                          </button>

                        </div>
                      )}
                    </td>
                  </tr>
                )
              })}

              {filtered.length === 0 && !loading && (
                <tr>
                  <td className="px-3 py-10 text-center text-sm text-gray-400" colSpan={7}>
                    {q
                      ? `Không tìm thấy kết quả cho "${q}"`
                      : "Không có người dùng nào."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}