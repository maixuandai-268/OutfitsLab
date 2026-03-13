import React, { useState } from 'react';

interface Shop {
  location: string;
  created_at: string;
}

interface AboutShopProps {
  shop: Shop;
}

export const AboutShop = ({ shop }: AboutShopProps) => {

  return (
		<div>
			<div className="bg-[#fff8ee] border border-[#ffddba] rounded-2xl p-6 md:p-8 mb-20">
				<h2 className="text-2xl font-bold mb-9">About</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div>
						<p className="text-3xl font-semibold mb-5">Thành Viên Từ</p>
						<p className="text-gray-600">{shop.created_at}</p>
					</div>
						<div>
						<p className="text-3xl font-semibold mb-5">Địa điểm</p>
						<p className="text-gray-600">{shop.location}</p>
					</div>
					<div>
						<p className="text-3xl font-semibold mb-5">Tỷ lệ Phản hồi</p>
						<p className="text-gray-600">98% trong vòng 24 giờ</p>
					</div>
				</div>
			</div>
		</div>
  );
};