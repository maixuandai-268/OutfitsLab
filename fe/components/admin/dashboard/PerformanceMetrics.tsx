"use client";
import Card from "../shared/card";
import CardTitle from "../shared/cardTitle";

const recentOrders = [
  { id: "#1021", productName: "Áo Hoodie", category: "Áo", price: 285000, quantity: 2, date: "2026-03-28" },
  { id: "#1022", productName: "Áo Sơ Mi Trắng", category: "Áo", price: 420000, quantity: 1, date: "2026-03-28" },
  { id: "#1023", productName: "Váy Xòe", category: "Váy", price: 650000, quantity: 3, date: "2026-03-27" },
  { id: "#1024", productName: "Quần Jean Xanh", category: "Quần", price: 490000, quantity: 1, date: "2026-03-27" },
  { id: "#1025", productName: "Áo Khoác Da", category: "Áo", price: 980000, quantity: 2, date: "2026-03-26" },
  { id: "#1026", productName: "Áo Polo Xanh", category: "Áo", price: 320000, quantity: 4, date: "2026-03-26" },
  { id: "#1027", productName: "Chân Váy Dài", category: "Váy", price: 375000, quantity: 2, date: "2026-03-25" },
];

const formatVND = (amount: number) => amount.toLocaleString("vi-VN") + "₫";

const categoryColors: Record<string, string> = {
  "Áo": "bg-blue-500/20 text-blue-400",
  "Quần": "bg-indigo-500/20 text-indigo-400",
  "Váy": "bg-pink-500/20 text-pink-400",
};

function exportCSV() {
  const headers = ["ID Sản phẩm", "Tên sản phẩm", "Thể loại", "Đơn giá (₫)", "Số lượng", "Ngày đặt"];
  const rows = recentOrders.map((o) => [o.id, o.productName, o.category, o.price, o.quantity, o.date]);
  const csvContent =
    "\uFEFF" +
    [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `don-hang-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function exportPrint() {
  const rows = recentOrders
    .map(
      (o) => `<tr>
        <td class="id">${o.id}</td>
        <td>${o.productName}</td>
        <td><span class="badge">${o.category}</span></td>
        <td class="price">${formatVND(o.price)}</td>
        <td>×${o.quantity}</td>
        <td>${o.date}</td>
      </tr>`
    )
    .join("");

  const html = `<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"/>
    <title>Đơn hàng – OutfitsLab</title>
    <style>
      *{margin:0;padding:0;box-sizing:border-box}
      body{font-family:'Segoe UI',sans-serif;padding:32px;color:#111}
      h1{font-size:18px;font-weight:900;text-transform:uppercase;letter-spacing:.1em;margin-bottom:4px}
      p.sub{font-size:11px;color:#888;margin-bottom:24px}
      table{width:100%;border-collapse:collapse;font-size:13px}
      thead tr{background:#f3f4f6}
      th{text-align:left;padding:10px 12px;font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:#6b7280}
      td{padding:10px 12px;border-bottom:1px solid #e5e7eb}
      tr:last-child td{border-bottom:none}
      .badge{display:inline-block;padding:2px 8px;border-radius:999px;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;background:#f3f4f6}
      .price{color:#059669;font-weight:700}
      .id{color:#7c3aed;font-family:monospace;font-weight:700}
      footer{margin-top:32px;font-size:10px;color:#9ca3af;text-align:right}
    </style></head><body>
    <h1>Đơn Hàng Gần Đây</h1>
    <p class="sub">OutfitsLab Admin · Xuất lúc ${new Date().toLocaleString("vi-VN")}</p>
    <table>
      <thead><tr>
        <th>ID Sản phẩm</th><th>Tên sản phẩm</th><th>Thể loại</th>
        <th>Đơn giá</th><th>SL</th><th>Ngày đặt</th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <footer>Tổng ${recentOrders.length} đơn hàng</footer>
    </body></html>`;

  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 400);
}

export default function PerformanceMetrics({ dark }: { dark: boolean }) {
  return (
    <Card dark={dark}>
      <div className="flex items-center justify-between mb-4">
        <CardTitle dark={dark} title="Đơn Hàng Gần Đây" />

        <div className="flex items-center gap-2">
          <button onClick={exportCSV} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all
              ${dark
              ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20"
              : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200"}`}>
            CSV
          </button>

          <button onClick={exportPrint} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all
              ${dark
              ? "bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/20"
              : "bg-purple-50 text-purple-600 hover:bg-purple-100 border border-purple-200"}`}>
            In / PDF
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div
          className="overflow-y-auto"
          style={{
            maxHeight: "212px",
            scrollbarWidth: "thin",
            scrollbarColor: dark ? "#4b5563 transparent" : "#d1d5db transparent",
          }}
        >
          <table className="w-full text-sm">
            <thead className={`sticky top-0 z-10 ${dark ? "bg-gray-900" : "bg-white"}`}>
              <tr className={`${dark ? "text-gray-400" : "text-gray-500"} text-xs`}>
                <th className="text-left py-2 pr-3 whitespace-nowrap w-[88px]">ID Sản phẩm</th>
                <th className="text-left py-2 pr-4">Tên sản phẩm</th>
                <th className="text-left py-2 pr-4">Thể loại</th>
                <th className="text-left py-2 pr-4 whitespace-nowrap">Đơn giá</th>
                <th className="text-left py-2 pr-4">SL</th>
                <th className="text-left py-2 whitespace-nowrap">Ngày đặt</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className={`border-t transition-colors ${dark ? "border-gray-800 hover:bg-gray-800/50" : "border-gray-100 hover:bg-gray-50"}`}
                >
                  <td className="py-3 pr-3">
                    <span className={`font-mono text-xs font-bold tracking-wide ${dark ? "text-purple-400" : "text-purple-600"}`}>
                      {order.id}
                    </span>
                  </td>

                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white flex items-center justify-center text-[10px] font-black flex-shrink-0">
                        {order.productName.charAt(0)}
                      </div>
                      <span className={`font-medium text-xs leading-tight ${dark ? "text-gray-100" : "text-gray-800"}`}>
                        {order.productName}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 pr-4">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${categoryColors[order.category] ?? "bg-gray-500/20 text-gray-400"}`}>
                      {order.category}
                    </span>
                  </td>

                  <td className={`py-3 pr-4 font-semibold text-xs whitespace-nowrap ${dark ? "text-emerald-400" : "text-emerald-600"}`}>
                    {formatVND(order.price)}
                  </td>

                  <td className={`py-3 pr-4 text-xs font-bold ${dark ? "text-gray-300" : "text-gray-700"}`}>
                    ×{order.quantity}
                  </td>

                  <td className={`py-3 text-xs whitespace-nowrap ${dark ? "text-gray-500" : "text-gray-400"}`}>
                    {order.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className={`text-[10px] font-bold uppercase tracking-widest mt-3 ${dark ? "text-gray-600" : "text-gray-400"}`}>
        {recentOrders.length} đơn hàng · cuộn để xem thêm
      </p>
    </Card>
  );
}