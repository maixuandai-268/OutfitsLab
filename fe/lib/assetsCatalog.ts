import type { BodyType } from '@/store/useCustomizer'

// Body model (đầu + thân) thay đổi theo thân hình và giới tính
export const BODY_MODELS: Record<'female' | 'male', Record<BodyType, string>> = {
  female: {
    skinny: '/model/body/Skinny_Head.glb',
    fit:    '/model/body/Fit_Head.glb',
    fat:    '/model/body/Fat_Head.glb',
  },
  male: {
    skinny: '/model/body/Skinny_Head.glb',
    fit:    '/model/body/Fit_Head.glb',
    fat:    '/model/body/Fat_Head.glb',
  }
}