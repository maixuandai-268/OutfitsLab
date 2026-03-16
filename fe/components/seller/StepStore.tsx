"use client";

import { useState } from "react";

interface StepStoreProps {
    nextStep: () => void;
    prevStep: () => void;
}

export default function StepStore({ nextStep, prevStep }: StepStoreProps) {

    const [storeName, setStoreName] = useState("");
    const [storeDescription, setStoreDescription] = useState("");
    const [primaryCategory, setPrimaryCategory] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const isFormValid =
        storeName.trim() !== "" &&
        storeDescription.trim() !== "" &&
        primaryCategory.trim() !== "" &&
        rememberMe;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!isFormValid) return;

        nextStep();
    };

    return (
        <div className="mt-0.5 bg-white">

            {/* Title */}
            <div className="w-full flex flex-col">
                <p className="ml-[348px] mt-3 text-[36px] font-bold text-[#262626]">
                    Mở cửa hàng của bạn trên OutfitsLab
                </p>
                <p className="ml-[348px] mt-1 mb-6 text-[16px] text-[#4d4d4d]">
                    Tham gia cùng hàng ngàn nhà sáng tạo khác và bắt đầu bán các thiết kế của bạn.
                </p>
            </div>

            {/* Step */}
            <div className="w-full h-[89px] bg-white flex flex-col justify-center">
                <div className="ml-[473px] flex items-center gap-1">

                    <div className="w-[40px] h-[40px] rounded-full bg-[#FFF4E6] flex items-center justify-center">
                        1
                    </div>
                    <span className="text-[#262626]">Thông tin của bạn</span>

                    <div className="ml-4 mr-4 w-[32px] h-[2px] bg-[#FFE9CC]"></div>

                    <div className="w-[40px] h-[40px] rounded-full bg-[#D19F42] text-white flex items-center justify-center">
                        2
                    </div>
                    <span className="text-[#D19F42]">Chi tiết cửa hàng</span>

                    <div className="ml-4 mr-4 w-[32px] h-[2px] bg-[#FFE9CC]"></div>

                    <div className="w-[40px] h-[40px] rounded-full bg-[#008080] text-white flex items-center justify-center">
                        3
                    </div>
                    <span className="text-[#262626]">Xác nhận thông tin</span>

                </div>
            </div>

            {/* Form */}
            <div className="min-h-screen border border-[#FFE9CC] bg-gradient-to-r from-[#FFEAFD] to-[#BFFFF7] p-4">

                <div className="flex justify-center items-center mt-10">

                    <div className="w-[832px] border border-[#FFE9CC] rounded-[24px] bg-white p-10">

                        <h1 className="font-semibold text-[24px]">Thông tin cửa hàng</h1>

                        <form onSubmit={handleSubmit}>

                            {/* Store name */}
                            <div className="mt-4">
                                <label className="font-semibold text-[14px]">Tên cửa hàng</label>

                                <input
                                    type="text"
                                    value={storeName}
                                    required
                                    onChange={(e) => setStoreName(e.target.value)}
                                    placeholder="Cửa hàng thời trang của tôi"
                                    className="w-full h-[50px] border border-[#FFE9CC] rounded-2xl bg-[#FFFBF5] px-4"
                                />

                                <p className="mt-2 text-[12px]">
                                    Đây là tên cửa hàng hiển thị trên trang cửa hàng của bạn.
                                </p>
                            </div>

                            {/* Description */}
                            <div className="mt-4">

                                <label className="text-[14px] font-semibold">
                                    Mô tả cửa hàng
                                </label>

                                <textarea
                                    value={storeDescription}
                                    required
                                    onChange={(e) => setStoreDescription(e.target.value)}
                                    placeholder="Mô tả về cửa hàng của bạn..."
                                    className="w-full h-[146px] border border-[#FFE9CC] rounded-2xl bg-[#FFFBF5] p-4"
                                />

                            </div>

                            {/* Category */}
                            <div className="mt-4">

                                <label className="text-[14px] font-semibold">
                                    Danh mục chính
                                </label>

                                <select
                                    value={primaryCategory}
                                    required
                                    onChange={(e) => setPrimaryCategory(e.target.value)}
                                    className="w-full h-[50px] border border-[#FFE9CC] rounded-2xl bg-[#FFFBF5] px-4 cursor-pointer"
                                >
                                    <option value="">Lựa chọn của bạn...</option>
                                    <option value="clothing">Thời trang</option>
                                    <option value="accessories">Phụ kiện</option>
                                    <option value="shoes">Giày dép</option>
                                    <option value="bags">Túi xách</option>
                                </select>

                            </div>

                            {/* Terms */}
                            <div className="mt-4 p-4 bg-[#FFF4E6] rounded-2xl flex items-center">

                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="mr-2"
                                />

                                <span className="text-[14px]">
                                    Tôi đồng ý với
                                    <span className="text-[#D19F42] ml-1"> Điều khoản dịch vụ </span>
                                    và
                                    <span className="text-[#D19F42] ml-1"> Thỏa thuận người bán</span>
                                </span>

                            </div>

                            {/* Buttons */}
                            <div className="flex justify-between mt-6">

                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="w-[180px] h-[50px] border border-[#D19F42] text-[#D19F42] rounded-full"
                                >
                                    Quay lại
                                </button>

                                <button
                                    type="submit"
                                    disabled={!isFormValid}
                                    className={`w-[220px] h-[50px] rounded-full text-white
                  ${isFormValid
                                            ? "bg-[#D19F42]"
                                            : "bg-[#E5CFA2] cursor-not-allowed"
                                        }`}
                                >
                                    Tạo Cửa Hàng
                                </button>

                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}