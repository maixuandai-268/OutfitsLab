'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import {
  ShoppingCartOutlined,
  RiseOutlined,
  StarOutlined,
  StarFilled,
  ClockCircleOutlined,
  TruckOutlined,
  CheckCircleOutlined,

} from "@ant-design/icons";

import { USERS, REVIEWS, ORDERS } from '../../shopData';

const API_BASE = 'http://localhost:3000/api';

interface Shop {
  id: number;
  shop_name: string;
  rating: number;
  [key: string]: any;
}

interface Product {
  id: number;
  name: string;
  image?: string;
  price: number;
  salesCount: number;
  [key: string]: any;
}

export default function OverviewPage() {
  const params = useParams();
  const shopId = Number(params.id);

  const [shop, setShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!shopId) return;

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [shopRes, productsRes] = await Promise.all([
          fetch(`${API_BASE}/shops/${shopId}`),
          fetch(`${API_BASE}/products?shopId=${shopId}&limit=100`)
        ]);

        if (shopRes.ok) {
          const sData = await shopRes.json();
          setShop(sData);
        }

        if (productsRes.ok) {
          const pData = await productsRes.json();
          setProducts(pData.data || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [shopId]);

  const activeProducts = products.length;
  const totalSales = products.reduce((sum, p) => sum + (p.price * p.salesCount), 0);

  const dashboardData = {
    totalSales: totalSales,
    totalOrders: ORDERS.length,
    activeProducts: activeProducts,
    avgRating: shop?.rating ? Number(shop.rating).toFixed(1) : "5.0",
  };

  type OrderStatus = 'Processing' | 'Shipped' | 'Delivered';

  const getStatusStyles = (status: OrderStatus) => {
    switch (status) {
      case 'Processing': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Shipped': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Delivered': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };
  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'Processing': return <ClockCircleOutlined size={12} />;
      case 'Shipped': return <TruckOutlined size={12} />;
      case 'Delivered': return <CheckCircleOutlined size={12} />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Doanh Thu", value: `${dashboardData.totalSales.toLocaleString()}₫`, icon: "💰" },
          { label: "Sản Phẩm ", value: dashboardData.activeProducts, icon: "📦" },
          { label: "Lượt Đặt Hàng", value: dashboardData.totalOrders, icon: "📋" },
          { label: "Đánh Giá Trung Bình", value: `${dashboardData.avgRating}/5`, icon: "⭐" }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-orange-100 shadow-sm">
            <p className="text-4xl mb-4">{stat.icon}</p>
            <p className="text-gray-400 text-xs font-bold uppercase">{stat.label}</p>
            <h4 className="text-lg font-bold">{stat.value}</h4>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-orange-100 shadow-sm">
        <div className="p-6 border-b border-orange-50 flex justify-between items-center">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <ShoppingCartOutlined /> Đơn Hàng Gần Đây
          </h3>
          <button className="text-xs font-bold text-teal-600 hover:text-teal-700 hover:underline uppercase">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-max">
            <thead className="bg-orange-50/30 text-[10px] font-bold text-gray-400 uppercase">
              <tr>
                <th className="px-6 py-4">Mã Đơn Hàng</th>
                <th className="px-6 py-4">Khách Hàng</th>
                <th className="px-6 py-4">Sản Phẩm</th>
                <th className="px-6 py-4">Thành Tiền</th>
                <th className="px-6 py-4">Ngày Giao Dịch</th>
                <th className="px-6 py-4 text-center">Trạng Thái</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {ORDERS.slice(0, 4).map((order) => {
                const customer = USERS.find(u => u.id === order.user_id);
                // Find from current fetched shop products
                const prod = products.find(p => p.id === order.product_id) || { name: 'Sản phẩm ' + order.product_id, price: 100000 };
                return (
                  <tr key={order.id} className="hover:bg-orange-50/20 transition group">
                    <td className="px-6 py-4 font-bold ">{order.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {customer?.avatar_url && <img src={customer.avatar_url} alt="" className="w-8 h-8 rounded-full border border-gray-100 object-cover" />}
                        <div className="flex flex-col">
                          <span className="font-bold">{customer?.display_name || 'Unknown'}</span>
                          <span className="text-[10px] text-gray-400">{customer?.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium ">{prod?.name}</div>
                      <div className="text-[13px] text-gray-400 mt-0.5">Số lượng: {order.quantity}</div>
                    </td>
                    <td className="px-6 py-4 font-bold text-teal-600">{((prod?.price || 0) * order.quantity).toLocaleString('en-US')}₫</td>
                    <td className="px-6 py-4 text-gray-500 font-medium text-xs">{order.date}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase border ${getStatusStyles(order.status as OrderStatus)}`}>
                        {getStatusIcon(order.status as OrderStatus)}{order.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-6">
          <h3 className="font-bold text-lg flex items-center gap-2 mb-6"><RiseOutlined /> Sản Phẩm Bán Chạy</h3>
          <div className="space-y-4">
            {products.sort((a, b) => b.salesCount - a.salesCount).slice(0, 6).map((prod, index) => (
              <div key={prod.id} className="flex items-center justify-between p-3 hover:bg-orange-50/50 rounded-xl transition">
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold w-6 text-[#c5ab36]">#{index + 1}</span>
                  <img src={prod.image || 'https://via.placeholder.com/150'} alt="" className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <div className="font-bold text-sm">{prod.name}</div>
                    <div className="text-[10px] text-gray-400 font-bold">{prod.salesCount} đã bán</div>
                  </div>
                </div>
                <div className="font-bold text-teal-600 text-sm">{(prod.price * prod.salesCount).toLocaleString()}₫</div>
              </div>
            ))}
            {products.length === 0 && (
              <div className="text-gray-500 text-sm italic">Shop chưa có sản phẩm nào.</div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-6">
          <h3 className="font-bold text-lg flex items-center gap-2 mb-6"><StarOutlined /> Đánh Giá Gần Đây</h3>
          <div className="space-y-6">
            {REVIEWS.slice(0, 4).map((review) => {
              const customer = USERS.find(u => u.id === review.user_id);
              return (
                <div key={review.id} className="border-b border-orange-50 last:border-0 pb-5 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <img src={customer?.avatar_url || 'https://i.pravatar.cc/100'} alt="" className="w-8 h-8 rounded-full border border-gray-100 object-cover" />
                      <div>
                        <div className="font-bold text-sm">{customer?.display_name || 'Anonymous'}</div>
                        <div className="flex text-yellow-600 gap-0.5">
                          {[...Array(5)].map((_, i) => <StarFilled key={i} style={{ color: i < review.rating ? '#facc15' : '#e5e7eb', fontSize: 10 }} />)}
                        </div>
                      </div>
                    </div>
                    <div className="text-[10px] text-gray-400 font-bold bg-gray-50 px-2 py-1 rounded">{review.date}</div>
                  </div>
                  <p className="text-gray-600 text-sm italic pl-10">"{review.comment}"</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

