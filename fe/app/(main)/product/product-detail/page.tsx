'use client'

import { useParams } from 'next/navigation';
import { PlusOutlined, CodeSandboxOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { PRODUCTS, ORDERS, SHOPS } from '../../../(shop)/shopData';

export default function ProductsPage() {
  const params = useParams();
  const shopId = Number(params.id);
  const shop = SHOPS.find((s) => s.id === shopId);
    if (!shop) return null;

  const products = PRODUCTS.filter((p) => p.shop_id === shop.id);

//   const products = PRODUCTS.filter(p => p.shop_id === shopId).map((p) => {
 
//      const sales = ORDERS.filter(o => o.product_id === p.id).reduce((sum, o) => sum + o.quantity, 0);
//      return {
//         ...p,
//         Sales: sales,
//      }
//   });
  

  return (
    <div className="">
        <div className="flex flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-2xl font-bold ">
                Your Products <span className="text-gray-400 font-medium">({products.length})</span>
            </h2>
            <button className="bg-[#C59436] hover:bg-[#B0832F] text-white px-6 py-2.5 rounded-xl font-bold flex items-center shadow-lg shadow-orange-100">
                <PlusOutlined className="mr-2" /> Add Product
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((prod) => (
                <div key={prod.id} className="bg-white rounded-b-2xl border-2 border-orange-100 shadow-sm flex flex-col">
                    <div className="h-48 bg-[#FFF9F3] flex items-center justify-center">
                        {prod.image_url ? (
                            <img src={prod.image_url} alt={prod.name} className="h-full w-full object-cover" />
                        ) : (
                            <CodeSandboxOutlined className="text-5xl text-gray-300" />
                        )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                        <h3 className="font-bold text-lg line-clamp-1">{prod.name}</h3>
                        <div className="flex items-center justify-between mb-4 mt-2">
                            <span className="text-[#C59436] font-bold text-lg">${prod.price}</span>
                            {/* <span className="text-gray-400 text-xs font-medium">{prod.Sales} sales</span> */}
                        </div>
                        <div className="mt-auto grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center gap-2 bg-[#007C89] hover:bg-[#006873] text-white py-2 rounded-lg font-bold text-sm"><EditOutlined /> Edit</button>
                            <button className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-500 py-2 rounded-lg font-bold text-sm"><DeleteOutlined /> Delete</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}