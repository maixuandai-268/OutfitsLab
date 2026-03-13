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
      <div className="min-h-screen flex items-center justify-center">
        <p>Không tìm thấy Shop ID hợp lệ. Vui lòng quay lại trang danh sách.</p>
        <Link href="" className="ml-4 text-blue-500 underline">Quay lại</Link>
      </div>
    )
  }
  const filteredShopProducts = PRODUCTS.filter((product) => product.shop_id === shopId)

  return (
    <div className=" text-lg font-sans">
      <ShopInfo shop={shop} />
      <div className="max-w-310 mx-auto mt-15 pb-35">
        <AboutShop shop={shop} />
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
               <h2 className="text-4xl font-bold text-black">Sản phẩm tiêu biểu</h2>
               <p className="text-gray-500 mt-4">{filteredShopProducts.length} sản phẩm có sẵn</p>
            </div>
            <div className="flex gap-4">
            <button className="cursor-pointer flex items-center justify-center text-xl gap-2 px-6 py-2 rounded-full border-3 bg-white border-[#d19f42] text-[#d19f42] font-semibold hover:bg-[#fff9f0]">
               <ShareIcon className="w-6 h-6 text-black" />
               Xem tất cả
            </button>
            <button className="cursor-pointer flex items-center justify-center text-xl gap-2 px-6 py-2 rounded-full border-3 bg-white border-[#d19f42] text-[#d19f42] font-semibold hover:bg-[#fff9f0]">
               <ShareIcon className="w-6 h-6 text-black" />
               Chia sẻ
            </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShopProducts.slice(0, 6).map((product) => (
              <ShopProductCard key={product.id} product={product} shop={shop} />
            ))}
          </div>
          
          {/* Empty State */}
          {filteredShopProducts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500">Shop này chưa đăng bán sản phẩm nào.</p>
            </div>
          )}
        </div>

      </div>
      
      <div className="flex flex-col justify-center items-center border-y-2 border-[#ffe9cc] bg-[#fff6ea] p-15">
          <h2 className="text-3xl font-bold mb-5">Có Thắc Mắc ?</h2>
          <p className="text-gray-500 mb-7">Liên lạc trực tiếp với {shop.shop_name} để đặt hàng hoặc hỏi đáp theo yêu cầu.</p>
          <div className="flex gap-15">
            <button className="cursor-pointer flex items-center justify-center bg-[#d19f42] gap-2 w-50 py-4 rounded-full border-3 border-[#d19f42] text-white font-semibold hover:bg-[#c28e2d]">
              Send Message
            </button>
            <button className="cursor-pointer flex items-center justify-center bg-white gap-2 w-50 py-4 rounded-full border-3 border-[#d19f42] text-[#d19f42] font-semibold hover:bg-[#fff9f0]">
              View Store Policies
            </button>
          </div>
      </div>
      
    </div>
  )
}

function ShareIcon({ className }: { className?: string }) {
   return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className || "w-6 h-6"}>
         <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
      </svg>
   )
}