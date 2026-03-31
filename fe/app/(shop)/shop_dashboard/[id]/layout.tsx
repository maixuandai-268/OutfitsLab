'use client'

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ShopHeader from '@/components/shop/dashboard/ShopDasHeader';
import ShopNav from '@/components/shop/dashboard/ShopDasNav';
import { useAuth } from "@/context/AuthContext"; // Import useAuth để lấy thông tin user
import { Spin } from 'antd';
import Navbar from "@/components/main/navbar";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const { token, user } = useAuth(); // Lấy cả token và user từ context
  const [shop, setShop] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const shopId = params.id;

  useEffect(() => {
    const fetchShopDetail = async () => {
      if (!shopId || !token) return;

      try {
        const res = await fetch(`https://outfitslab.onrender.com/api/shops/${shopId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.ok) {
          const data = await res.json();
          setShop(data);
        }
      } catch (error) {
        console.error("Lỗi tải thông tin shop:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShopDetail();
  }, [shopId, token]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spin size="large" description="Đang tải dữ liệu cửa hàng..." />
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="p-20 text-center font-bold text-red-500">
        Không tìm thấy cửa hàng này hoặc bạn không có quyền truy cập!
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <ShopHeader shop={shop} owner={user} />

      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
        <ShopNav shopId={Number(shopId)} />
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full py-10 px-4">
        {children}
      </main>
    </div>
  );
}