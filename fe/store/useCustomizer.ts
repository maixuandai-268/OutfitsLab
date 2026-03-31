import { create } from 'zustand'

export type Part = 'skin' | 'hat' | 'top' | 'bottom' | 'shoes'
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
  return product.model_url[1]
}

interface CustomizerState {
  modelId: ModelId
  bodyType: BodyType
  autoRotate: boolean
  colors: { skin: Hex }
  background: BackgroundPreset
  activeGarments: Partial<Record<GarmentSlot, string>>
  selectedGarments: Partial<Record<GarmentSlot, GarmentProduct>>

  setModelId: (id: ModelId) => void
  setColor: (p: 'skin', c: Hex) => void
  setBackground: (b: BackgroundPreset) => void
  setBodyType: (t: BodyType) => void
  setGarment: (slot: GarmentSlot, product: GarmentProduct | null) => void
  setGender: (gender: string) => void
  toggleAutoRotate: () => void
}

export const useCustomizer = create<CustomizerState>((set, get) => ({
  modelId: 'avatar_male',
  autoRotate: true,
  colors: { skin:'#f7c7a3' },
  background: 'neutral',
  bodyType: 'fit',   
  activeGarments: {},
  selectedGarments: {},

  setModelId: (id) => set({ modelId: id, activeGarments: {}, selectedGarments: {} }),
  setGender: (gender) => {
    const id: ModelId = gender === 'female' ? 'avatar_female' : 'avatar_male';
    set({ modelId: id, activeGarments: {}, selectedGarments: {} });
  },
  setColor: (p, c) => set((s) => ({ colors: { ...s.colors, [p]: c } })),
  setBackground: (b) => set({ background: b }),
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