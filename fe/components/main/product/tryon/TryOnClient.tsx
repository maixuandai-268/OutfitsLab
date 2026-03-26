'use client'

import dynamic from 'next/dynamic'
import Sidebar from '@/components/main/product/tryon/Sidebar'
import { ProductCard } from '@/components/product/ProductCard'

const ModelViewer = dynamic(
  () => import('@/components/main/product/tryon/ModelViewer'),
  { ssr: false }
)

export default function TryOnClient() {
  return (
    <div className="flex items-center justify-center min-h-screen px-20 bg-white">
      <div className="px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 mb-10 h-auto lg:h-[800px]">
          <section className="h-[500px] lg:h-full min-h-0">
            <ModelViewer />
          </section>
          <div className="h-[750px] lg:h-full min-h-0">
            <Sidebar />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">Gợi ý kết hợp Trang phục</h2>
        </div>
        <div className="mt-7">
          <hr className="border-t border-dashed border-gray-400 mb-5" />
          <ProductCard count={4} columns={4} />
        </div>
      </div>
    </div>
  )
}