'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ProductDetail } from '@/components/product/ProductDetail';
import ReviewSection from '@/components/product/ProductReview';
import { ProductCard } from '@/components/product/ProductCard';

const API_BASE = 'https://outfitslab.onrender.com/api';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.id);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;

    }

    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_BASE}/products/${productId}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setProduct(data.data || data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <div className="min-h-screen text-center flex items-center justify-center">Loading product...</div>;

  if (!productId || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Không tìm thấy Sản phẩm ID hợp lệ. Vui lòng quay lại trang danh sách.</p>
        <Link href="/" className="ml-4 text-blue-500 underline">Quay lại</Link>
      </div>
    )
  }


  const shop = product.shop;

  const totalShopReviews = shop?.reviewCount !== undefined
    ? Number(shop.reviewCount)
    : (shop?.products || []).reduce((acc: number, p: any) => {
      return acc + (Array.isArray(p.reviews) ? p.reviews.length : 0);
    }, 0);

  const shopAvgRating = shop?.rating !== undefined
    ? Number(shop.rating).toFixed(1)
    : "5.0";

  const shopProductCount = shop?.productCount !== undefined
    ? Number(shop.productCount)
    : (shop?.products || []).length;

  return (
    <div className="bg-gray-50/30 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className='mb-10 pt-10'>
          <ProductDetail product={product} />
        </div>


        <div className="mb-10 bg-white p-6 rounded-sm shadow-sm flex flex-col md:flex-row items-center gap-8 border border-gray-100">

          <div className="flex items-center gap-5 md:border-r border-gray-100 pr-10 min-w-[320px] w-full md:w-auto">
            <div className="relative shrink-0">
              <img
                src={
                  product.shop?.avatar_url?.startsWith('data:image')
                    ? product.shop.avatar_url
                    : product.shop?.avatar_url?.startsWith('http')
                      ? product.shop.avatar_url 
                      : `https://outfitslab.onrender.com${product.shop?.avatar_url || ''}`
                } 
                alt="shop-avatar"
                className="w-20 h-20 rounded-full border border-gray-100 object-cover shadow-sm"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(product.shop?.shop_name || 'S')}&background=F43F5E&color=fff`;
                }}
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 mb-3 truncate">{product.shop?.shop_name || "Tên Gian Hàng"}</h3>
              <div className="flex gap-2">
                <Link
                  href={`/shop_profile/${product.shop_id}`}
                  className="px-5 py-1.5 border border-pink-500 text-pink-500 text-xs hover:bg-pink-50 transition-all rounded-sm font-medium flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0L3.04 5.067A1.125 1.125 0 014.02 4.5h15.96c.6 0 1.092.433 1.18 1.017l1.04 7.025" />
                  </svg>
                  Xem Shop
                </Link>
              </div>
            </div>
          </div>


          <div className="flex-1 grid grid-cols-2 gap-x-20 gap-y-4 text-sm w-full">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 whitespace-nowrap">Đánh Giá</span>
              <span className="text-pink-500 font-bold">{shopAvgRating}</span>
            </div>


            <div className="flex justify-between items-center">
              <span className="text-gray-400 whitespace-nowrap">Tổng lượt đánh giá</span>
              <span className="text-pink-500 font-bold">{totalShopReviews}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400 whitespace-nowrap">Sản Phẩm</span>
              <span className="text-pink-500 font-bold">{shopProductCount}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400 whitespace-nowrap">Thời Gian Phản Hồi</span>
              <span className="text-pink-500 font-bold">trong vài giờ</span>
            </div>
          </div>
        </div>

        <ReviewSection productId={productId} />
      </div>

      <section className="max-w-7xl mx-auto mt-20">
        <h2 className="text-2xl font-bold px-4 mb-6 border-l-4 border-pink-500 ml-4">Sản Phẩm Cùng Danh Mục</h2>
        <div className="px-4">
          <ProductCard count={10} columns={5} />
        </div>
      </section>
    </div>
  )
}