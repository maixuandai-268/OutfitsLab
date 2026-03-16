'use client'

import Image from 'next/image'
import { RightOutlined, LeftOutlined } from '@ant-design/icons'
import { useRef, useMemo } from 'react'

type Item = { id: string; title: string; price: number }

const ITEMS: ReadonlyArray<Item> = [
  { id: '1', title: 'Cotton Pajamas',     price: 26 },
  { id: '2', title: 'Green Cotton Shirt',  price: 28 },
  { id: '3', title: 'Muslin Set',          price: 32 },
  { id: '4', title: 'Printed Shorts',      price: 18 },
  { id: '5', title: 'Relax Tee',           price: 20 },
]

function svgPlaceholder(w: number, h: number, text = 'No image') {
  const svg = `
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop stop-color="#f5f5f5" offset="0%"/>
          <stop stop-color="#eaeaea" offset="100%"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
        font-family="system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
        font-size="14" fill="#9ca3af">${text}</text>
    </svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export default function OutfitCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const ph240x120 = useMemo(() => svgPlaceholder(240, 120, 'Placeholder'), [])

  const scrollBy = (delta: number) => {
    scrollerRef.current?.scrollBy({ left: delta, behavior: 'smooth' })
  }

  return (
    <section className="relative rounded-xl bg-white p-4 shadow mt-20">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-black">Recommended Outfit Combinations</h3>
        <div className="hidden gap-2 md:flex">
          <button
            onClick={() => scrollBy(-280)}
            className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-2 py-1 text-gray-700 hover:bg-gray-50"
            aria-label="Scroll left"
          >
            <LeftOutlined />
          </button>
          <button
            onClick={() => scrollBy(280)}
            className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-2 py-1 text-gray-700 hover:bg-gray-50"
            aria-label="Scroll right"
          >
            <RightOutlined />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>

        {ITEMS.map((i) => (
          <article key={i.id} className="min-w-[200px] max-w-[250px] rounded-lg border bg-white p-3 shadow-sm">
            <div className="mb-2 h-28 w-full overflow-hidden rounded-md bg-gray-100">
              <Image
                src={ph240x120}
                alt={i.title}
                width={240}
                height={120}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="truncate text-sm">{i.title}</div>
            <div className="text-sm font-semibold">${i.price}</div>
          </article>
        ))}
      </div>
    </section>
  )
}