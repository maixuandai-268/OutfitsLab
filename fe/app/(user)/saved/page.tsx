'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Heart, Trash2, ShoppingBag, ArrowLeft, Store } from 'lucide-react';
import Link from 'next/link';

const API_BASE = 'http://localhost:3000/api';

interface Product {
  id: number;
  name: string;
  image?: string;
  price: number;
  description?: string;
  salesCount: number;
  status: string;
}

interface Shop {
  id: number;
  shop_name: string;
  avatar_url?: string;
  description?: string;
  location?: string;
  rating: number;
}

export default function SavedOutfitsPage() {
  const { token, user, loading: authLoading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'products' | 'shops'>('products');

  const fetchFavourites = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [productsRes, shopsRes] = await Promise.all([
        fetch(`${API_BASE}/favourite/products`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_BASE}/favourite/shops`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      ]);

      if (!productsRes.ok || !shopsRes.ok) throw new Error('Không thể tải danh sách yêu thích');

      const [productsData, shopsData] = await Promise.all([
        productsRes.json(),
        shopsRes.json()
      ]);

      setProducts(productsData);
      setShops(shopsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!authLoading && token) {
      fetchFavourites();
    } else if (!authLoading && !token) {
      setLoading(false);
    }
  }, [authLoading, token, fetchFavourites]);

  const handleRemoveProduct = async (productId: number) => {
    if (!token) return;
    setRemovingId(`product-${productId}`);
    try {
      await fetch(`${API_BASE}/favourite/products/${productId}/toggle`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (err) {
      console.error(err);
    } finally {
      setRemovingId(null);
    }
  };

  const handleRemoveShop = async (shopId: number) => {
    if (!token) return;
    setRemovingId(`shop-${shopId}`);
    try {
      await fetch(`${API_BASE}/favourite/shops/${shopId}/toggle`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      setShops((prev) => prev.filter((s) => s.id !== shopId));
    } catch (err) {
      console.error(err);
    } finally {
      setRemovingId(null);
    }
  };

  if (authLoading || (token && loading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-rose-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 font-medium">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6">
        <Heart className="w-20 h-20 text-rose-300" />
        <h1 className="text-2xl font-bold text-gray-800">Bạn chưa đăng nhập</h1>
        <p className="text-gray-500 text-center">
          Vui lòng đăng nhập để xem danh sách yêu thích của bạn.
        </p>
        <Link
          href="/sign-in"
          className="px-8 py-3 text-white font-semibold rounded-xl hover:bg-rose-600 transition"
        >
          Đăng nhập ngay
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/product"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-rose-500 transition mb-4 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại cửa hàng
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">Danh sách đã lưu</h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 pb-4 text-lg font-medium transition-colors relative ${activeTab === 'products' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
              }`}
          >
            Sản phẩm
            {products.length > 0 && (
              <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${activeTab === 'products' ? 'bg-rose-100 text-rose-600' : 'bg-gray-100 text-gray-500'
                }`}>
                {products.length}
              </span>
            )}
            {activeTab === 'products' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-t-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('shops')}
            className={`flex items-center gap-2 pb-4 text-lg font-medium transition-colors relative ${activeTab === 'shops' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
              }`}
          >
            Cửa hàng
            {shops.length > 0 && (
              <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${activeTab === 'shops' ? 'bg-rose-100 text-rose-600' : 'bg-gray-100 text-gray-500'
                }`}>
                {shops.length}
              </span>
            )}
            {activeTab === 'shops' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-t-full" />
            )}
          </button>
        </div>

        {/* Tab Content - Products */}
        {activeTab === 'products' && (
          products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-5">
              <div className="w-24 h-24 rounded-full bg-rose-50 flex items-center justify-center">
                <ShoppingBag className="w-12 h-12 text-rose-300" />
              </div>
              <h2 className="text-xl font-semibold text-gray-700">
                Chưa có sản phẩm nào được lưu
              </h2>
              <p className="text-gray-500 text-center max-w-md">
                Khám phá và lưu ngay những sản phẩm yêu thích của bạn!
              </p>
              <Link
                href="/product"
                className="inline-flex items-center gap-2 px-6 py-3 bg-rose-500 text-white font-semibold rounded-xl hover:bg-rose-600 transition"
              >
                <ShoppingBag className="w-5 h-5" />
                Khám phá sản phẩm
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                >
                  <div className="relative h-52 bg-gray-100 overflow-hidden">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <ShoppingBag className="w-16 h-16" />
                      </div>
                    )}
                    <button
                      onClick={() => handleRemoveProduct(product.id)}
                      disabled={removingId === `product-${product.id}`}
                      className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-red-50 text-rose-500 rounded-full shadow-md transition disabled:opacity-50"
                      title="Bỏ lưu"
                    >
                      {removingId === `product-${product.id}` ? (
                        <div className="w-4 h-4 border-2 border-rose-400 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
                    {product.description && (
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">{product.description}</p>
                    )}

                    <div className="flex items-center justify-between mt-4">
                      <p className="text-lg font-bold text-gray-900">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                      </p>
                      <Link
                        href={`/product_detail/${product.id}`}
                        className="text-xs font-semibold text-rose-500 hover:underline"
                      >
                        Xem chi tiết →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {/* Tab Content - Shops */}
        {activeTab === 'shops' && (
          shops.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-5">
              <div className="w-24 h-24 rounded-full bg-rose-50 flex items-center justify-center">
                <Store className="w-12 h-12 text-rose-300" />
              </div>
              <h2 className="text-xl font-semibold text-gray-700">
                Chưa có cửa hàng nào được lưu
              </h2>
              <p className="text-gray-500 text-center max-w-md">
                Bạn chưa lưu cửa hàng nào. Hãy ghé thăm danh sách các shop nổi bật!
              </p>
              <Link
                href="/shops"
                className="inline-flex items-center gap-2 px-6 py-3 bg-rose-500 text-white font-semibold rounded-xl hover:bg-rose-600 transition"
              >
                <Store className="w-5 h-5" />
                Khám phá cửa hàng
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {shops.map((shop) => (
                <div
                  key={shop.id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 flex items-start gap-4 relative group"
                >
                  <Link href={`/shop_profile/${shop.id}`} className="shrink-0 flex-1 flex gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 border border-gray-100 shrink-0">
                      {shop.avatar_url ? (
                        <img
                          src={shop.avatar_url}
                          alt={shop.shop_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <Store className="w-8 h-8" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-gray-900 truncate pr-8">{shop.shop_name}</h3>
                      {shop.location && (
                        <p className="text-sm text-gray-500 mt-1 truncate">{shop.location}</p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <span className="flex items-center text-sm font-medium text-yellow-600">
                          ⭐ {shop.rating || '5.0'}
                        </span>
                      </div>
                    </div>
                  </Link>

                  <button
                    onClick={() => handleRemoveShop(shop.id)}
                    disabled={removingId === `shop-${shop.id}`}
                    className="absolute top-6 right-6 p-2 bg-rose-50 text-rose-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                    title="Bỏ lưu shop"
                  >
                    {removingId === `shop-${shop.id}` ? (
                      <div className="w-4 h-4 border-2 border-rose-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
