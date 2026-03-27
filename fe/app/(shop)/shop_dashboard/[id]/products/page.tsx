'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { 
  PlusOutlined, 
  SearchOutlined, 
} from "@ant-design/icons";
import { 
  Input, 
  Button, 
  Spin, 
  Empty, 
  message, 
} from "antd";
import { useAuth } from "@/context/AuthContext";
import { ShopProductCard } from '@/components/shop/profile/showProduct';
import AddProductModal from '@/components/shop/dashboard/AddProductModal';

export default function ProductsPage() {
  const params = useParams();
  const { token } = useAuth();
  
  // Lấy ID từ URL (ví dụ: /shop_dashboard/15/products -> shopIdUrl = 15)
  const shopIdUrl = params?.id;

  // --- States danh sách sản phẩm ---
  const [products, setProducts] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  const [tuKhoa, setTuKhoa] = useState("");

  // --- States Modal Thêm sản phẩm ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // --- Logic Fetch dữ liệu ---
  const layDanhSachSanPham = useCallback(async () => {
    if (!shopIdUrl) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/products?shop_id=${shopIdUrl}`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache'
        }
      });
      if (res.ok) {
        const result = await res.json();
        const data = result.data || result;
        setProducts(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      message.error("Lỗi kết nối đến máy chủ.");
    } finally {
      setLoading(false);
    }
  }, [shopIdUrl, token]);

  useEffect(() => {
    layDanhSachSanPham();
  }, [layDanhSachSanPham]);

  const sanPhamDaLoc = products.filter((sp: any) => 
    sp?.name?.toLowerCase().includes(tuKhoa.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Quản lý sản phẩm</h2>
          <p className="text-gray-500 text-sm">Hệ thống tự động cập nhật dữ liệu thời gian thực</p>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          size="large"
          className="bg-yellow-700 hover:bg-yellow-600 border-none px-8 rounded-full shadow-md"
          onClick={() => setIsModalOpen(true)}
        >
          Thêm sản phẩm mới
        </Button>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
        <Input
          prefix={<SearchOutlined className="text-gray-400" />}
          placeholder="Tìm nhanh theo tên sản phẩm..."
          className="max-w-md h-10 rounded-lg"
          allowClear
          onChange={(e) => setTuKhoa(e.target.value)}
        />
        <div className="ml-auto flex items-center gap-2">
           <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Trạng thái:</span>
           <span className="text-sm font-bold text-yellow-700 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
             {sanPhamDaLoc.length} Sản phẩm
           </span>
        </div>
      </div>

      {/* PRODUCT GRID */}
      {loading ? (
        <div className="text-center py-20">
          <Spin size="large" tip="Đang đồng bộ dữ liệu..." />
        </div>
      ) : sanPhamDaLoc.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sanPhamDaLoc.map((sp: any) => (
            <ShopProductCard 
              key={sp.id} 
              product={sp} 
              shop={{ id: Number(shopIdUrl) || 0, shop_name: "Cửa hàng của tôi" } as any} 
            />
          ))}
        </div>
      ) : (
        <div className="bg-white py-20 rounded-xl border border-dashed border-gray-300 text-center">
          <Empty description="Chưa có sản phẩm nào. Hãy bắt đầu bằng cách thêm sản phẩm mới!" />
        </div>
      )}

      {/* MODAL THÊM SẢN PHẨM (Đã dùng component chung để đồng bộ Sidebar) */}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        shopId={Number(shopIdUrl) || 0}
        onSuccess={layDanhSachSanPham}
      />
    </div>
  );
}