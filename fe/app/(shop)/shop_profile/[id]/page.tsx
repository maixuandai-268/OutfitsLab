'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ShopProductCard } from '@/components/shop/profile/showProduct';
import { ShopInfo } from '@/components/shop/profile/shopInfo';
import { AboutShop } from '@/components/shop/profile/aboutShop';
import { 
  ArrowRightOutlined, 
  ShareAltOutlined, 
  ShoppingOutlined,
  SmileOutlined
} from '@ant-design/icons';
import { Button, Tooltip, Empty, Spin } from 'antd';

const API_BASE = 'http://localhost:3000/api';

interface Shop {
  id: number;
  shop_name: string;
  avatar_url: string;
  description: string;
  location: string;
  rating: number;
  reviews: number;
  created_at: string;
}

interface Product {
  id: number;
  name: string;
  image?: string;
  price: number;
  salesCount: number;
  averageRating?: number;
}

export default function ShopProfilePage() {
  const params = useParams();
  const shopId = Number(params.id);

  const [shop, setShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const trackedRef = useRef(false); // 🔥 Chống đếm đúp trong StrictMode

  useEffect(() => {
    if (!shopId) return;

    const fetchShopData = async () => {
      try {
        setLoading(true);
        // Lấy thông tin shop
        const shopRes = await fetch(`${API_BASE}/shops/${shopId}`);
        if (!shopRes.ok) throw new Error('Thất bại khi lấy thông tin shop');
        const shopData = await shopRes.json();
        setShop(shopData);

        // Lấy sản phẩm của shop
        const productsRes = await fetch(`${API_BASE}/products?shopId=${shopId}`);
        if (productsRes.ok) {
          const pData = await productsRes.json();
          setProducts(pData.data || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShopData();

    // 🔥 Ghi nhận 1 lượt xem profile (Giao điểm đảm bảo chỉ chạy 1 lần)
    if (!trackedRef.current) {
      fetch(`${API_BASE}/shops/${shopId}/track-view`, { method: 'POST' }).catch(() => {});
      trackedRef.current = true;
    }
  }, [shopId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-20">
        <div className="flex flex-col items-center gap-6">
          <Spin size="large" />
          <p className="text-gray-400 font-black uppercase tracking-widest text-xs">ĐANG TẢI VŨ TRỤ THỜI TRANG...</p>
        </div>
      </div>
    )
  }

  if (!shop) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-20 bg-gray-50">
        <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100 flex flex-col items-center text-center max-w-lg">
           <Empty description={false} />
           <h2 className="text-3xl font-black text-gray-900 mt-8 mb-4">CỬA HÀNG KHÔNG TỒN TẠI</h2>
           <p className="text-gray-500 mb-8 font-medium italic">Có vẻ như địa chỉ này đã bị thay đổi hoặc cửa hàng không còn hoạt động.</p>
           <Link href="/">
             <Button type="primary" size="large" className="rounded-full px-10 h-14 font-black">QUAY LẠI TRANG CHỦ</Button>
           </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Header Section */}
      <ShopInfo shop={shop as any} />

      <div className="max-w-310 mx-auto px-6">
        {/* About & Stats Section */}
        <AboutShop shop={shop as any} />

        {/* Featured Products Section */}
        <div className="py-10 border-t border-gray-50">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-6">
            <div className="relative">
               <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-1.5 bg-amber-400 rounded-full" />
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight">SẢN PHẨM TIÊU BIỂU</h2>
               </div>
               <div className="px-5 py-2.5 bg-gray-50 rounded-2xl border border-gray-100 inline-flex items-center gap-2">
                  <ShoppingOutlined className="text-amber-500" />
                  <span className="text-gray-600 font-bold uppercase tracking-widest text-xs">
                    {products.length} Mẫu thiết kế có sẵn
                  </span>
               </div>
            </div>

            <div className="flex gap-4 w-full md:w-auto">
              <Link href="#" className="flex-1 md:flex-none">
                <Button 
                  icon={<ArrowRightOutlined />} 
                  className="w-full md:w-auto h-12 rounded-2xl border-2 border-gray-100 font-black text-xs uppercase tracking-widest hover:border-pink-500 hover:text-pink-500"
                >
                   XEM TẤT CẢ
                </Button>
              </Link>
              
              <Tooltip title="Chia sẻ cửa hàng này">
                <Button 
                   shape="circle" 
                   icon={<ShareAltOutlined />} 
                   className="h-12 w-12 border-2 border-gray-100 hover:border-amber-400 hover:text-amber-400"
                />
              </Tooltip>
            </div>
          </div>

          {/* Product Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <div key={product.id} className="hover:-translate-y-2 transition-transform duration-300">
                  <ShopProductCard product={product as any} shop={shop as any} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 bg-gradient-to-br from-gray-50 to-white rounded-[3rem] border border-dashed border-gray-200 flex flex-col items-center justify-center text-center p-10">
               <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mb-6">
                  <SmileOutlined className="text-4xl text-gray-300" />
               </div>
               <h3 className="text-xl font-black text-gray-800 uppercase tracking-widest mb-2">Đang thiết kế bộ sưu tập mới</h3>
               <p className="text-gray-400 max-w-sm italic font-medium">Cửa hàng này đang trong quá trình chuẩn bị những mẫu thiết kế độc đáo nhất. Vui lòng quay lại sau nhé!</p>
            </div>
          )}
        </div>

        {/* Contact CTA Section */}
        <div className="mt-20 p-1 md:p-1.5 rounded-[4rem] bg-gradient-to-r from-pink-500 via-amber-400 to-sky-500 shadow-2xl">
           <div className="bg-white rounded-[3.8rem] py-16 px-10 md:px-20 flex flex-col items-center text-center overflow-hidden relative group">
              {/* Subtle Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -mr-32 -mt-32 transition-transform group-hover:scale-110" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -ml-32 -mb-32 transition-transform group-hover:scale-110" />

              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-gray-900 drop-shadow-sm">CÓ THẮC MẮC?</h2>
              <p className="text-gray-500 mb-10 text-lg max-w-2xl font-medium leading-relaxed italic border-x-2 border-gray-100 px-8">
                Liên lạc trực tiếp với <span className="font-black text-gray-900 underline decoration-pink-500/30 decoration-4 not-italic">{shop.shop_name}</span> để đặt hàng riêng hoặc thảo luận về những ý tưởng thời trang độc bản của bạn.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 w-full justify-center max-w-xl">
                <Button 
                   type="primary" 
                   size="large" 
                   className="flex-1 h-14 md:h-16 rounded-3xl font-black text-lg bg-black hover:bg-gray-800 shadow-xl shadow-gray-200"
                >
                   GỬI TIN NHẮN NGAY
                </Button>
                <Button 
                   size="large" 
                   className="flex-1 h-14 md:h-16 rounded-3xl font-black text-lg border-2 border-gray-200 hover:border-pink-500 hover:text-pink-500 transition-all"
                >
                   CHÍNH SÁCH CỦA SHOP
                </Button>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}