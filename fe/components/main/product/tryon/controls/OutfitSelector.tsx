'use client'

import { useCustomizer, GarmentSlot } from '@/store/useCustomizer'
import { GARMENTS } from '@/lib/assetsCatalog'

export function OutfitSelector() {
  const { activeGarments, setGarment } = useCustomizer()

  const renderSlot = (slot: GarmentSlot) => {
    const entries = Object.entries(GARMENTS[slot]) as [string, string][]
    return (
      <div className="space-y-1" key={slot}>
        <div className="text-sm font-medium capitalize">{slot}</div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setGarment(slot, null)}
            className={`rounded-md border px-3 py-1 text-xs ${!activeGarments[slot] ? 'border-orange-400 bg-orange-50' : 'border-gray-200 bg-white'}`}
          >
            None
          </button>
          {entries.map(([key, url]) => (
            <button
              key={key}
              onClick={() => setGarment(slot, url)}
              className={`rounded-md border px-3 py-1 text-xs ${activeGarments[slot] === url ? 'border-orange-400 bg-orange-50' : 'border-gray-200 bg-white'}`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>
    )
  }

  const slots: GarmentSlot[] = ['top', 'bottom', 'shoes', 'hat']
  return (
    <div className="space-y-3">
      {slots.map(renderSlot)}
    </div>
  )
}