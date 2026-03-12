'use client'

import { useParams } from 'next/navigation';
import { PlusOutlined, CodeSandboxOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { PRODUCTS, ORDERS, SHOPS } from '../../../shopData';
import { ShopProductCard } from '@/components/shop/profile/showProduct';

export default function ProductsPage() {
  const params = useParams();
  const shopId = Number(params.id);
  const shop = SHOPS.find((s) => s.id === shopId);
    if (!shop) return null;

  const products = PRODUCTS.filter((p) => p.shop_id === shop.id);
  return (
    <div className="">
        <div className="flex flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-2xl font-bold ">
                Sản Phẩm Của Bạn <span className="text-gray-400 font-medium">({products.length})</span>
            </h2>
            <button className="bg-[#C59436] hover:bg-[#B0832F] text-white px-6 py-2.5 rounded-xl font-bold flex items-center shadow-lg shadow-orange-100">
                <PlusOutlined className="mr-2" /> Thêm sản phẩm
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((prod) => (
                <ShopProductCard key={prod.id} product={prod} shop={shop} />
            ))}
        </div>
    </div>
  );
}