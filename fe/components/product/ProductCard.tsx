'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FavoriteButton } from './FavoriteButton';

const API_BASE = 'http://localhost:3000/api';

interface Product {
    id: number;
    name: string;
    image_url?: string;
    image?: string;
    price: number;
    sold?: number;
    salesCount?: number;
    rating?: number;
    reviews?: { rating: number }[];
}

interface ProductCardProps {
    count?: number;
    columns?: number;
}

export const ProductCard = ({ count = 3, columns = 3 }: ProductCardProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${API_BASE}/products?limit=${count}`);
                if (res.ok) {
                    const json = await res.json();
                    setProducts(json.data || []);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [count]);

    if (loading) {
        return <div className="w-full text-center text-gray-500 py-10">Đang tải sản phẩm...</div>;
    }

    return (
        <div
            className="grid gap-4 w-full"
            style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
            {products.map(item => {
                // 🌟 LOGIC ĐÁNH GIÁ: Tính trung bình từ reviews, nếu rỗng thì dùng cột rating
                const reviewData = item.reviews || [];
                const reviewCount = reviewData.length;
                let displayRating: string;

                if (reviewCount > 0) {
                    const avg = reviewData.reduce((acc, rev) => acc + Number(rev.rating), 0) / reviewCount;
                    displayRating = avg.toFixed(1);
                } else {
                    displayRating = item.rating ? Number(item.rating).toFixed(1) : "5.0";
                }

                return (
                    <Link key={item.id} href={`/product_detail/${item.id}`} className="hover:shadow-lg border border-transparent hover:border-gray-100 transition-all relative pb-24 block bg-white rounded-sm overflow-hidden">
                        <div className="absolute top-2 right-2 z-10" onClick={(e) => e.preventDefault()}>
                            <FavoriteButton targetId={item.id} />
                        </div>
                        <div>
                            <img
                                src={item.image || item.image_url || 'https://via.placeholder.com/200'}
                                alt={item.name}
                                className="w-full h-48 object-cover"
                            />
                            <p className="text-sm font-medium m-2 line-clamp-2 h-10 text-gray-800 uppercase">
                                {item.name}
                            </p>
                        </div>
                        <div className="absolute bottom-0 w-full p-2 bg-white">
                            <p className="text-lg font-bold text-pink-600 mb-1">
                                {formatCurrency(Number(item.price))}
                            </p>
                            <div className="flex justify-between items-center">
                                <p className="text-[10px] text-gray-500">
                                    {item.salesCount || item.sold || 0} Đã bán
                                </p>
                                <div className="flex items-center gap-0.5">
                                    <StarIcon className="text-yellow-500 w-3 h-3" filled={true} />
                                    <p className="text-[10px] font-medium text-gray-600">
                                        {displayRating} <span className="text-gray-400">({reviewCount})</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export function StarIcon({ className, filled = true }: { className?: string; filled?: boolean }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={filled ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={className || "w-6 h-6"}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
        </svg>
    );
}