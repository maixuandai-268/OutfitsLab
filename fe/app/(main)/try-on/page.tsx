import TryOnClient from '@/components/main/product/tryon/TryOnClient'

// Không import { revalidate } từ đâu khác.
export const revalidate = 0  // hoặc false

export default function TryOnPage() {
  return <TryOnClient />
}
