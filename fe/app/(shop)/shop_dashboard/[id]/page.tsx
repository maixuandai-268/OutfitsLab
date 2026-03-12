'use client'

import { 
  ShoppingCartOutlined,
  RiseOutlined,
  StarOutlined,
  StarFilled,
  ClockCircleOutlined,
  TruckOutlined,
  CheckCircleOutlined,

} from "@ant-design/icons";

import { USERS, REVIEWS, PRODUCTS, ORDERS } from '../../shopData';

export default function OverviewPage() {

  const dashboardData = {
    totalSales: 25000000,
    totalOrders: 48,
    activeProducts: 12,
    avgRating: "4.9",

    products: [
      { id: 101, name: "Sản phẩm 1", image_url: "https://picsum.photos/200", Sales: 150, revenue: 15000000 },
      { id: 102, name: "Sản phẩm 2", image_url: "https://picsum.photos/201", Sales: 12, revenue: 500000 },
      { id: 103, name: "Sản phẩm 3", image_url: "https://picsum.photos/202", Sales: 130, revenue: 150000 },
      { id: 104, name: "Sản phẩm 4", image_url: "https://picsum.photos/203", Sales: 85, revenue: 850000 },
      { id: 105, name: "Sản phẩm 5", image_url: "https://picsum.photos/204", Sales: 110, revenue: 12000000 },
      { id: 106, name: "Sản phẩm 6", image_url: "https://picsum.photos/205", Sales: 25, revenue: 80000 },
    ],
    
     
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

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
        {/* STATS CARDS */}
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

        {/* RECENT ORDERS */}
        <div className="bg-white rounded-2xl border border-orange-100 shadow-sm">
          <div className="p-6 border-b border-orange-50 flex justify-between items-center">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <ShoppingCartOutlined /> Đơn Hàng Gần Đây
            </h3>
            <button className="text-xs font-bold text-teal-600 hover:text-teal-700 hover:underline uppercase">
              View All
            </button>
          </div>
        
          <div className="">
            <table className="w-full text-left">
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
                  const prod = PRODUCTS.find(p => p.id === order.product_id);
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
                      <td className="px-6 py-4 font-bold text-teal-600">{((prod?.price||0)*order.quantity).toLocaleString('en-US')}₫</td>
                      <td className="px-6 py-4 text-gray-500 font-medium text-xs">{order.date}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase border ${getStatusStyles(order.status)}`}>
                          {getStatusIcon(order.status)}{order.status}
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
          {/* TOP PRODUCTS */}
          <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-6">
            <h3 className="font-bold text-lg flex items-center gap-2 mb-6"><RiseOutlined /> Sản Phẩm Bán Chạy</h3>
            <div className="space-y-4">
              {dashboardData.products.sort((a, b) => b.revenue - a.revenue).map((prod, index) => (
                <div key={prod.id} className="flex items-center justify-between p-3 hover:bg-orange-50/50 rounded-xl transition">
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold w-6 text-[#c5ab36]">#{index + 1}</span>
                    <img src={prod.image_url} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <div className="font-bold text-sm">{prod.name}</div>
                      <div className="text-[10px] text-gray-400 font-bold">{prod.Sales} đã bán</div>
                    </div>
                  </div>
                  <div className="font-bold text-teal-600 text-sm">{prod.revenue.toLocaleString()}₫</div>
                </div>
              ))}
            </div>
          </div>

          {/* RECENT REVIEWS */}
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
                              {[...Array(5)].map((_, i) => <StarFilled key={i} style={{ color: i < review.rating ? '#facc15' : '#e5e7eb', fontSize: 10 }}/>)}
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

