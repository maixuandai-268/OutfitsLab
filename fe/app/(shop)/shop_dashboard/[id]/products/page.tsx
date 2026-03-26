'use client'

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Button, Spin, Empty, message } from "antd";
import { useAuth } from "@/context/AuthContext";
import { ShopProductCard } from '@/components/shop/profile/showProduct';

const API_BASE = 'http://localhost:3000/api';

export default function ProductsPage() {
  const router = useRouter(); 
  const params = useParams();
  const { token } = useAuth();
  
  const [products, setProducts] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  const [tuKhoa, setTuKhoa] = useState("");

  const shopId = params?.id;

  useEffect(() => {
    const layDanhSachSanPham = async () => {
      if (!shopId) return;
      
      setLoading(true);
      try {
        // Gọi API với query string đúng chuẩn: ?shop_id=...
        const res = await fetch(`http://localhost:3000/api/products?shop_id=${shopId}`, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Cache-Control': 'no-cache'
          }
        });
        
        if (res.ok) {
          const result = await res.json();
          // Backend trả về object { data: [], total: ... }
          if (result && Array.isArray(result.data)) {
            setProducts(result.data); 
          }
        } else {
          message.error("Không thể tải danh sách sản phẩm thực tế.");
        }
      } catch (error) {
        message.error("Lỗi kết nối đến máy chủ Backend.");
      } finally {
        setLoading(false);
      }
    };

    layDanhSachSanPham();
  }, [shopId, token]);

  const sanPhamDaLoc = products.filter((sp: any) => 
    sp?.name?.toLowerCase().includes(tuKhoa.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Quản lý sản phẩm</h2>
          <p className="text-gray-500 text-sm">Danh sách mặt hàng thực tế từ hệ thống</p>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          size="large"
          className="bg-yellow-700 hover:bg-yellow-600 border-none px-6"
          onClick={() => router.push(`/product_add?shopId=${shopId}`)}
        >
          Thêm sản phẩm mới
        </Button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
        <Input
          prefix={<SearchOutlined className="text-gray-400" />}
          placeholder="Tìm kiếm sản phẩm theo tên..."
          className="max-w-md h-10"
          onChange={(e) => setTuKhoa(e.target.value)}
        />
        <span className="text-gray-400 text-sm italic">
          Đang hiển thị {sanPhamDaLoc.length} sản phẩm
        </span>
      </div>

      {loading ? (
        <div className="text-center py-20"><Spin size="large" tip="Đang lấy dữ liệu từ Database..." /></div>
      ) : sanPhamDaLoc.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sanPhamDaLoc.map((sp: any) => (
            <ShopProductCard 
              key={sp.id} 
              product={sp} 
              shop={{ id: Number(shopId) || 0, shop_name: "Cửa hàng của tôi" } as any} 
            />
          ))}
        </div>
      ) : (
        <div className="bg-white py-20 rounded-xl border border-dashed border-gray-300 text-center">
          <Empty description="Không có sản phẩm nào trong Database cho Shop này." />
        </div>
      )}
    </div>
  );
}