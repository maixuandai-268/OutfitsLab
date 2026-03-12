// app/shop/[id]/layout.tsx
'use client'

import { useParams } from 'next/navigation';
import ShopHeader from '@/components/shop/dashboard/ShopHeader';
import ShopNav from '@/components/shop/dashboard/ShopNav';
import { USERS, SHOPS } from '../../shopData';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const shopId = params?.id ? Number(params.id) : null;

  const shop = SHOPS.find((s) => s.id === shopId);
  const owner = shop ? USERS.find((u) => u.id === shop.owner_id) : null;

  if (!shop || !shopId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-700">Shop not found</h2>
          <p className="text-gray-500">ID: {params?.id}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      
      <ShopHeader shop={shop} owner={owner} />

      <div className="sticky top-0 z-10">
         <ShopNav shopId={shopId} />
      </div>

      <main className="flex-1 max-w-300 mx-auto w-full py-10 px-4">
        {children}
      </main>
    </div>
  );
}