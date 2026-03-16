"use client";

import Link from "next/link";
interface StepConfirmProps {
    firstName: string;
    email: string;
    storeName: string;
    prevStep: () => void;
}
export default function StepConfirm({
    firstName,
    email,
    storeName,
    prevStep
}: StepConfirmProps) {
    return (
        <div className="bg-white mt-0.5">
            <div className="w-full flex flex-col">
                <p className="ml-[348px] mt-3 text-[36px] font-bold text-[#262626]">
                    Mở cửa hàng của bạn trên OutfitsLab
                </p>
                <p className="ml-[348px] mt-1 mb-6 text-[16px] text-[#4d4d4d]">
                    Tham gia cùng hàng ngàn nhà sáng tạo khác và bắt đầu bán các thiết kế của bạn.
                </p>
            </div>
            <div className=" w-full h-[89px] bg-white flex flex-col justify-center">
                <div className="ml-[473px] flex items-center gap-1">
                    <div className="w-[40px] h-[40px] rounded-full bg-[#FFF4E6] flex items-center justify-center">
                        1
                    </div>
                    <span className="text-[#262626]">
                        Thông tin của bạn
                    </span>
                    <div className="ml-4 mr-4 w-[32px] h-[2px] bg-[#FFE9CC]"></div>
                    <div className="w-[40px] h-[40px] rounded-full bg-[#FFF4E6] flex items-center justify-center">
                        2
                    </div>
                    <span className="text-[#262626]">
                        Chi tiết Cửa hàng
                    </span>
                    <div className="ml-4 mr-4 w-[32px] h-[2px] bg-[#FFE9CC]"></div>
                    <div className="w-[40px] h-[40px] rounded-full bg-[#D19F42] text-white flex items-center justify-center">
                        3
                    </div>
                    <span className="text-[#D19F42]">
                        Xác nhận thông tin
                    </span>
                </div>
            </div>
            <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-[#FFEAFD] to-[#BFFFF7]">
                <div className="w-16 h-16 mt-10 flex items-center justify-center rounded-full bg-teal-600 text-black">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                        <path d="m9 11 3 3L22 4" />

                    </svg>
                </div>
                <h2 className="text-2xl font-semibold mt-6">
                    Chào mừng bạn đến với OutfitsLab!
                </h2>
                <p className="text-gray-500 mt-2">
                    Cửa hàng
                    <span className="font-medium"> "{storeName}" </span>
                    của bạn đã được tạo thành công.
                </p>
                <div className="mt-6 border border-orange-200 rounded-xl p-6 text-center w-[420px] bg-white">
                    <p className="text-gray-400 text-sm mb-1">
                        Xác nhận Email
                    </p>
                    <p className="font-semibold mb-2">
                        {email}
                    </p>
                    <p className="text-gray-400 text-sm">
                        Hãy kiểm tra hộp thư đến của bạn và nhấp vào liên kết xác nhận để kích hoạt cửa hàng của bạn.
                    </p>
                </div>
                <div className="flex flex-col gap-4 mt-6 w-[420px]">
                    <button className="bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-full font-medium">
                        Bắt đầu thêm sản phẩm
                    </button>
                    <Link
                        href="/"
                        className="border border-yellow-600 text-yellow-600 py-3 rounded-full font-medium hover:bg-yellow-50 text-center"
                    >
                        Quay lại Trang Chủ
                    </Link>
                </div>
                <div className="bg-orange-50 rounded-xl p-6 mt-8 w-[420px]">
                    <ul className="text-sm text-gray-600 space-y-2">
                        <li>✅ Hoàn tất thiết lập cửa hàng của bạn</li>
                        <li>→ Tải lên các mô hình 3D và sản phẩm đầu tiên của bạn</li>
                        <li>→ Thiết lập thương hiệu cửa hàng của bạn</li>
                        <li>→ Ra mắt và bắt đầu bán hàng!</li>
                    </ul>
                </div>
                <Link
                    href="/become/resend"
                    className="text-sm text-[#D19F42] underline mt-3 block"
                >
                    Tôi không nhận được email?
                </Link>
            </div>
        </div>
    );
}