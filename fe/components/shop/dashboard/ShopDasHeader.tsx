'use client'

import { HomeOutlined, StarFilled, StarOutlined } from "@ant-design/icons";

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
                  {shop.rating}<span className="text-gray-600">({shop.reviews} đánh giá)</span>
                  <span className="bg-[#e0b565] backdrop-blur-3xl text-[12px] px-2.5 py-0.5 rounded-full border border-gray-300 ml-1 text-white">✓ Shop Được Kiểm Duyệt</span>
                </div>
              </div>
            </div>
          </div>

          <button className="text-white bg-[#d19f42] px-5 py-2.5 rounded-xl font-bold flex items-center hover:bg-orange-50 hover:text-[#d19f42] border border-[#d19f42] transition-colors">
            <HomeOutlined className="pr-2"/> Xem Cửa Hàng
          </button>
        </div>
      </div>    
    </div>
  );
}