'use client';
import { MessageCircleIcon, MapPinIcon, BadgeCheckIcon, UsersIcon, StarIcon } from 'lucide-react';
import { Rate, Tag, Button, Tooltip } from 'antd';
import { FavoriteButton } from '../../product/FavoriteButton';

interface Shop {
  id: number;
  shop_name: string;
  avatar_url: string;
  description: string;
  rating: number;
  reviews: number;
  location: string;
}

interface ShopInfoProps {
  shop: Shop;
}

export const ShopInfo = ({ shop }: ShopInfoProps) => {

  return (
    <div className="relative">
        {/* Banner with Gradient Overlay */}
        <div className="relative h-44 md:h-72 overflow-hidden bg-gray-900">
           <img 
             src="/images/shopBackground.png" 
             alt="ShopBackground" 
             className="w-full h-full object-cover opacity-60 scale-105" 
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        {/* Shop Content Section */}
        <div className="max-w-310 mx-auto px-6 -mt-16 md:-mt-24 relative z-10 pb-10">
          <div className="flex flex-col lg:flex-row items-end gap-x-10 gap-y-6">
            
            {/* Avatar Container with Glassmorphism Border */}
            <div className="relative group">
              <div className="w-36 h-36 md:w-48 md:h-48 rounded-[3rem] p-1.5 bg-gradient-to-br from-pink-400 to-amber-300 shadow-2xl">
                <div className="w-full h-full rounded-[2.8rem] border-4 border-white overflow-hidden bg-white shadow-inner">
                  <img 
                    src={shop.avatar_url} 
                    alt={shop.shop_name} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" 
                  />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-2xl shadow-lg border border-gray-100">
                <BadgeCheckIcon className="w-6 h-6 text-pink-500 fill-pink-50" />
              </div>
            </div>

            {/* Shop Info Main Details */}
            <div className="flex-1 text-white lg:pb-4">
              <div className="flex flex-col items-start gap-1">
                  <div className="flex items-center gap-3">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight drop-shadow-md">{shop.shop_name}</h1>
                    <Tag color="gold" className="font-bold border-none shadow-sm px-3 rounded-md">PRO SELLER</Tag>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-gray-100 font-medium text-sm md:text-base mt-2">
                    <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                      <Rate disabled allowHalf value={Number(shop.rating) || 0} className="text-amber-400 text-xs scale-90" />
                      <span className="font-bold">{(Number(shop.rating) || 0).toFixed(1)}</span>
                      <span className="text-white/60 font-normal">({shop.reviews || 0} Nhận xét)</span>
                    </div>

                    <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                      <UsersIcon className="w-4 h-4 text-pink-400" />
                      <span>5,420 Followers</span>
                    </div>

                    <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                      <MapPinIcon className="w-4 h-4 text-amber-400" />
                      <span>{shop.location || 'Chưa cập nhật'}</span>
                    </div>
                  </div>

                  <p className="mt-6 text-gray-800 lg:text-gray-500 text-sm md:text-base text-justify max-w-2xl font-medium leading-relaxed bg-white/50 lg:bg-transparent p-4 lg:p-0 rounded-2xl backdrop-blur-md lg:backdrop-blur-none border lg:border-none border-white/20">
                    {shop.description || 'Xưởng may thời trang chuyên cung cấp các mẫu thiết kế độc bản, phong cách tối giản và bền vững cho cộng đồng yêu cái đẹp.'}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                      <Tag className="bg-white/10 text-gray-800 lg:text-white border-white/20 px-4 py-1 rounded-full font-bold">#Minimalist</Tag>
                      <Tag className="bg-white/10 text-gray-800 lg:text-white border-white/20 px-4 py-1 rounded-full font-bold">#Sustainable</Tag>
                      <Tag className="bg-white/10 text-gray-800 lg:text-white border-white/20 px-4 py-1 rounded-full font-bold">#CustomMade</Tag>
                  </div>
              </div>
            </div>

            {/* Action Buttons with Modern Styling */}
            <div className="flex flex-col gap-4 w-full md:w-auto lg:pb-4">
              <div className="flex gap-4 items-center">
                <div className="flex-1 lg:w-56 h-14">
                  <FavoriteButton 
                    targetId={shop.id} 
                    type="shop"
                    className="!w-full !h-full border-2 border-white/20 lg:border-gray-200 !bg-white rounded-2xl flex items-center justify-center gap-2 [&_svg]:!w-6 [&_svg]:!h-6 !text-lg font-black transition-all hover:scale-105 active:scale-95 shadow-lg active:shadow-md" 
                  />
                </div>

                <Tooltip title="Nhắn tin cho shop">
                  <button className="cursor-pointer h-14 px-6 md:px-8 bg-pink-500 rounded-2xl border-none text-white shadow-lg shadow-pink-200 hover:bg-pink-600 hover:scale-105 active:scale-95 transition-all flex items-center justify-center">
                    <MessageCircleIcon className="w-6 h-6 fill-white/20" />
                    <span className="ml-2 font-black text-lg hidden md:inline">LIÊN LẠC</span>
                  </button>
                </Tooltip>
              </div>
            </div>

          </div>
        </div>
      </div>
  );
};
