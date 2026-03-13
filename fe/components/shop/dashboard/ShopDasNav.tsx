'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChartOutlined, InboxOutlined, TeamOutlined, SettingOutlined } from "@ant-design/icons";

export default function ShopNav({ shopId }: { shopId: number }) {
  const pathname = usePathname();

  const nav = [
    { href: `/shop_dashboard/${shopId}`, label: "Tổng Quan", icon: BarChartOutlined, exact: true },
    { href: `/shop_dashboard/${shopId}/products`, label: "Sản Phẩm", icon: InboxOutlined },
    { href: `/shop_dashboard/${shopId}/analytics`, label: "Phân Tích", icon: TeamOutlined },
    { href: `/shop_dashboard/${shopId}/settings`, label: "Cài Đặt", icon: SettingOutlined },
  ];

  return (
    <div className="bg-white border-b border-[#ffe9cc]">
      <nav className="grid grid-cols-4 max-w-6xl mx-auto">
        {nav.map((item) => {
          const isActive = item.exact 
            ? pathname === item.href 
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center justify-center gap-2 px-6 py-4 border-b-[3px] font-medium transition-all
                ${isActive 
                  ? 'border-teal-400 text-teal-600 bg-teal-50/10'
                  : 'border-transparent text-gray-500 hover:text-teal-400 hover:border-gray-200'
                }
              `}
            >
              <span className={isActive ? 'text-teal-500 text-lg' : 'text-gray-400 text-lg'}>
                <item.icon />
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}