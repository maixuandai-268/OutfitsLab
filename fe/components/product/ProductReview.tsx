'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Star, ThumbsUp, ChevronDown, ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { message, Spin, Rate, Input, Button as AntButton } from 'antd';

const API_BASE = 'https://outfitslab.onrender.com/api/';

interface User {
  id: number;
  display_name: string;
  avatar_url: string;
}

interface Review {
  id: number;
  productId: number;
  userId: number;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    avatarUrl?: string;
    username: string;
    fullName?: string;
  };
}

export default function ReviewSection({ productId }: { productId: number }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('Tất cả đánh giá');
  
  // Form state
  const [submitting, setSubmitting] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  const fetchReviews = useCallback(async () => {
    if (!productId) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/reviews/product/${productId}`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleSubmitReview = async () => {
    if (!user) {
      message.error('Vui lòng đăng nhập để để lại đánh giá!');
      return;
    }
    if (!newComment.trim()) {
      message.warning('Vui lòng nhập nội dung đánh giá!');
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('access_token');
      const res = await fetch(`${API_BASE}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId,
          rating: newRating,
          comment: newComment
        })
      });

      if (res.ok) {
        message.success('Cảm ơn bạn đã đánh giá!');
        setNewComment('');
        setNewRating(5);
        fetchReviews();
      } else {
        message.error('Không thể gửi đánh giá. Vui lòng thử lại.');
      }
    } catch (error) {
      message.error('Lỗi kết nối server.');
    } finally {
      setSubmitting(false);
    }
  };

  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="p-6">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-1/4 flex flex-col gap-8">
          <div className="flex items-center justify-center">  
            {/* Rating */}
            <div className="w-24 h-24 rounded-full border-4 border-yellow-500 flex items-center justify-center mb-4">
              <span className="text-3xl font-bold">{avgRating}</span>
            </div>
            <div className='flex flex-col gap-1 items-center ml-5'>
              <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={20} className={star <= Math.round(Number(avgRating)) ? "text-yellow-500" : "text-gray-300"} fill={star <= Math.round(Number(avgRating)) ? "currentColor" : "none"} />
                  ))}
              </div>
              <p className="text-gray-500 text-sm">Từ {reviews.length} đánh giá</p>
            </div>
          </div>

          {/* New Review Form - Only for logged in users */}
          {user ? (
            <div className="border border-gray-100 rounded-xl p-6 shadow-sm bg-gray-50/50">
              <h3 className="font-semibold text-lg mb-4">Viết đánh giá của bạn</h3>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Mức độ hài lòng:</p>
                <Rate value={newRating} onChange={setNewRating} />
              </div>
              <div className="mb-4">
                <Input.TextArea 
                  rows={4} 
                  placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..." 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="rounded-lg"
                />
              </div>
              <AntButton 
                type="primary" 
                icon={<Send size={16} />} 
                loading={submitting}
                onClick={handleSubmitReview}
                className="w-full bg-black hover:bg-gray-800 border-none h-10 font-bold rounded-lg"
              >
                Gửi đánh giá
              </AntButton>
            </div>
          ) : (
            <div className="border border-dashed border-gray-300 rounded-xl p-6 text-center">
              <p className="text-gray-500 text-sm">Vui lòng đăng nhập để đánh giá sản phẩm này.</p>
            </div>
          )}
        </div>

        {/* CỘT PHẢI */}
        <div className="w-full lg:w-3/4 flex flex-col">
          <h2 className="text-xl font-semibold mb-6 uppercase tracking-tight">Danh sách đánh giá ({reviews.length})</h2>
          
          {loading ? (
            <div className="py-20 text-center"><Spin /></div>
          ) : reviews.length === 0 ? (
            <div className="py-20 text-center border-t border-gray-100 italic text-gray-400">
              Chưa có đánh giá nào cho sản phẩm này.
            </div>
          ) : (
            <div className="flex flex-col">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 py-6 last:border-0">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-50">
                      {review.user?.avatarUrl ? (
                        <img src={review.user.avatarUrl} alt="User" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-gray-400 font-bold uppercase text-xs">
                          {(review.user?.username || 'U').charAt(0)}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{review.user?.fullName || review.user?.username || 'Người dùng ẩn danh'}</p>
                      <div className="flex gap-0.5 mt-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            size={12} 
                            className={star <= review.rating ? "text-yellow-500" : "text-gray-200"} 
                            fill={star <= review.rating ? "currentColor" : "none"} 
                          />
                        ))}
                      </div>
                    </div>
                    <span className="ml-auto text-[10px] text-gray-400 uppercase font-medium">
                      {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
                  
                  <div className="flex items-center gap-4 mt-4">
                    <button className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-widest">
                      <ThumbsUp size={14} />
                      Hữu ích
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Phân Trang (Placeholder for now) */}
          {reviews.length > 5 && (
            <div className="flex items-center justify-center gap-2 mt-12 pt-8 border-t border-gray-50">
               <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-100 text-gray-400 hover:bg-gray-50"><ChevronLeft size={18} /></button>
               <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-black text-white text-sm font-bold shadow-lg shadow-gray-200">1</button>
               <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-100 text-sm font-bold text-gray-600 hover:bg-gray-50"><ChevronRight size={18} /></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}