'use client'
import { useCustomizer, Size } from '@/store/useCustomizer'
const SIZES: ReadonlyArray<Size> = ['XS','S','M','L','XL'] as const

export default function SizePicker() {
  const size = useCustomizer((s) => s.size)
  const set = useCustomizer((s) => s.setSize)
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {SIZES.map((s) => (
          <button
            key={s}
            onClick={() => set(s)}
            className={`rounded-md border px-3 py-1 text-sm ${size === s ? 'border-orange-400 bg-orange-50' : 'border-gray-200 bg-white text-gray-700'}`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}
