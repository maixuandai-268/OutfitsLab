'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { SHOPS, PRODUCTS } from '../../../(shop)/shopData'
import { ProductDetail } from '@/components/product/ProductDetail';
import ReviewSection from '@/components/product/ProductReview';
import { ProductCard } from '@/components/product/ProductCard';


export default function ProductDetailPage() {

  const params = useParams();
  const productId = Number(params.id);
  const product = PRODUCTS.find((p) => p.id === productId)
  if (!productId || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Không tìm thấy Sản phẩm ID hợp lệ. Vui lòng quay lại trang danh sách.</p>
        <Link href="" className="ml-4 text-blue-500 underline">Quay lại</Link>
      </div>
    )
  }

  return (
    <div className="pt-8">
        <div className="max-w-310 mx-auto mt-9 p-11">
          <div className='mb-15'><ProductDetail product={product} /></div>
          <ReviewSection />
        </div>

        <section className="">
          <h2 className="text-3xl font-bold p-6 mb-2">Same Categories</h2>
          <div className="px-4 sm:px-6 lg:px-8">
            <ProductCard count={8}/>
          </div>
        </section>
    </div>
  )
}