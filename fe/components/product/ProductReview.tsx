import React, { useState } from 'react';
import { Star, ThumbsUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCTS, REVIEWS, USERS } from '@/app/(shop)/shopData';

export default function ReviewSection() {
  const [activeFilter, setActiveFilter] = useState('All Reviews');

  return (
    <div className="p-6">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-1/4 flex flex-col gap-8">
          <div className="flex items-center justify-center">  
            {/* Rating */}
            <div className="w-24 h-24 rounded-full border-4 border-yellow-500 flex items-center justify-center mb-4">
              <span className="text-3xl font-bold">{PRODUCTS[0]?.rating || 0}</span>
            </div>
            <div className='flex flex-col gap-1 items-center ml-5'>
              <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={20} className="text-yellow-500" fill="currentColor" />
                  ))}
              </div>
              <p className="text-gray-500 text-sm">Từ {REVIEWS.length} đánh giá</p>
            </div>
            
          </div>

          {/* Filter */}
          <div className="border border-gray-100 rounded-xl p-6 shadow-sm border-dashed">
            <h3 className="font-semibold text-lg mb-6">Lọc đánh giá</h3>           
            <div className="flex items-center justify-between cursor-pointer mb-4">
              <span className="text-sm font-medium text-gray-600">Mức đánh giá</span>
              <ChevronDown size={18} className="text-gray-400" />
            </div>
            <div className="flex flex-col gap-3">
              {[5.0, 4.0, 3.0, 2.0, 1.0].map((rating) => (
                <label key={rating} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300  focus:ring-black accent-black" />
                  <span className="text-sm text-gray-600">{rating.toFixed(1)}</span>
                  <Star size={14} className="text-yellow-500" fill="currentColor" />
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* CỘT PHẢI */}
        <div className="w-full lg:w-3/4 flex flex-col">
          
          {/* Thanh Đánh Giá */}
          <div className="flex flex-col gap-3 mb-10 w-full lg:w-3/4">
            {[5.0, 4.0, 3.0, 2.0, 1.0].map((rating) => (
              <div key={rating} className="flex items-center gap-3">
                <span className="text-sm font-medium w-6">{rating.toFixed(1)}</span>
                <Star size={16} className="text-yellow-500" fill="currentColor" />
                <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-700 rounded-full" style={{ width: '80%' }}></div>
                </div>
                <span className="text-sm text-gray-500 w-10 text-right">2823</span>
              </div>
            ))}
          </div>

          {/* Tiêu đề & Tabs Lọc */}
          <h2 className="text-xl font-semibold mb-4">Danh sách đánh giá</h2>
          <div className="flex flex-wrap gap-3 mb-8">
            {['Tất cả đánh giá', 'Có ảnh & video', 'Chỉ mô tả'].map((filter) => (
               <button 
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2 rounded-lg text-sm transition font-medium border ${
                    activeFilter === filter 
                      ? 'border-black' 
                      : 'border-gray-200 text-gray-600 hover:border-gray-400'
                  }`}
               >
                 {filter}
               </button>
            ))}
          </div>

          {/* Danh Sách Đánh Giá */}
          <div className="flex flex-col">
            {REVIEWS.slice(0, 3).map((review) => {
              const user = USERS.find(u => u.id === review.user_id);
              
              return (
                <div key={review.id}>
                  <div className="flex flex-col py-6">
                    {/* User */}
                    <div className="flex items-center gap-3 mb-2">
                      <img 
                        src={user?.avatar_url || 'https://via.placeholder.com/150'} 
                        alt={user?.display_name || 'User'} 
                        className="w-8 h-8 rounded-full object-cover" 
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {user?.display_name || 'Anonymous'}
                      </span>
                    </div>
                    {/* Content & Date */}
                    <p className="font-medium mb-1">{review.comment}</p>
                    <p className="text-xs text-gray-400 mb-5">{review.date}</p>
                    
                    {/* Stars & Actions */}
                    <div className="flex items-center justify-between">
                      {/* Stars */}
                      <div className="flex items-center gap-1">
                        <p className='text-gray-500 font-semibold text-base'>{review.rating}</p>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                size={16} 
                                className={star <= Math.round(review.rating) ? "text-yellow-500" : "text-gray-300"} 
                                fill={star <= Math.round(review.rating) ? "currentColor" : "none"} 
                              />
                            ))}
                        </div>
                      </div>
                      
                      {/* Like Dislike */}
                      <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full hover:bg-gray-50 transition">
                          <ThumbsUp size={16} className="text-gray-600" />
                          <span className="text-sm font-semibold">128</span> 
                        </button>
                        <button className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 transition">
                          <ThumbsUp size={16} className="text-gray-600 rotate-180" />
                        </button>
                      </div>
                    </div>
                  </div>          
                  <hr className="border-t border-dashed border-gray-400" />
                </div>
              );
            })}
          </div>

          {/* Phân Trang */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <button className="w-10 h-10 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50 text-gray-500">
              <ChevronLeft size={18} />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded border border-gray-200 text-sm font-medium hover:bg-gray-50">1</button>
            <button className="w-10 h-10 flex items-center justify-center rounded border border-black text-sm font-medium">2</button>
            <span className="w-10 h-10 flex items-center justify-center rounded border border-gray-200 text-sm font-medium hover:bg-gray-50">...</span>
            <button className="w-10 h-10 flex items-center justify-center rounded border border-gray-200 text-sm font-medium hover:bg-gray-50">10</button>
            <button className="w-10 h-10 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50 text-gray-500">
              <ChevronRight size={18} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}