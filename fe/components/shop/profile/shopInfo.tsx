import React, { useState } from 'react';
import { HeartIcon, MessageCircleIcon } from 'lucide-react';

interface Shop {
  id: number;
  shop_name: string;
  avatar_url: string;
  description: string;
  rating: number;
}

interface ShopInfoProps {
  shop: Shop;
}

export const ShopInfo = ({ shop }: ShopInfoProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="bg-white border-b-2 border-[#ffe9cc]">
        <img src="/images/shopBackground.png" alt="ShopBackground" className="w-full h-30 md:h-55 object-cover" />
        <div className="max-w-310 mx-auto px-6 py-8 md:py-15">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Avatar */} 
            <div className="flex items-end">
              <div className="w-40 h-40 rounded-2xl border-4 border-gray-100 shadow-xl overflow-hidden">
                <img 
                  src={shop.avatar_url} 
                  alt={shop.shop_name} 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>

            {/* Shop Info */}
            <div className=" w-full">
              <div className="flex flex-col items-start">
                  {/* Shop Name */}
                  <h1 className="text-4xl font-bold mb-2">{shop.shop_name}</h1>
                  
                  {/* Rating & Location */}
                  <div className="flex flex-wrap items-center gap-3 text-gray-500 mb-6">
                    <div className="flex items-center">
                      <div className="flex text-[#d19f42]">                         
                      {[...Array(5)].map((_, star) => (
                        <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={(star < Math.floor(shop.rating)) ? "currentColor" : "none"} stroke="currentColor" strokeWidth={(star < Math.floor(shop.rating)) ? 0 : 2} className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.545.044.757.74.34 1.146l-4.252 4.145a.563.563 0 00-.154.498l1.31 5.372c.16.654-.535 1.159-1.028.875L12 18.067l-4.708 2.615c-.493.284-1.187-.22-1.028-.875l1.31-5.372a.563.563 0 00-.154-.498L2.736 10.543c-.417-.406-.205-1.102.34-1.146l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg> 
                      ))}
                      </div>
                      <span className="ml-1">{shop.rating}</span>
                      <span className="ml-1">({shop.rating} reviews)</span>
                    </div>
                    <span className="hidden md:inline">•</span>
                    <span className="">5,420 followers</span>
                    <span className="hidden md:inline">•</span>
                    <div className="flex items-center">
                      {/* <MapPinIcon /> */}
                      <span>Los Angeles, CA</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-justify mb-5 max-w-2xl">
                    {shop.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                      <span className="px-3 py-1 bg-[#fff4e6] text-[#d19f42] text-sm rounded-full">Minimalist Fashion</span>
                      <span className="px-3 py-1 bg-[#fff4e6] text-[#d19f42] text-sm rounded-full">Sustainable Materials</span>
                      <span className="px-3 py-1 bg-[#fff4e6] text-[#d19f42] text-sm rounded-full">Custom Designs</span>
                  </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-end w-full md:w-auto mt-4 md:mt-0">
              <div className="flex flex-col gap-3 w-full">
                <button className="cursor-pointer flex items-center justify-center text-xl gap-2 px-8 py-2 rounded-full border-3 border-[#d19f42] text-[#d19f42] font-semibold hover:bg-[#fff9f0]">
                  <HeartIcon className="w-6 h-6 text-black" />
                  Favorite
                </button>

                <button className="cursor-pointer flex items-center justify-center text-xl gap-2 px-8 py-2 rounded-full border-3 text-white bg-[#d19f42] font-semibold hover:bg-[#c28e2d]">
                  <MessageCircleIcon className="w-6 h-6 text-white" />
                  Contact
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
  );
};