'use client';

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { message } from "antd";

export default function AddProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { token, user } = useAuth();
  const shopId = searchParams.get('shopId');

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = [
    { name: 'Đen', color: '#000000' },
    { name: 'Trắng', color: '#FFFFFF' },
    { name: 'Xám', color: '#808080' },
    { name: 'Xanh dương', color: '#0066FF' },
    { name: 'Đỏ', color: '#FF0000' },
    { name: 'Xanh lá', color: '#00AA00' },
    { name: 'Vàng', color: '#FFFF00' },
    { name: 'Hồng', color: '#FF69B4' },
  ];

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("TOP");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);


  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const shopIdNumber = Number(shopId);

    if (!shopId || isNaN(shopIdNumber)) {
      return message.error("ID cửa hàng không hợp lệ!");
    }

    setLoading(true);
    try {
      // Payload đã được chuẩn hóa để khớp với CreateProductDto của Backend
      const payload = {
        name: name,
        description: description,
        price: Number(price),
        image: imageUrl,           // Khớp với trường 'image' trong DTO
        status: "active",          // Khớp với Enum ProductStatus (active/inactive)
        type: category,            // TOP, BOTTOM, v.v.
        shop_id: shopIdNumber,   // Ép kiểu số cho ID cửa hàng
        sizes: selectedSizes,      // Gửi mảng kích cỡ đã chọn
        colors: selectedColors,    // Gửi mảng mã màu đã chọn
      };

      const apiUrl = 'http://localhost:3000/api/products';

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        message.success("Đã đăng sản phẩm thành công!");
        window.dispatchEvent(new Event("new-notification"));
        router.push(`/shop_dashboard/${shopId}/products`);
      } else {
        console.error("Lỗi chi tiết từ Server:", data);
        message.error(data.message || "Đăng sản phẩm thất bại.");
      }
    } catch (error) {
      console.error("Lỗi kết nối:", error);
      message.error("Không thể kết nối tới máy chủ (Kiểm tra Backend).");
    } finally {
      setLoading(false);
    }

    console.log("shopId raw:", shopId);
    console.log("shopId number:", Number(shopId));
  };

  return (
    <div className="min-h-screen bg-[#fffbf5] pb-20">
      <div className="bg-white border-b-2 border-[#ffe9cc] mb-8">
        <div className="max-w-5xl mx-auto py-10 px-4 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-gray-800">Sản phẩm</h1>
            <p className="text-gray-600">Quản lý và thêm sản phẩm mới vào cửa hàng của bạn.</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl border-2 border-[#ffe9cc] p-8 shadow-sm">
          <button
            onClick={() => router.back()}
            className="text-[#d19f42] font-semibold text-sm mb-6 inline-flex items-center hover:underline"
          >
            ← Quay lại danh sách
          </button>

          <h1 className="text-3xl font-bold mb-8 text-gray-800">Thêm Sản Phẩm Mới</h1>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Tên sản phẩm</label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ví dụ: Áo Hoodie Minimalist Xám"
                className="w-full bg-[#fffbf5] px-4 py-3 border-2 border-[#ffe9cc] rounded-lg focus:outline-none focus:border-[#d19f42]"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Giá bán</label>
                <div className="flex items-center bg-[#fffbf5] px-4 h-12 border-2 border-[#ffe9cc] rounded-lg">
                  <span className="font-semibold mr-2 text-gray-500">₫</span>
                  <input
                    required
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="350,000"
                    className="flex-1 bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Danh mục</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#fffbf5] px-4 h-12 border-2 border-[#ffe9cc] rounded-lg focus:outline-none"
                >
                  <option value="TOP">ÁO (TOP)</option>
                  <option value="BOTTOM">QUẦN (BOTTOM)</option>
                  <option value="SHOES">GIÀY (SHOES)</option>
                  <option value="HAT">MŨ (HAT)</option>
                  <option value="GLASSES">KÍNH (GLASSES)</option>
                  <option value="ACCESSORY">PHỤ KIỆN</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Mô tả sản phẩm</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mô tả chất liệu, kiểu dáng..."
                rows={4}
                className="w-full px-4 bg-[#fffbf5] py-3 border-2 border-[#ffe9cc] rounded-lg focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Link ảnh sản phẩm (URL)</label>
              <input
                required
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/anh-san-pham.jpg"
                className="w-full bg-[#fffbf5] px-4 py-3 border-2 border-[#ffe9cc] rounded-lg focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-700">Kích cỡ có sẵn</label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    className={`w-full h-12 rounded-lg font-semibold border-2 transition-all ${selectedSizes.includes(size) ? 'bg-[#d19f42] text-white border-[#d19f42]' : 'border-[#ffe9cc] hover:bg-[#fff4e6] text-gray-600'}`}
                    onClick={() => toggleSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-700">Màu sắc có sẵn</label>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                {colors.map(item => (
                  <button
                    key={item.color}
                    type="button"
                    className={`w-full h-12 rounded-full border-2 flex justify-center items-center transition-transform ${selectedColors.includes(item.color) ? 'border-[#d19f42] scale-110 shadow-md' : 'border-gray-200 hover:border-[#d19f42]'}`}
                    style={{ backgroundColor: item.color }}
                    title={item.name}
                    onClick={() => toggleColor(item.color)}
                  >
                    {selectedColors.includes(item.color) && (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={`w-5 h-5 ${['#FFFFFF', '#FFFF00'].includes(item.color) ? 'text-black' : 'text-white'}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-6 py-3 border-2 border-[#d19f42] text-[#d19f42] font-bold rounded-full hover:bg-[#fff9f3]"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-[#d19f42] text-white font-bold rounded-full hover:bg-[#b8860b] transition-colors disabled:bg-gray-400"
              >
                {loading ? "Đang xử lý..." : "Đăng sản phẩm"}
              </button>
            </div>

            <div className="pt-4 px-4 py-3 bg-[#fff9f3] border-l-4 border-[#d19f42] rounded">
              <p className="text-xs text-gray-700">
                <span className="font-semibold text-[#d19f42]">💡 Gợi ý:</span> Sử dụng hình ảnh chất lượng cao và mô tả chi tiết để khách hàng dễ dàng lựa chọn sản phẩm của bạn hơn.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}