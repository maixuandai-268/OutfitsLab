"use client";
import Card from "../shared/card";
import CardTitle from "../shared/cardTitle";
import {
  FilterOutlined, DownloadOutlined, MoreOutlined,
  CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined, CloseCircleOutlined
} from "@ant-design/icons";

// Data + config tại chỗ
type OrderStatus = "Completed" | "Processing" | "Pending" | "Cancelled";

const orders: Array<{ id: string; customer: string; product: string; amount: string; status: OrderStatus; date: string }> = [
  { id: "#ORD-001", customer: "Alice Johnson", product: "T-Shirt",    amount: "$1,299", status: "Completed",  date: "Mar 10, 2026" },
  { id: "#ORD-002", customer: "Bob Smith",     product: "Jeans",  amount: "$999",   status: "Processing", date: "Mar 10, 2026" },
  { id: "#ORD-003", customer: "Carol White",   product: "Hoodie",    amount: "$549",   status: "Pending",    date: "Mar 09, 2026" },
  { id: "#ORD-004", customer: "David Lee",     product: "Jacket",       amount: "$749",   status: "Completed",  date: "Mar 09, 2026" },
  { id: "#ORD-005", customer: "Emma Brown",    product: "Sneakers", amount: "$399",   status: "Cancelled",  date: "Mar 08, 2026" },
];

const statusConfig: Record<OrderStatus, { cls: string; icon: React.ReactElement }> = {
  Completed:  { cls: "bg-emerald-100 text-emerald-700", icon: <CheckCircleOutlined /> },
  Processing: { cls: "bg-blue-100 text-blue-700",       icon: <ClockCircleOutlined /> },
  Pending:    { cls: "bg-amber-100 text-amber-700",     icon: <ExclamationCircleOutlined /> },
  Cancelled:  { cls: "bg-red-100 text-red-700",         icon: <CloseCircleOutlined /> },
};

export default function OrdersTable({ dark } : { dark: boolean }) {
  const headers = ["Order ID", "Customer", "Product", "Amount", "Status", "Date", ""];

  return (
    <Card dark={dark}>
      <div className="flex items-start justify-between mb-5">
        <CardTitle dark={dark} title="Recent Orders" sub="Latest 5 transactions" />
        <div className="flex gap-2">
          <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-colors ${
            dark ? "border-gray-700 text-gray-400 hover:bg-gray-700" : "border-slate-200 text-slate-500 hover:bg-slate-50"
          }`}>
            <FilterOutlined /> Filter
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-500 hover:bg-indigo-600 text-white transition-colors">
            <DownloadOutlined /> Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className={`border-b ${dark ? "border-gray-700" : "border-slate-100"}`}>
              {headers.map((h) => (
                <th key={h} className="px-3 py-2.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr
                key={order.id}
                className={`transition-colors group cursor-pointer ${
                  i < orders.length - 1 ? (dark ? "border-b border-gray-700/50" : "border-b border-slate-50") : ""
                } ${dark ? "hover:bg-gray-900/60" : "hover:bg-slate-50"}`}
              >
                <td className="px-3 py-3.5 text-[13px] font-semibold text-indigo-500">{order.id}</td>
                <td className="px-3 py-3.5">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
                      style={{ background: `hsl(${order.customer.charCodeAt(0) * 5}, 60%, 52%)` }}
                    >
                      {order.customer[0]}
                    </div>
                    <span className={`text-[13px] font-medium ${dark ? "text-gray-200" : "text-gray-700"}`}>
                      {order.customer}
                    </span>
                  </div>
                </td>
                <td className="px-3 py-3.5 text-[13px] text-gray-400">{order.product}</td>
                <td className={`px-3 py-3.5 text-[13px] font-semibold ${dark ? "text-gray-100" : "text-gray-800"}`}>{order.amount}</td>
                <td className="px-3 py-3.5">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11.5px] font-semibold ${statusConfig[order.status].cls}`}>
                    {statusConfig[order.status].icon} {order.status}
                  </span>
                </td>
                <td className="px-3 py-3.5 text-[12px] text-gray-400">{order.date}</td>
                <td className="px-3 py-3.5">
                  <button type="button" title="More options" className="text-gray-400 hover:text-gray-200 transition-colors opacity-0 group-hover:opacity-100">
                    <MoreOutlined className="text-base" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}