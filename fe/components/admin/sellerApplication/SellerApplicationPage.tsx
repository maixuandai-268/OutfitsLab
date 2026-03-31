"use client";
import { useEffect, useMemo, useState } from "react";
import { CheckOutlined, CloseOutlined, EyeOutlined } from "@ant-design/icons";
import { sellerAPI, Shop } from "@/lib/api/seller";

export default function SellerApplicationsPage({ dark }: { dark: boolean }) {
  const [apps, setApps] = useState<Shop[]>([]);
  const [tab, setTab] = useState("Tất cả");
  const [loading, setLoading] = useState(true);

  const fetchShops = async () => {
    setLoading(true);
    try {
      const data = await sellerAPI.getShops();
      setApps(data);
    } catch (error) {
      console.error("Lỗi fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  const onApprove = async (id: number) => {
    try {
      const success = await sellerAPI.approveShop(id);
      if (success) {
        alert("Đã phê duyệt shop thành công!");
        fetchShops();
      } else {
        alert("Lỗi khi kết nối server phê duyệt.");
      }
    } catch (error) {
      alert("Lỗi khi kết nối server phê duyệt.");
    }
  };

  const onReject = async (id: number) => {
    try {
      const success = await sellerAPI.rejectShop(id);
      if (success) {
        alert("Đã từ chối shop!");
        fetchShops();
      } else {
        alert("Lỗi khi kết nối server từ chối.");
      }
    } catch (error) {
      alert("Lỗi khi kết nối server từ chối.");
    }
  };

  const filtered = useMemo(() => {
    const statusMap: any = {
      "Chờ xét duyệt": "pending",
      "Đã duyệt": "approved",
      "Từ chối": "rejected",
    };
    if (tab === "Tất cả") return apps;
    return apps.filter((a) => a.status === statusMap[tab]);
  }, [tab, apps]);

  if (loading) return <div className="p-10 text-center font-medium">Đang tải dữ liệu từ hệ thống...</div>;

  return (
    <main className={`flex-1 p-6 ${dark ? "bg-gray-900" : "bg-amber-50/40"}`}>
      <h1 className={`text-2xl font-bold mb-6 ${dark ? "text-white" : "text-gray-800"}`}>Quản lý đăng ký Seller</h1>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {["Tất cả", "Chờ xét duyệt", "Đã duyệt", "Từ chối"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${tab === t ? "bg-teal-700 text-white border-teal-700" : "bg-white text-gray-600 border-gray-200"
              }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {filtered.map((app) => (
          <div key={app.id} className={`rounded-2xl border p-5 shadow-sm ${dark ? "bg-gray-800 border-gray-700" : "bg-white border-amber-200"}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className={`text-lg font-bold ${dark ? "text-white" : "text-gray-900"}`}>{app.shop_name}</h3>
                <p className="text-sm text-gray-500">Chủ ID: {app.ownerId} • Email: {app.contact_email}</p>
                <p className={`text-sm mt-1 ${dark ? "text-gray-400" : "text-gray-600"}`}>{app.description || "Không có mô tả shop."}</p>
              </div>
              <StatusBadge status={app.status} />
            </div>

            <div className="border-t pt-4 flex flex-wrap justify-between items-center gap-3">
              <span className="text-xs text-gray-400 font-medium">
                Gửi lúc: {new Date(app.created_at).toLocaleString('vi-VN')}
              </span>
              <div className="flex gap-2">
                {app.status === "pending" && (
                  <>
                    <button onClick={() => onApprove(app.id)} className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors">
                      <CheckOutlined /> Phê duyệt
                    </button>
                    <button onClick={() => onReject(app.id)} className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors">
                      <CloseOutlined /> Từ chối
                    </button>
                  </>
                )}
                <button className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors">
                  <EyeOutlined /> Xem hồ sơ
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400 italic">Không tìm thấy yêu cầu nào trong mục này.</div>
        )}
      </div>
    </main>
  );
}

function StatusBadge({ status }: { status: string }) {
  const badgeMap: any = {
    pending: ["CHỜ DUYỆT", "bg-amber-100 text-amber-700"],
    approved: ["ĐÃ DUYỆT", "bg-emerald-100 text-emerald-700"],
    rejected: ["TỪ CHỐI", "bg-rose-100 text-rose-700"]
  };
  const [label, style] = badgeMap[status] || ["N/A", "bg-gray-100"];
  return <span className={`px-3 py-1 rounded-lg text-[10px] font-black ${style}`}>{label}</span>;
}