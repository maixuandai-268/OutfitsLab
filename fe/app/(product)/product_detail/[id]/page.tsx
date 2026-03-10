'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { SHOPS, PRODUCTS } from '../../../(shop)/shopData'
import { ProductDetail } from '@/components/product/ProductDetail';


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
    <div className="text-lg font-sans min-h-screen">
        <div className="max-w-310 mx-auto mt-9 pb-35">
            <ProductDetail product={product} />
        </div>
    </div>
  )
}