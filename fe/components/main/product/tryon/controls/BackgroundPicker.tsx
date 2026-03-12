'use client'
import { useCustomizer, BackgroundPreset } from '@/store/useCustomizer'
import { BgColorsOutlined } from '@ant-design/icons'

const PRESETS: ReadonlyArray<{ key: BackgroundPreset; label: string }> = [
  { key: 'neutral',      label: 'Neutral' },
  { key: 'studio',       label: 'Studio' },
  { key: 'shadow',       label: 'Shadow' },
  { key: 'gradientWarm', label: 'Gradient warm' },
  { key: 'gradientCool', label: 'Gradient cool' },
]

export default function BackgroundPicker() {
  const value = useCustomizer((s) => s.background)
  const set = useCustomizer((s) => s.setBackground)
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.key}
            onClick={() => set(p.key)}
            className={`rounded-md border px-3 py-2 text-sm ${value === p.key ? 'border-orange-400 bg-orange-50' : 'border-gray-200 bg-white text-gray-700'}`}
            title={p.label}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  )
}
