"use client";

import Link from "antd/es/typography/Link";
import { useState } from "react";
export default function ResendEmailPage() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const handleResend = () => {
        if (!email) return;
        console.log("Resend email to:", email);
        setSent(true);
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#FFEAFD] to-[#BFFFF7]">
            <div className="w-[420px] bg-white p-8 rounded-2xl border border-[#FFE9CC]">
                <h1 className="text-2xl font-semibold text-center">
                    Gửi lại email xác nhận
                </h1>
                <p className="text-sm text-gray-500 text-center mt-2">
                    Nhập email của bạn để nhận lại email xác nhận cửa hàng
                </p>
                <input
                    type="email"
                    placeholder="you@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-[50px] border border-[#FFE9CC] rounded-xl px-4 mt-6 bg-[#FFFBF5]"
                />
                <button
                    onClick={handleResend}
                    className="w-full h-[50px] mt-4 rounded-full bg-[#D19F42] text-white"
                >
                    Gửi lại email
                </button>
                {sent && (
                    <div className="flex flex-col items-center mt-3 gap-3">
                        <p className="text-green-600 text-sm text-center">
                            Email đã được gửi lại!
                        </p>
                        <Link
                            href="/become?step=3"
                            className="px-6 py-2 rounded-full border border-[#D19F42] text-[#D19F42] hover:bg-[#FFF4E6] text-sm"
                        >
                            Quay lại trang xác nhận
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}