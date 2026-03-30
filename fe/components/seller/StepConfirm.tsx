"use client";

import Link from "next/link";
import { useState } from "react";

interface StepConfirmProps {
    firstName: string;
    email: string;
    storeName: string;
    prevStep: () => void;
    onSubmit: () => Promise<void>;
    loading: boolean;
    shopId?: number | null;
}

export default function StepConfirm({
    firstName,
    email,
    storeName,
    prevStep,
    onSubmit,
    loading,
    shopId
}: StepConfirmProps) {
    const [isSuccess, setIsSuccess] = useState(false);

    const handleFinalSubmit = async () => {
        try {
            await onSubmit(); 
            setIsSuccess(true); 
        } catch (error) {
            console.error("Lỗi khi tạo shop:", error);
        }
    };

    if (isSuccess) {
        return (
            <div className="bg-white mt-0.5">
                <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-[#FFEAFD] to-[#BFFFF7] py-10">
                    <div className="w-16 h-16 mt-10 flex items-center justify-center rounded-full bg-teal-600 text-white shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6L9 17l-5-5" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold mt-6 text-[#262626]">
                        Chào mừng {firstName} đến với OutfitsLab!
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Cửa hàng <span className="font-bold text-[#D19F42]"> "{storeName}" </span> của bạn đã được khởi tạo.
                    </p>

                    <div className="mt-6 border border-orange-200 rounded-2xl p-6 text-center w-[420px] bg-white shadow-sm">
                        <p className="text-gray-400 text-sm mb-1">Email quản lý</p>
                        <p className="font-semibold mb-2">{email}</p>
                        <p className="text-gray-400 text-sm">
                            Hệ thống đã cập nhật quyền hạn của bạn thành "Người bán". Hãy bắt đầu hành trình của mình ngay!
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 mt-6 w-[420px]">
                        <Link href={`/shop_dashboard/${shopId}`} className="bg-[#D19F42] hover:bg-[#BD8928] text-white py-3 rounded-full font-medium text-center transition-all">
                            Truy cập vào Dashboard Shop
                        </Link>
                        <Link 
                            href="/" 
                            className="bg-[#D19F42] hover:bg-[#BD8928] text-white py-3 rounded-full font-medium text-center transition-all"
                        >
                            Về trang chủ chờ Admin phê duyệt
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white mt-0.5">
            <div className="w-full flex flex-col px-[348px] py-6">
                <p className="text-[36px] font-bold text-[#262626]">Xác nhận thông tin</p>
                <p className="text-[16px] text-[#4d4d4d]">Vui lòng kiểm tra kỹ thông tin trước khi mở cửa hàng.</p>
            </div>

            <div className="w-full h-[89px] bg-white flex justify-center items-center">
                <div className="flex items-center gap-1">
                    <div className="w-[40px] h-[40px] rounded-full bg-[#FFF4E6] flex items-center justify-center text-[#D19F42]">✓</div>
                    <div className="w-[32px] h-[2px] bg-[#FFE9CC] mx-2"></div>
                    <div className="w-[40px] h-[40px] rounded-full bg-[#FFF4E6] flex items-center justify-center text-[#D19F42]">✓</div>
                    <div className="w-[32px] h-[2px] bg-[#FFE9CC] mx-2"></div>
                    <div className="w-[40px] h-[40px] rounded-full bg-[#D19F42] text-white flex items-center justify-center font-bold">3</div>
                    <span className="text-[#D19F42] ml-2 font-medium">Hoàn tất</span>
                </div>
            </div>

            <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-[#FFEAFD] to-[#BFFFF7] py-10">
                <div className="w-[600px] bg-white border border-[#FFE9CC] rounded-[24px] p-10 shadow-xl">
                    <h2 className="text-xl font-bold mb-6 border-b pb-4">Tóm tắt cửa hàng</h2>
                    
                    <div className="space-y-4 text-left">
                        <div>
                            <p className="text-sm text-gray-400">Tên cửa hàng</p>
                            <p className="text-lg font-bold text-[#D19F42]">{storeName}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Email liên hệ</p>
                            <p className="font-semibold">{email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Chủ sở hữu</p>
                            <p className="font-semibold">{firstName}</p>
                        </div>
                    </div>

                    <div className="mt-8 p-4 bg-blue-50 text-blue-700 text-sm rounded-xl border border-blue-100 italic">
                        Lưu ý: Sau khi xác nhận, tài khoản của bạn sẽ được cấp quyền "Shop". Bạn có thể đăng sản phẩm ngay lập tức.
                    </div>

                    <div className="flex gap-4 mt-10">
                        <button 
                            onClick={prevStep} 
                            disabled={loading}
                            className="flex-1 h-12 border border-[#D19F42] text-[#D19F42] rounded-full font-bold disabled:opacity-50"
                        >
                            Quay lại
                        </button>
                        <button 
                            onClick={handleFinalSubmit}
                            disabled={loading}
                            className="flex-[2] h-12 bg-[#D19F42] text-white rounded-full font-bold shadow-lg hover:bg-[#BD8928] transition-all disabled:bg-gray-400"
                        >
                            {loading ? "Đang xử lý..." : "Xác nhận & Mở Shop ngay →"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}