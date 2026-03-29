'use client'

import { HomeOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import Link from "next/link";

interface ShopHeaderProps {
  shop: any;
  owner: any;
}

export default function ShopHeader({ shop, owner }: ShopHeaderProps) {
  if (!shop) return null;

  return (
    <div className="shadow-md bg-white border-b border-[#ffe9cc]">
      <div className="max-w-6xl mx-auto py-4 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">        
          <div>
            <div className="flex items-end gap-7">
              <div className="w-20 h-20 rounded-full shadow-xl overflow-hidden m-auto bg-gray-200">
                <img 
                  src={shop.avatar_url || 'https://via.placeholder.com/150'} 
                  alt={shop.shop_name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <div>
                <h1 className="text-4xl font-bold mb-3">{shop.shop_name}</h1>
                <p className="opacity-90 font-medium mb-3 text-gray-600">
                  Chủ sở hữu: <span className="text-black font-bold">{owner?.display_name || 'Unknown'}</span> • Gia nhập: {shop.created_at}
                </p>
                
                <div className="flex items-center gap-3">                      
                  <div className="flex text-yellow-600 gap-0.5">
                    {[...Array(5)].map((_, i) => 
                      i < Math.floor(shop.rating) 
                        ? <StarFilled key={i} style={{ color: '#facc15', fontSize: 15 }}/> 
                        : <StarOutlined key={i} style={{ color: '#facc15', fontSize: 15 }}/>
                    )}
                  </div>
                  {shop.rating}<span className="text-gray-600">({shop.reviews || 0} đánh giá)</span>
                  {shop.status === 'approved' && (
                    <span className="bg-green-600 backdrop-blur-3xl text-[12px] px-2.5 py-0.5 rounded-full border border-green-300 ml-1 text-white">✓ Shop Được Kiểm Duyệt</span>
                  )}
                  {shop.status === 'pending' && (
                    <span className="bg-yellow-600 backdrop-blur-3xl text-[12px] px-2.5 py-0.5 rounded-full border border-yellow-300 ml-1 text-white">🕒 Đang Chờ Duyệt</span>
                  )}
                  {shop.status === 'rejected' && (
                    <span className="bg-red-600 backdrop-blur-3xl text-[12px] px-2.5 py-0.5 rounded-full border border-red-300 ml-1 text-white">✕ Bị Từ Chối</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Link href={`/shop_profile/${shop.id}`}>
            <button className="px-6 py-3 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-200 hover:scale-105 transition-all active:scale-95 flex items-center gap-2 group border-none">
              <HomeOutlined className="text-lg group-hover:animate-pulse"/> 
              Xem Cửa Hàng
            </button>
          </Link>
        </div>
      </div>    
    </div>
  );
}