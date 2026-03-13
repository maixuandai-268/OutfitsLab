'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { SHOPS, PRODUCTS } from '../../shopData' 
import { ShopProductCard } from '@/components/shop/profile/showProduct';
import { ShopInfo } from '@/components/shop/profile/shopInfo';
import { AboutShop } from '@/components/shop/profile/aboutShop';

export default function ShopProfilePage() {

  const params = useParams();
  const shopId = Number(params.id);
  const shop = SHOPS.find((s) => s.id === shopId)

  if (!shopId || !shop) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-800">
        <p>Không tìm thấy Shop ID hợp lệ. Vui lòng quay lại trang danh sách.</p>
        <Link href="" className="ml-4 font-semibold underline hover:text-gray-500 transition-colors">
          Quay lại
        </Link>
      </div>
    )
  }

  const filteredShopProducts = PRODUCTS.filter((product) => product.shop_id === shopId)

  return (
    <div className=" text-lg font-sans">
      <ShopInfo shop={shop} />
      <div className="max-w-310 mx-auto pb-35">
        <AboutShop shop={shop} />
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
               <h2 className="text-3xl font-bold tracking-tight text-black">Sản phẩm tiêu biểu</h2>
               <p className="text-gray-500 mt-2 text-base">{filteredShopProducts.length} sản phẩm có sẵn</p>
            </div>
            <div className="flex gap-3">
              <button className="cursor-pointer flex items-center justify-center text-base gap-2 px-6 py-2.5 rounded-full border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all">
                 Xem tất cả
              </button>
              <button className="cursor-pointer flex items-center justify-center text-base gap-2 px-6 py-2.5 rounded-full border border-black bg-black text-white font-medium hover:bg-[#3b3b3b] transition-all">
                 <ShareIcon className="w-5 h-5" />
                 Chia sẻ
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredShopProducts.slice(0, 6).map((product) => (
              <ShopProductCard key={product.id} product={product} shop={shop} />
            ))}
          </div>
          
          {/* Empty State */}
          {filteredShopProducts.length === 0 && (
            <div className="text-center py-24 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-gray-500">Shop này chưa đăng bán sản phẩm nào.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Contact Section */}
      <div className="flex flex-col justify-center items-center border-t border-gray-200 bg-gray-50 py-20 px-4">
          <h2 className="text-3xl font-bold mb-4 tracking-tight text-black">Có Thắc Mắc?</h2>
          <p className="text-gray-500 mb-8 text-center max-w-lg">
            Liên lạc trực tiếp với <span className="font-medium text-black">{shop.shop_name}</span> để đặt hàng hoặc hỏi đáp theo yêu cầu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
            <button className="cursor-pointer flex-1 flex items-center justify-center bg-black py-3.5 rounded-full border border-black text-white font-medium hover:bg-black transition-all shadow-sm">
              Gửi tin nhắn
            </button>
            <button className="cursor-pointer flex-1 flex items-center justify-center bg-white py-3.5 rounded-full border border-gray-300 text-gray-800 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm">
              Chính sách cửa hàng
            </button>
          </div>
      </div>
      
    </div>
  )
}

function ShareIcon({ className }: { className?: string }) {
   return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
         <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
      </svg>
   )
}