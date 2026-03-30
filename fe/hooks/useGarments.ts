import { useState, useEffect } from 'react';
import type { GarmentSlot, GarmentProduct } from '@/store/useCustomizer';

export type { GarmentProduct };

export function useGarments(slot: GarmentSlot, gender: string) {
  const [garments, setGarments] = useState<GarmentProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGarments = async () => {
      setLoading(true);
      try {
        // Lấy sản phẩm theo garment_slot (không phải type)
        const response = await fetch(
          `http://localhost:3000/api/products?garment_slot=${slot}&gender=${gender}&limit=100`
        );
        const result = await response.json();

        // Chỉ lấy sản phẩm có model URL hợp lệ
        const items = (result.data || []).filter((p: GarmentProduct) => {
          return Array.isArray(p.model_url) && p.model_url.some(url => !!url);
        });

        setGarments(items);
      } catch (error) {
        console.error('Failed to fetch garments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGarments();
  }, [slot, gender]);

  return { garments, loading };
}
