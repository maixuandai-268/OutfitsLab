import { useMemo, useState } from "react";
import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";

/** Fake data — có vài record giống ảnh mẫu + thêm dữ liệu để test lọc/sort */
const seedUsers = [
  {
    id: "U001",
    name: "Linh Trang",
    email: "linh@example.com",
    joined: "2024-01-15",
    orders: 12,
    status: "active",
  },
  {
    id: "U002",
    name: "Minh Anh",
    email: "minh@example.com",
    joined: "2024-01-14",
    orders: 6,
    status: "active",
  },
  {
    id: "U003",
    name: "Trần Văn B",
    email: "tvb@example.com",
    joined: "2023-11-03",
    orders: 0,
    status: "inactive",
  },
  {
    id: "U004",
    name: "Ngọc H.",
    email: "ngoch@example.com",
    joined: "2025-03-22",
    orders: 3,
    status: "active",
  },
  {
    id: "U005",
    name: "Hoài Phương",
    email: "hp@example.com",
    joined: "2025-07-19",
    orders: 8,
    status: "active",
  },
];

interface UsersPageProps {
  dark: boolean;
}
function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    active: "bg-emerald-100 text-emerald-700",
    inactive: "bg-amber-100 text-amber-700",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
        map[status] || "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
}

function exportCsv(rows: typeof seedUsers, filename = "users.csv") {
  const headers = ["User", "Email", "Joined", "Orders", "Status"];
  const toCsv = (value: string | number | null | undefined) => {
    if (value == null) return "";
    const s = String(value);
    if (s.includes(",") || s.includes('"') || s.includes("\n")) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };

  const lines = [
    headers.join(","),
    ...rows.map((u) =>
      [u.name, u.email, u.joined, u.orders, u.status].map(toCsv).join(",")
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

export default function UsersPage({ dark }: UsersPageProps) {
  const [q, setQ] = useState("");
  // -> Make users editable
  const [users, setUsers] = useState(seedUsers);

  // inline edit state
  const [editId, setEditId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ name: string; email: string }>({
    name: "",
    email: "",
  });

  const filtered = useMemo(() => {
    const kw = q.trim().toLowerCase();
    if (!kw) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(kw) ||
        u.email.toLowerCase().includes(kw)
    );
  }, [q, users]);

  function handleDelete(id: string) {
    // optional: confirm before delete
    if (!confirm("Bạn có chắc muốn xóa user này?")) return;
    setUsers((prev) => prev.filter((u) => u.id !== id));
    // if deleting currently edited user, cancel edit
    if (editId === id) {
      setEditId(null);
      setEditValues({ name: "", email: "" });
    }
  }

  function handleEditStart(user: (typeof seedUsers)[0]) {
    setEditId(user.id);
    setEditValues({ name: user.name, email: user.email });
  }

  function handleEditCancel() {
    setEditId(null);
    setEditValues({ name: "", email: "" });
  }

  function handleEditSave(id: string) {
    // basic validation
    if (!editValues.name.trim()) {
      alert("Tên không được để trống");
      return;
    }
    if (!editValues.email.trim()) {
      alert("Email không được để trống");
      return;
    }
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, name: editValues.name, email: editValues.email } : u
      )
    );
    setEditId(null);
    setEditValues({ name: "", email: "" });
  }

  return (
    <main className="flex-1 overflow-y-auto p-6">
      {/* Header */}
      <div className="mb-4">
        <h1 className={`text-xl font-bold ${dark ? "text-gray-50" : "text-gray-900"}`}>Users</h1>
        <p className="text-xs text-gray-400 mt-0.5">
          Manage your users, search and export.
        </p>
      </div>

      {/* Search + Export */}
      <div
        className={`flex items-center gap-3 p-2.5 rounded-xl mb-3 ${
          dark ? "bg-gray-800 border border-gray-700" : "bg-amber-50 border border-amber-200"
        }`}
        style={{ boxShadow: dark ? "none" : "inset 0 0 0 0" }}
      >
        <div className="relative flex-1">
          <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search users by name or email..."
            className={`w-full pl-9 pr-4 py-2 rounded-xl text-[13px] outline-none border transition-colors ${
              dark
                ? "bg-gray-900 border-gray-700 text-gray-200 placeholder-gray-500 focus:border-indigo-500"
                : "bg-white border-amber-200 text-gray-700 placeholder-slate-400 focus:border-amber-300"
            }`}
          />
        </div>

        <button
          onClick={() => exportCsv(filtered)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-amber-500 hover:bg-amber-600 text-white transition-colors"
        >
          <DownloadOutlined /> Export
        </button>
      </div>

      {/* Table */}
      <div
        className={`rounded-2xl border ${
          dark ? "border-gray-700 bg-gray-800" : "border-amber-200 bg-amber-50"
        }`}
      >
        <div className={`overflow-x-auto rounded-2xl ${dark ? "" : "p-2"}`}>
          <table className="w-full border-collapse">
            <thead>
              <tr className={`${dark ? "border-b border-gray-700" : "border-b border-amber-200"}`}>
                {["User", "Email", "Joined", "Orders", "Status", "Actions"].map((h) => (
                  <th
                    key={h}
                    className={`px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide ${
                      dark ? "text-gray-400" : "text-amber-800"
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, idx) => {
                const isEditing = editId === u.id;
                return (
                  <tr
                    key={u.id}
                    className={`${
                      idx < filtered.length - 1
                        ? dark
                          ? "border-b border-gray-700/50"
                          : "border-b border-amber-100"
                        : ""
                    } ${dark ? "hover:bg-gray-900/60" : "hover:bg-white/60"} transition-colors`}
                  >
                    {/* User */}
                    <td className="px-3 py-3.5">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
                          style={{ background: `hsl(${u.name.charCodeAt(0) * 5}, 60%, 52%)` }}
                        >
                          {u.name[0]}
                        </div>
                        {isEditing ? (
                          <input
                            value={editValues.name}
                            onChange={(e) => setEditValues((s) => ({ ...s, name: e.target.value }))}
                            placeholder="User name"
                            className="text-[13px] font-medium rounded px-2 py-1 border"
                          />
                        ) : (
                          <span className={`text-[13px] font-medium ${dark ? "text-gray-200" : "text-gray-800"}`}>
                            {u.name}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Email */}
                    <td className={`px-3 py-3.5 text-[13px] ${dark ? "text-gray-300" : "text-gray-700"}`}>
                      {isEditing ? (
                        <input
                          value={editValues.email}
                          onChange={(e) => setEditValues((s) => ({ ...s, email: e.target.value }))}
                          placeholder="Email address"
                          className="text-[13px] rounded px-2 py-1 border"
                        />
                      ) : (
                        u.email
                      )}
                    </td>

                    {/* Joined */}
                    <td className="px-3 py-3.5 text-[13px] text-gray-400">
                      {u.joined}
                    </td>

                    {/* Orders */}
                    <td className={`px-3 py-3.5 text-[13px] font-semibold ${dark ? "text-gray-100" : "text-gray-900"}`}>
                      {u.orders}
                    </td>

                    {/* Status */}
                    <td className="px-3 py-3.5">
                      <StatusPill status={u.status} />
                    </td>

                    {/* Actions */}
                    <td className="px-3 py-3.5 gap-2">
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <button
                            className="text-[13px] font-semibold text-amber-700 hover:text-amber-800"
                            onClick={() => handleEditSave(u.id)}
                          >
                            Lưu
                          </button>
                          <button
                            className="text-[13px] font-semibold text-gray-500 hover:text-gray-700"
                            onClick={handleEditCancel}
                          >
                            Hủy
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <button
                            className={`text-[13px] font-semibold ${
                              dark ? "text-indigo-400 hover:text-indigo-300" : "text-amber-700 hover:text-amber-800"
                            }`}
                            onClick={() => handleDelete(u.id)}
                          >
                            Xóa
                          </button>
                          <button
                            className={`text-[13px] font-semibold ${
                              dark ? "text-indigo-400 hover:text-indigo-300" : "text-amber-700 hover:text-amber-800"
                            }`}
                            onClick={() => handleEditStart(u)}
                          >
                            Sửa
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td className="px-3 py-6 text-center text-sm text-gray-400" colSpan={6}>
                    No users found.
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