import type { BodyType } from '@/store/useCustomizer'

export const BODY_MODELS: Record<'female' | 'male', Record<BodyType, string>> = {
  female: {
    skinny: '/model/body/Skinny_Female_Head.glb',
    fit: '/model/body/Fit_Female_Head.glb',
    fat: '/model/body/Fat_Female_Head.glb',
  },
  male: {
    skinny: '/model/body/Skinny_Head.glb',
    fit: '/model/body/Fit_Head.glb',
    fat: '/model/body/Fat_Head.glb',
  }
}