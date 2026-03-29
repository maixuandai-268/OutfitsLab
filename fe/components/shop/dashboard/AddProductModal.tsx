"use client";
import React, { useState } from "react";
import { 
  Modal, 
  Input, 
  InputNumber, 
  Select, 
  message, 
  Tooltip, 
  Button, 
  Divider,
  Tag as AntTag,
  Space,
  Typography,
  Upload,
  Spin
} from "antd";
import { 
  PlusOutlined, 
  UploadOutlined, 
  DollarOutlined, 
  BgColorsOutlined,
  InfoCircleOutlined,
  ShopOutlined,
  AppstoreOutlined,
  GlobalOutlined
} from "@ant-design/icons";
import { useAuth } from "@/context/AuthContext";

const { Text } = Typography;

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  shopId: string | number;
  onSuccess: () => void;
}

// Lấy chính xác các giá trị từ Sidebar để lọc đồng bộ
const CATEGORY_OPTIONS = [
  { label: "Áo Sơ Mi (Shirts)", value: "shirts" },
  { label: "Quần (Pants)", value: "pants" },
  { label: "Váy/Đầm (Dresses)", value: "dresses" },
  { label: "Áo Khoác (Jackets)", value: "jackets" },
  { label: "Hoodies", value: "hoodies" },
  { label: "Áo Blazer", value: "blazers" },
  { label: "Chân Váy (Skirts)", value: "skirts" },
  { label: "Áo Len (Sweaters)", value: "sweaters" },
  { label: "Giày/Sneakers", value: "sneakers" },
];

const COLOR_OPTIONS = [
  { name: "Đen", value: "black", hex: "#000000" },
  { name: "Trắng", value: "white", hex: "#FFFFFF" },
  { name: "Xám", value: "gray", hex: "#808080" },
  { name: "Đỏ", value: "red", hex: "#FF0000" },
  { name: "Xanh dương", value: "blue", hex: "#0066FF" },
  { name: "Hồng", value: "pink", hex: "#FF69B4" },
  { name: "Kem/Be", value: "cream", hex: "#F5F5DC" },
  { name: "Vàng", value: "mustard", hex: "#FFDB58" },
  { name: "Xanh lá", value: "green", hex: "#22C55E" },
];

const SIZE_OPTIONS = ["S", "M", "L", "XL", "XXL", "FREESIZE"];

export default function AddProductModal({ isOpen, onClose, shopId, onSuccess }: AddProductModalProps) {
  const { token, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    type: "", // Category key for filtering
    image: "",
    description: "",
    colors: [] as string[],
    sizes: [] as string[],
    status: "active",
    affiliateLink: "",
  });

  const handleInputChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleColor = (colorValue: string) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.includes(colorValue)
        ? prev.colors.filter((c) => c !== colorValue)
        : [...prev.colors, colorValue],
    }));
  };

  // Lấy label của category dựa trên type đã chọn
  const getCategoryLabel = (type: string) => {
    const option = CATEGORY_OPTIONS.find(o => o.value === type);
    if (!option) return "";
    // Lấy phần tên trước trong ngoặc, ví dụ: "Áo Sơ Mi (Shirts)" -> "ÁO SƠ MI"
    return option.label.split("(")[0].trim().toUpperCase();
  };

  const handleSubmit = async () => {
    if (!formData.name || formData.price <= 0 || !formData.image || !formData.type) {
      return message.error("Vui lòng nhập đầy đủ Tên, Giá, Hình ảnh và Danh mục!");
    }

    if (formData.colors.length === 0) {
      return message.error("Vui lòng chọn ít nhất một màu sắc!");
    }

    setLoading(true);
    try {
      // Tự động gán Brand là tên cửa hàng và Tag là nhãn danh mục
      const payload = {
        ...formData,
        shop_id: Number(shopId),
        brand: user?.shop?.shop_name || "Outfits Lab",
        tag: getCategoryLabel(formData.type) || "SẢN PHẨM",
      };

      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        message.success("Thêm sản phẩm thành công!");
        onSuccess();
        onClose();
        setFormData({
          name: "",
          price: 0,
          type: "",
          image: "",
          description: "",
          colors: [],
          sizes: [],
          status: "active",
          affiliateLink: "",
        });
      } else {
        const errorData = await response.json();
        message.error(errorData.message || "Không thể thêm sản phẩm.");
      }
    } catch (error) {
      message.error("Lỗi kết nối đến máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  const currentCategoryLabel = getCategoryLabel(formData.type);
  const currentBrand = user?.shop?.shop_name || "Cửa hàng của tôi";

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-xl font-bold text-gray-800">
          <PlusOutlined className="text-pink-500" />
          <span>Thêm Sản Phẩm Mới</span>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={loading}
      okText="Lưu & Hiển thị"
      cancelText="Hủy bỏ"
      width={750}
      centered
    >
      <div className="py-4 space-y-6">
        <div className="bg-amber-50 border border-amber-100 p-3 rounded-xl flex gap-3 items-start">
          <InfoCircleOutlined className="text-amber-500 mt-0.5" />
          <p className="text-[11px] text-amber-700 leading-relaxed">
            Hệ thống sẽ tự động gán <strong>Thương hiệu</strong> là tên cửa hàng của bạn và <strong>Tag</strong> theo danh mục bạn chọn để đồng bộ hiển thị.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                <AppstoreOutlined className="text-pink-500" /> Tên sản phẩm *
              </label>
              <Input 
                placeholder="Ví dụ: Áo Sơ Mi Lụa Cao Cấp" 
                size="large"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="rounded-lg shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                <DollarOutlined className="text-yellow-500" /> Giá bán (VND) *
              </label>
              <InputNumber<number>
                className="w-full rounded-lg"
                size="large"
                min={0}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value) => Number(value?.replace(/\$\s?|(,*)/g, "")) || 0}
                value={formData.price}
                onChange={(val) => handleInputChange("price", val || 0)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                <AppstoreOutlined className="text-blue-500" /> Danh mục sản phẩm *
              </label>
              <Select
                className="w-full shadow-sm"
                size="large"
                placeholder="Chọn danh mục để khách hàng dễ tìm"
                value={formData.type || undefined}
                onChange={(val) => handleInputChange("type", val)}
                options={CATEGORY_OPTIONS}
                showSearch
                optionFilterProp="label"
              />
            </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                  <GlobalOutlined className="text-orange-500" /> Link Affiliate (Shopee, Tik Tok...)
                </label>
                <Input 
                  placeholder="Dán link sản phẩm tại đây..." 
                  size="large"
                  value={formData.affiliateLink}
                  onChange={(e) => handleInputChange("affiliateLink", e.target.value)}
                  className="rounded-lg shadow-sm"
                />
              </div>


              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mô tả sản phẩm</label>
                <Input.TextArea 
                  placeholder="Mô tả sẽ hiển thị tại trang chi tiết sản phẩm..." 
                  rows={3}
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="rounded-xl border-gray-200"
                />
              </div>
            </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                <UploadOutlined className="text-green-500" /> Hình ảnh sản phẩm *
              </label>
              <Upload
                name="file"
                action="http://localhost:3000/api/upload"
                showUploadList={false}
                onChange={(info) => {
                  if (info.file.status === 'uploading') {
                    setIsUploadingImage(true);
                    return;
                  }
                  if (info.file.status === 'done') {
                    setIsUploadingImage(false);
                    handleInputChange("image", info.file.response.url);
                    message.success('Tải ảnh sản phẩm lên thành công!');
                  } else if (info.file.status === 'error') {
                    setIsUploadingImage(false);
                    message.error('Lỗi khi tải ảnh sản phẩm lên Cloudinary.');
                  }
                }}
              >
                <div className="w-full relative h-[216px] rounded-2xl border-2 border-dashed border-gray-200 overflow-hidden bg-gray-50 hover:bg-green-50 hover:border-green-400 transition-all flex flex-col items-center justify-center cursor-pointer group">
                  {isUploadingImage ? (
                    <div className="flex flex-col items-center gap-2">
                      <Spin size="large" />
                      <p className="text-xs text-green-600 font-bold mt-2">Đang xử lý ảnh...</p>
                    </div>
                  ) : formData.image ? (
                    <div className="relative w-full h-full group-hover:opacity-90 transition-opacity">
                      <img src={formData.image} alt="Preview" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <p className="text-white font-bold text-sm bg-black/60 px-4 py-2 rounded-full">Nhấn để thay đổi</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center select-none">
                      <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto mb-3">
                        <UploadOutlined className="text-2xl text-green-500 group-hover:scale-110 transition-transform" />
                      </div>
                      <p className="text-sm font-bold text-gray-700 group-hover:text-green-600">Nhấn để chọn ảnh</p>
                      <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">Hỗ trợ JPG, PNG, WEBP</p>
                    </div>
                  )}
                </div>
              </Upload>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <BgColorsOutlined className="text-purple-500" /> Màu sắc khả dụng *
              </label>
              <div className="grid grid-cols-5 gap-2 p-3 border rounded-xl bg-gray-50">
                {COLOR_OPTIONS.map((color) => (
                  <Tooltip title={color.name} key={color.value}>
                    <button
                      type="button"
                      onClick={() => toggleColor(color.value)}
                      className={`group relative w-full aspect-square rounded-lg border-2 transition-all flex items-center justify-center ${
                        formData.colors.includes(color.value) 
                          ? "border-pink-500 scale-105 shadow-md" 
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {formData.colors.includes(color.value) && (
                        <div className={`w-3 h-3 rounded-full ${color.value === 'white' || color.value === 'cream' ? 'bg-black' : 'bg-white shadow-sm'}`} />
                      )}
                    </button>
                  </Tooltip>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-tighter">Kích cỡ (Sizes)</label>
              <Select
                mode="multiple"
                allowClear
                className="w-full"
                placeholder="Chọn Size"
                size="large"
                value={formData.sizes}
                onChange={(vals) => handleInputChange("sizes", vals)}
              >
                {SIZE_OPTIONS.map(s => <Select.Option key={s} value={s}>{s}</Select.Option>)}
              </Select>
            </div>
          </div>
        </div>

        {/* LIVE PREVIEW SECTION */}
        <div className="bg-gradient-to-r from-gray-50 to-white p-5 rounded-3xl border border-gray-100 shadow-sm mt-4">
          <label className="block text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4">Live Preview (Giao diện khi hiển thị)</label>
          <div className="flex gap-6 items-center">
            <div className="h-28 w-24 rounded-2xl bg-gray-200 overflow-hidden shadow-inner border border-gray-100">
               {formData.image && <img src={formData.image} className="w-full h-full object-cover" />}
            </div>
            <div className="flex-1 space-y-1">
               <div className="flex items-center gap-2">
                 <AntTag color="pink" className="font-black text-[9px] rounded-md px-2 m-0 border-none shadow-sm capitalize">
                    {currentCategoryLabel || "SẢN PHẨM"}
                 </AntTag>
                 <Space size={3}>
                    {formData.colors.map(c => (
                      <div key={c} className="w-2.5 h-2.5 rounded-full border border-gray-100 shadow-sm" style={{ backgroundColor: COLOR_OPTIONS.find(o => o.value === c)?.hex }} />
                    ))}
                 </Space>
               </div>
               <h3 className="font-extrabold text-lg text-gray-900 line-clamp-1">{formData.name || "Tên Sản Phẩm Của Bạn..."}</h3>
               <div className="flex items-center gap-2">
                 <ShopOutlined className="text-pink-500 text-xs" />
                 <Text className="text-xs font-bold text-gray-500 uppercase tracking-widest">{currentBrand}</Text>
               </div>
               <div className="flex gap-1 mt-1">
                 {formData.sizes.map(s => <span key={s} className="text-[10px] font-bold px-1.5 py-0.5 bg-gray-100 text-gray-400 rounded">{s}</span>)}
               </div>
            </div>
            <div className="text-right border-l pl-6 py-2">
               <p className="text-amber-500 font-black text-xl italic tracking-tighter">{formData.price.toLocaleString()} VND</p>
               <Text type="secondary" className="text-[10px] uppercase font-bold tracking-widest">Giá niêm yết</Text>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}