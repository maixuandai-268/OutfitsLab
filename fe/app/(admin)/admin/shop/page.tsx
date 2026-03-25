"use client";
import { useEffect, useState } from "react";
import { notification } from "antd";
import { CheckOutlined, CloseOutlined, EyeOutlined } from "@ant-design/icons";

export default function AdminSellersPage() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Lấy danh sách shop đang chờ duyệt bằng fetch
  const fetchSellers = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/shops/pending");
      if (!response.ok) throw new Error("Lỗi mạng");
      const data = await response.json();
      setSellers(data);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSellers(); }, []);

  // 2. Hàm xử lý duyệt bằng fetch (Dùng PATCH)
  const handleApprove = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/api/shops/${id}/approve`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // Nếu bạn có token thì thêm dòng dưới:
          // "Authorization": `Bearer ${localStorage.getItem('access_token')}`
        },
      });

      if (response.ok) {
        notification.success({ 
          title: "Thành công", 
          description: "Đã duyệt người bán và nâng cấp quyền!" 
        });
        fetchSellers(); // Load lại danh sách sau khi duyệt
      } else {
        throw new Error("Duyệt thất bại");
      }
    } catch (error) {
      notification.error({ title: "Lỗi", description: "Không thể phê duyệt." });
    }
  };

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-2xl font-bold text-gray-900">
        Duyệt người bán ({sellers.length})
      </h1>

      <div className="space-y-5">
        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : (
          sellers.map((s: any) => (
            <div key={s.id} className="rounded-2xl border bg-white p-6 shadow-sm border-gray-200">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{s.shop_name}</h3>
                  <p className="text-sm text-gray-500">Owner ID: {s.ownerId}</p>
                  <p className="text-sm text-gray-400">{s.contact_email}</p>
                </div>
                <span className="h-fit px-3 py-1 text-xs rounded-full bg-amber-100 text-amber-700 font-medium">
                  Chờ xét duyệt
                </span>
              </div>

              <div className="mt-5 flex gap-3">
                <button 
                  onClick={() => handleApprove(s.id)}
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white flex items-center gap-2 hover:bg-emerald-700 transition-all"
                >
                  <CheckOutlined /> Phê duyệt
                </button>
                <button className="px-5 py-2 rounded-xl bg-rose-600 text-white flex items-center gap-2 hover:bg-rose-700">
                  <CloseOutlined /> Từ chối
                </button>
              </div>
            </div>
          ))
        )}
        {!loading && sellers.length === 0 && (
          <p className="text-gray-500 italic">Hiện không có đơn đăng ký nào.</p>
        )}
      </div>
    </div>
  );
}