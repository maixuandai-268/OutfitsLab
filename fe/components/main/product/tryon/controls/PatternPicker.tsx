'use client'
import type { ReactNode } from 'react'
import { useCustomizer, Pattern } from '@/store/useCustomizer'
import {
  BorderOutlined,
  BorderHorizontalOutlined,
  DotChartOutlined,
  AppstoreOutlined,
} from '@ant-design/icons'

const OPTIONS: ReadonlyArray<{ key: Pattern; label: string; icon: ReactNode }> = [
  { key: 'none',    label: 'None',       icon: <BorderOutlined /> },
  { key: 'stripes', label: 'Stripes',    icon: <BorderHorizontalOutlined /> },
  { key: 'polka',   label: 'Polka Dots', icon: <DotChartOutlined /> },
  { key: 'plaid',   label: 'Plaid',      icon: <AppstoreOutlined /> },
]

export function PatternPicker({ target }: { target: 'top' | 'bottom' | 'hat' | 'shoes' }) {
  const value = useCustomizer((s) => s.patterns[target])
  const setPattern = useCustomizer((s) => s.setPattern)

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium inline-flex items-center gap-2">
        <AppstoreOutlined className="text-gray-500" />
        <span>Pattern ({target})</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {OPTIONS.map((o) => (
          <button
            key={o.key}
            onClick={() => setPattern(target, o.key)}
            className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm ${
              value === o.key
                ? 'border-orange-400 bg-orange-50 text-ink'
                : 'border-gray-200 bg-white text-gray-700'
            }`}
            title={o.label}
          >
            {o.icon}
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}