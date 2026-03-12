import { create } from 'zustand'

export type Gender = 'female' | 'male'
export type Part = 'skin' | 'top' | 'bottom' | 'shoes'
export type Size = 'XS'|'S'|'M'|'L'|'XL'
export type Pattern = 'none'|'stripes'|'polka'|'plaid'
export type BackgroundPreset = 'neutral'|'studio'|'shadow'|'gradientWarm'|'gradientCool'
export type ModelId = 'avatar_female' | 'avatar_male'
export type GarmentSlot = 'top' | 'bottom' | 'shoes' | 'hat'
type Hex = `#${string}`

interface CustomizerState {
  gender: Gender
  modelId: ModelId
  autoRotate: boolean
  colors: Record<Part, Hex>
  patterns: { top: Pattern; bottom: Pattern }
  background: BackgroundPreset
  size: Size
  activeGarments: Partial<Record<GarmentSlot, string>>

  setGender: (g: Gender) => void
  setModelId: (id: ModelId) => void
  setColor: (p: Part, c: Hex) => void
  setPattern: (p: 'top'|'bottom', pattern: Pattern) => void
  setBackground: (b: BackgroundPreset) => void
  setSize: (s: Size) => void
  setGarment: (slot: GarmentSlot, url: string | null) => void
  toggleAutoRotate: () => void
}

export const useCustomizer = create<CustomizerState>((set) => ({
  gender: 'female',
  modelId: 'avatar_female',
  autoRotate: true,
  colors: { skin:'#f7c7a3', top:'#d9534f', bottom:'#506680', shoes:'#222222' },
  patterns: { top:'none', bottom:'none' },
  background: 'neutral',
  size: 'M',
  activeGarments: {},

  setGender: (g) => set({ gender: g }),
  setModelId: (id) => set({ modelId: id }),
  setColor: (p, c) => set((s) => ({ colors: { ...s.colors, [p]: c } })),
  setPattern: (p, pattern) => set((s) => ({ patterns: { ...s.patterns, [p]: pattern } })),
  setBackground: (b) => set({ background: b }),
  setSize: (s) => set({ size: s }),
  setGarment: (slot, url) =>
    set((s) => ({ activeGarments: { ...s.activeGarments, [slot]: url ?? undefined } })),
  toggleAutoRotate: () => set((s) => ({ autoRotate: !s.autoRotate })),
}))