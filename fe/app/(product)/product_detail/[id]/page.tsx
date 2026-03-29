'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ProductDetail } from '@/components/product/ProductDetail';
import ReviewSection from '@/components/product/ProductReview';
import { ProductCard } from '@/components/product/ProductCard';

const API_BASE = 'http://localhost:3000/api';

export default function ProductDetailPage() {

  const params = useParams();
  const productId = Number(params.id);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;

    }

    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_BASE}/products/${productId}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setProduct(data.data || data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <div className="min-h-screen text-center flex items-center justify-center">Loading product...</div>;

  if (!productId || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Không tìm thấy Sản phẩm ID hợp lệ. Vui lòng quay lại trang danh sách.</p>
        <Link href="" className="ml-4 text-blue-500 underline">Quay lại</Link>
      </div>
    )
  }

  return (
    <div className="">
      <div className="max-w-310 mx-auto">
        <div className='mb-15'><ProductDetail product={product} /></div>
        <ReviewSection productId={productId} />
      </div>

      <section className="">
        <h2 className="text-3xl font-bold p-6 mb-2">Sản Phẩm Cùng Danh Mục</h2>
        <div className="px-4 sm:px-6 lg:px-8">
          <ProductCard count={8} columns={5} />
        </div>
      </section>
    </div>
  )
}