'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Rate, Modal, Avatar, Divider, Typography } from 'antd'
import { MailOutlined, EnvironmentOutlined } from '@ant-design/icons'
import Navbar from "@/components/main/navbar"

const API_BASE = 'https://outfitslab.onrender.com/api';

interface Shop {
  id: number;
  shop_name: string;
  avatar_url: string;
  description: string;
  location: string;
  rating: number;
  reviewCount?: number;
  productCount?: number;
  specialty?: string;
}

interface Product {
  id: number;
  shopId: number;
}

export default function FeaturedSellersPage() {
  const [activeFilter, setActiveFilter] = useState('All Sellers')
  const [shops, setShops] = useState<Shop[]>([])
  const [loading, setLoading] = useState(true)

  // Tình trạng Modal
  const [isShopModalOpen, setIsShopModalOpen] = useState(false)
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null)

  const categories = [
    "Tất cả cửa hàng", "Tối giản", "Cổ điển",
    "Thường ngày", "Dệt kim", "Mùa hè", "Công sở", "Sang trọng", "Thể thao"
  ]

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const shopsRes = await fetch(`${API_BASE}/shops`);
        if (shopsRes.ok) {
          const sData = await shopsRes.json();
          setShops(sData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="text-lg font-sans">
      <div className="max-w-310 mx-auto mb-7 ">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Tìm cửa hàng..."
            className="w-full h-14 pl-10 rounded-2xl border-2 border-gray-200 bg-white focus:outline-none focus:ring-2 placeholder-gray-400"
          />
        </div>

        <p className="text-base font-bold mb-2">Đặc trưng của cửa hàng:</p>
        <div className="flex flex-wrap items-center gap-3">
          {categories.map((cate) => (
            <button
              key={cate}
              onClick={() => setActiveFilter(cate)}
              className={`px-4 py-3 rounded-full text-xs font-bold transition-all
                ${activeFilter === cate
                  ? 'bg-black text-white shadow-md'
                  : 'bg-gray-200/50 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {cate}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="max-w-310 mx-auto pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {shops.map((shop) => {
              return (
                <Link key={shop.id} href={`/shop_profile/${shop.id}`} className="bg-white rounded-3xl border-3 border-gray-200 hover:shadow-xl overflow-hidden">
                  <div className={`h-24 w-full bg-linear-to-tl from-[#d5e9e9] to-[#f4ebd9]`}></div>

                  <div className="px-6 pb-6 flex flex-col items-center -mt-12 text-center">

                    <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-100">
                      <img src={shop.avatar_url || 'https://via.placeholder.com/150'} alt={shop.shop_name} className="w-full h-full object-cover" />
                    </div>

                    <h3 className="mt-4 text-xl font-bold ">{shop.shop_name}</h3>

                    <div className="flex items-center gap-1 mt-1 text-sm">
                       <span className="font-bold text-amber-500 mr-1">{Number(shop.rating || 0).toFixed(1)}</span>
                       <div className="flex text-[#d19f42]">
                           {/* Dùng Ant Design Rate cho đồng bộ */}
                           <svg className="hidden">
                             {/* Để tránh lỗi kĩ thuật khi chuyển đổi */}
                           </svg>
                           <div className="scale-75 -mx-4">
                              <Rate disabled allowHalf defaultValue={shop.rating || 0} className="text-amber-500" />
                           </div>
                       </div>
                       <span className="text-gray-500 ml-1">({shop.reviewCount || 0} reviews)</span>
                    </div>

                    <span className="mt-3 ml-1 px-3 py-1 bg-black/60 text-white text-[10px] uppercase font-bold rounded-full">
                      {shop.specialty || 'THỜI TRANG'}
                    </span>

                    <p className="mt-4 text-sm text-gray-500 line-clamp-2 px-2 h-10">
                      {shop.description || 'Chưa có mô tả'}
                    </p>

                    <div className="w-full h-px bg-gray-200 my-5"></div>

                    <div className="w-full flex justify-between px-10">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-black">{shop.productCount || 0}</p>
                        <p className="text-xs text-gray-600 font-medium">Sản phẩm</p>
                      </div>
                      <div className="text-center">
                        <div className="flex flex-col items-center justify-center h-full">
                          <MapPinIcon className="w-5 h-5 mb-1" />
                          <p className="text-xs text-gray-600 font-medium">{shop.location || 'Chưa cập nhật'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-px bg-gray-200 my-5"></div>

                    <div className="w-full">
                      <div 
                        className="w-full py-3 rounded-full bg-black text-white font-bold text-sm hover:bg-[#313131] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        Thăm quan cửa hàng
                        <ExternalLinkIcon className="w-4 h-4" />
                      </div>
                    </div>

                  </div>
                </Link>
              )
            })}

          </div>
        </div>
      )}

      {/* FOOTER */}
      <div className="bg-gray-50 py-10 px-4 text-center border-y border-gray-200">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Sẵn sàng để giới thiệu thiết kế của bạn?</h2>
          <p className="text-gray-600 mb-8">
            Tham gia cộng đồng sáng tạo sôi động của chúng tôi và tiếp cận hàng ngàn người yêu thời trang trên toàn thế giới.
          </p>
          <button className="px-8 py-4 bg-black text-white font-bold text-lg rounded-full hover:bg-[#313131]">
            Trở thành người bán
          </button>
        </div>
      </div>

      {/* MODAL THÔNG TIN SHOP */}
      <Modal
        open={isShopModalOpen}
        footer={null}
        onCancel={() => setIsShopModalOpen(false)}
        width={400}
        centered
        className="shop-info-modal"
      >
        {selectedShop && (
          <div className="py-2">
            <div className="flex flex-col items-center text-center mb-6">
              <Avatar 
                size={80} 
                src={selectedShop.avatar_url || 'https://via.placeholder.com/150'} 
                className="shadow-md border-2 border-indigo-500 mb-3"
              />
              <Typography.Title level={4} className="m-0 uppercase tracking-wide">
                {selectedShop.shop_name}
              </Typography.Title>
              <span className="mt-2 ml-1 px-3 py-1 bg-black text-white text-[10px] uppercase font-bold rounded-full">
                {selectedShop.specialty || 'THỜI TRANG'}
              </span>
            </div>
            
            <Divider className="my-4" />
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
                    <MailOutlined />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase font-bold">Email liên hệ</div>
                    <div className="text-sm">{(selectedShop as any).contact_email || "Chưa cập nhật"}</div>
                  </div>
              </div>
              <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                    <EnvironmentOutlined />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase font-bold">Địa chỉ</div>
                    <div className="text-sm">{selectedShop.location || "Chưa cập nhật"}</div>
                  </div>
              </div>
            </div>

            <div className="mt-8 bg-gray-50 p-4 rounded-xl flex justify-between items-center">
                <div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">Đánh giá shop</div>
                  <Rate disabled value={Number(selectedShop.rating) || 5} size="small" />
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-indigo-500">{Number(selectedShop.rating || 5).toFixed(1)}</div>
                  <div className="text-xs text-gray-500">{selectedShop.productCount || 0} sản phẩm</div>
                </div>
            </div>
          </div>
        )}
      </Modal>

    </div>
  )
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={filled ? 0 : 2} className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.545.044.757.74.34 1.146l-4.252 4.145a.563.563 0 00-.154.498l1.31 5.372c.16.654-.535 1.159-1.028.875L12 18.067l-4.708 2.615c-.493.284-1.187-.22-1.028-.875l1.31-5.372a.563.563 0 00-.154-.498L2.736 10.543c-.417-.406-.205-1.102.34-1.146l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  )
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className || "w-4 h-4"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  )
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className || "w-4 h-4"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  )
}