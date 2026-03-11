'use client'

import dynamic from 'next/dynamic'
import Sidebar from '@/components/main/product/tryon/Sidebar'
import OutfitCarousel from '@/components/main/product/tryon/OutfitCarousel'
import { ProductCard } from '@/components/product/ProductCard'

const ModelViewer = dynamic(
  () => import('@/components/main/product/tryon/ModelViewer'),
  { ssr: false }
)

export default function TryOnClient() {   
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="max-w-7xl px-4 py-10 w-full">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px] mb-10">
          <section className="flex flex-col gap-7">
            <ModelViewer />            
          </section>
          <div>
            <Sidebar />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">Recommended Outfit Combinations</h2>
        </div>
        <div className="mt-7">
          <hr className="border-t border-dashed border-gray-400 mb-5" />
          <ProductCard count={4} columns={4} />
        </div>
      </div>
    </div>
  )
}