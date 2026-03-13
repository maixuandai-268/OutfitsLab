import { useState } from "react";

interface StepStoreProps {
    storeName: string;
    storeDescription: string;
    primaryCategory: string;
    onChange: (field: string, value: string) => void;
    nextStep: () => void;
    prevStep: () => void;
}

export default function StepStore({
    storeName,
    storeDescription,
    primaryCategory,
    onChange,
    nextStep,
    prevStep
}: StepStoreProps) {

    const [rememberMe, setRememberMe] = useState(false);

    return (
        <div className="mt-0.5 bg-white">
            <div className="w-full flex flex-col">

                <p className="ml-[348px] mt-3 text-[36px] font-bold text-[#262626]">
                    Mở cửa hàng của bạn trên OutfitsLab
                </p>
                <p className="ml-[348px] mt-1 mb-6 text-[16px] text-[#4d4d4d]">
                    Tham gia cùng hàng ngàn nhà sáng tạo khác và bắt đầu bán các thiết kế của bạn.
                </p>
            </div>

            <div className="w-full h-[89px] bg-white flex flex-col justify-center">
                <div className="ml-[473px] flex items-center gap-1">

                    <div className="w-[40px] h-[40px] rounded-full bg-[#FFF4E6] text-white flex items-center justify-center">1</div>
                    <span className="text-[#262626]">Thông tin của bạn</span>

                    <div className="ml-4 mr-4 w-[32px] h-[2px] bg-[#FFE9CC]"></div>

                    <div className="w-[40px] h-[40px] rounded-full bg-[#D19F42] text-white flex items-center justify-center">2</div>
                    <span className="text-[#D19F42]">Chi tiết cửa hàng</span>

                    <div className="ml-4 mr-4 w-[32px] h-[2px] bg-[#FFE9CC]"></div>

                    <div className="w-[40px] h-[40px] rounded-full bg-[#008080] text-white flex items-center justify-center">3</div>
                    <span className="text-[#262626]">Xác nhận thông tin</span>
                </div>
            </div>

            <div className="min-h-screen border border-[#FFE9CC] bg-gradient-to-r from-[#FFEAFD] to-[#BFFFF7] p-4">
                <div className="flex justify-center items-center mt-10">
                    <div className="w-[832px] border border-[#FFE9CC] rounded-[24px] bg-white p-10">

                        <h1 className="font-semibold text-[24px]">Thông tin cửa hàng</h1>

                        <div className="mt-4">
                            <label className="font-semibold text-[14px]">Tên cửa hàng</label>
                            <input
                                type="text"
                                value={storeName}
                                onChange={(e) => onChange("storeName", e.target.value)}
                                placeholder="Cửa hàng thời trang của tôi"
                                className="w-full h-[50px] border border-[#FFE9CC] rounded-2xl bg-[#FFFBF5] pl-4 pr-4"
                            />
                            <p className="mt-4 text-black text-[12px]">
                                Đây là tên cửa hàng của bạn và sẽ hiển thị trên trang cửa hàng của bạn. Bạn có thể thay đổi nó sau này.
                            </p>
                        </div>

                        <div className="mt-4">
                            <label className="text-[14px] font-semibold">Mô tả cửa hàng</label>
                            <textarea
                                value={storeDescription}
                                onChange={(e) => onChange("storeDescription", e.target.value)}
                                placeholder="Mô tả về cửa hàng của bạn..."
                                className="w-full h-[146px] border border-[#FFE9CC] rounded-2xl bg-[#FFFBF5] p-4"
                            />
                            <p className="mt-2 text-gray-500 text-[12px]">500 chữ</p>
                        </div>

                        <div className="mt-4">
                            <label className="text-[14px] font-semibold">Danh mục chính</label>

                            <div className="relative w-full">
                                <select
                                    value={primaryCategory}
                                    onChange={(e) => onChange("primaryCategory", e.target.value)}
                                    className="w-full h-[50px] border border-[#FFE9CC] rounded-2xl bg-[#d9d9d9] pl-4 pr-8 appearance-none cursor-pointer"
                                >
                                    <option value="" disabled>Lựa chọn của bạn...</option>
                                    <option value="clothing">Thời trang</option>
                                    <option value="accessories">Phụ kiện</option>
                                    <option value="shoes">Giày dép</option>
                                    <option value="bags">Túi xách</option>
                                </select>

                                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                    ▼
                                </span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="text-[14px] font-semibold">Logo cửa hàng</label>
                            <div className="w-full h-[152px] mt-2 border-2 border-[#FFE9CC] rounded-xl bg-[#FFF4E6] flex flex-col items-center justify-center cursor-pointer">
                                <p className="mt-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-upload-icon lucide-upload"><path d="M12 3v12" /><path d="m17 8-5-5-5 5" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /></svg></p>
                                <p className="text-[14px] font-medium">
                                    Click to upload
                                </p>
                                <p className="text-[12px] text-gray-600">
                                    Định dạng PNG, JPG dung lượng tối đa 5MB (nên chọn định dạng vuông).
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 p-4 bg-[#FFF4E6] rounded-2xl flex items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-4 h-4 border border-[#666666] mr-2 cursor-pointer"
                            />
                            <label
                                htmlFor="remember"
                                className="text-[14px] text-[#4d4d4d] cursor-pointer"
                            >
                                Tôi đồng ý với
                                <span className="text-[#D19F42] ml-1">Điều khoản Dịch vụ</span>
                                <span className="mx-1">và</span>
                                <span className="text-[#D19F42]">Thỏa thuận Người bán</span>
                            </label>
                        </div>
                        <div className="flex justify-between mt-6">
                            <button
                                type="button"
                                onClick={prevStep}
                                className="w-[180px] h-[50px] border border-[#D19F42] text-[#D19F42] rounded-full font-medium"
                            >
                                Quay lại
                            </button>
                            <button
                                type="button"
                                disabled={!rememberMe}
                                onClick={nextStep}
                                className={`w-[220px] h-[50px] rounded-full text-white font-medium 
                                ${rememberMe ? "bg-[#D19F42]" : "bg-[#E5CFA2] cursor-not-allowed"}`}
                            >
                                Tạo Cửa Hàng
                            </button>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}