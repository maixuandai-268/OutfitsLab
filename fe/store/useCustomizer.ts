import { create } from 'zustand'

export type Gender = 'female' | 'male'
export type Part = 'skin' | 'hat' | 'top' | 'bottom' | 'shoes'
export type Size = 'XS'|'S'|'M'|'L'|'XL'
export type Pattern = 'none'|'stripes'|'polka'|'plaid'
export type BackgroundPreset = 'neutral'|'studio'|'shadow'|'gradientWarm'|'gradientCool'
export type ModelId = 'avatar_female' | 'avatar_male'
export type GarmentSlot = 'top' | 'bottom' | 'shoes' | 'hat'
export type BodyType = 'skinny' | 'fit' | 'fat'
type Hex = `#${string}`

export interface GarmentProduct {
  id: number
  name: string
  type: string
  garment_slot?: string
  image?: string
  model_url?: string[]
}

export function resolveModelUrl(product: GarmentProduct, bodyType: BodyType): string | undefined {
  if (!product.model_url || product.model_url.length === 0) return undefined
  
  const slot = product.garment_slot || product.type
  if (slot === 'shoes' || slot === 'hat') return product.model_url[0]
  
  if (bodyType === 'skinny') return product.model_url[0]
  if (bodyType === 'fat') return product.model_url[2]
  return product.model_url[1] // fit
}

interface CustomizerState {
  gender: Gender
  modelId: ModelId
  bodyType: BodyType
  autoRotate: boolean
  colors: Record<Part, Hex>
  patterns: { top: Pattern; bottom: Pattern; hat: Pattern; shoes: Pattern }
  background: BackgroundPreset
  size: Size
  activeGarments: Partial<Record<GarmentSlot, string>>
  selectedGarments: Partial<Record<GarmentSlot, GarmentProduct>>

  setGender: (g: Gender) => void
  setModelId: (id: ModelId) => void
  setColor: (p: Part, c: Hex) => void
  setPattern: (p: 'top'|'bottom'|'hat'|'shoes', pattern: Pattern) => void
  setBackground: (b: BackgroundPreset) => void
  setSize: (s: Size) => void
  setBodyType: (t: BodyType) => void
  setGarment: (slot: GarmentSlot, product: GarmentProduct | null) => void
  toggleAutoRotate: () => void
}

export const useCustomizer = create<CustomizerState>((set, get) => ({
  gender: 'male',
  modelId: 'avatar_male',
  autoRotate: true,
  colors: { skin:'#f7c7a3', hat:'#f7c7a3', top:'#d9534f', bottom:'#506680', shoes:'#222222' },
  patterns: { top:'none', bottom:'none', hat:'none', shoes:'none' },
  background: 'neutral',
  size: 'M',
  bodyType: 'fit',   
  activeGarments: {},
  selectedGarments: {},

  setGender: (g) => set({ gender: g }),
  setModelId: (id) => set({ modelId: id }),
  setColor: (p, c) => set((s) => ({ colors: { ...s.colors, [p]: c } })),
  setPattern: (p, pattern) => set((s) => ({ patterns: { ...s.patterns, [p]: pattern } })),
  setBackground: (b) => set({ background: b }),
  setSize: (s) => set({ size: s }),
  toggleAutoRotate: () => set((s) => ({ autoRotate: !s.autoRotate })),

  setBodyType: (t) => set((s) => {
    const newActive: Partial<Record<GarmentSlot, string>> = {}
    for (const slot of Object.keys(s.selectedGarments) as GarmentSlot[]) {
      const product = s.selectedGarments[slot]
      if (product) {
        const url = resolveModelUrl(product, t)
        if (url) newActive[slot] = url
      }
    }
    return { bodyType: t, activeGarments: newActive }
  }),

  setGarment: (slot, product) => set((s) => {
    if (!product) {
      const { [slot]: _a, ...restActive } = s.activeGarments
      const { [slot]: _b, ...restSel } = s.selectedGarments
      return { activeGarments: restActive, selectedGarments: restSel }
    }
    const url = resolveModelUrl(product, s.bodyType)
    return {
      selectedGarments: { ...s.selectedGarments, [slot]: product },
      activeGarments: { ...s.activeGarments, [slot]: url ?? undefined },
    }
  }),
}))