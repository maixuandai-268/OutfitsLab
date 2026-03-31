"use client";

import Link from "next/link";
import { notification } from "antd";

export default function SignUp() {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const payload = { ...data };

        try {
            const response = await fetch("https://outfitslab.onrender.com/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || "Đăng ký thất bại");
            }

            notification.success({
                message: "Đăng ký thành công",
                description: "Tài khoản của bạn đã được tạo. Bạn có thể đăng nhập ngay bây giờ.",
                duration: 4,
            });

            setTimeout(() => {
                window.location.href = "/sign-in";
            }, 2000);

        } catch (error) {
            console.error("Registration error:", error);

            notification.error({
                message: "Đăng ký thất bại",
                description:
                    error instanceof Error
                        ? error.message
                        : "Đã có lỗi xảy ra khi tạo tài khoản. Vui lòng thử lại sau.",
                duration: 5,
            });
        }
    };

    return (
        <div className="w-full max-w-md mx-auto px-6 flex flex-col shadow-2xl shadow-[#F5F5FF]/50 rounded-3xl">
            <main className="mt-4 flex justify-center pb-12">
                <div className="text-center">
                    <h1 className="heading mb-2 mt-4 text-3xl font-bold tracking-tight text-[#2C2C2C]">
                        Tạo tài khoản OutfitsLab
                    </h1>
                    <p className="heading mb-10 text-base text-gray-500">
                        Tham gia OutfitsLab và bắt đầu hành trình của bạn
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-8 mt-8">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="heading block mb-2 text-sm font-semibold text-left text-[#2C2C2C]">
                                    Họ
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        placeholder="Nguyễn Văn"
                                        className="w-full h-14 pl-5 pr-5 rounded-2xl border border-[#D5DBE4] focus:border-[#515152] focus:ring-4 focus:ring-[#4D4D4D]/10 outline-none text-base transition-all"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="lastName" className="heading block mb-2 text-sm font-semibold text-left text-[#2C2C2C]">
                                    Tên
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        placeholder="A"
                                        className="w-full h-14 pl-5 pr-5 rounded-2xl border border-[#D5DBE4] focus:border-[#515152] focus:ring-4 focus:ring-[#4D4D4D]/10 outline-none text-base transition-all"
                                        required
                                    />
                                </div>
                            </div>
                        </div>


                        <div>
                            <label htmlFor="email" className="heading block mb-2 text-sm font-semibold text-left text-[#2C2C2C]">
                                Tên hiển thị
                            </label>
                            <div className="relative">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#2C2C2C]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                </div>
                                <input
                                    type="text"
                                    id="displayName"
                                    name="displayName"
                                    placeholder="Tên hiển thị của bạn"
                                    className="w-full h-14 pl-14 pr-5 rounded-2xl border border-[#D5DBE4] focus:border-[#515152] focus:ring-4 focus:ring-[#4D4D4D]/10 outline-none text-base transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="heading block mb-2 text-sm font-semibold text-left text-[#2C2C2C]">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#2C2C2C]">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2.01 2.01 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="you@gmail.com"
                                    className="w-full h-14 pl-14 pr-5 rounded-2xl border border-[#D5DBE4] focus:border-[#515152] focus:ring-4 focus:ring-[#4D4D4D]/10 outline-none text-base transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="phone" className="heading block mb-2 text-sm font-semibold text-left text-[#2C2C2C]">
                                Số điện thoại
                            </label>
                            <div className="relative">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#2C2C2C]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5 lucide lucide-phone-icon lucide-phone"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233_14_14_0_0_0_6.392_6.384" /></svg>
                                </div>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="+84 123 456 789"
                                    className="w-full h-14 pl-14 pr-5 rounded-2xl border border-[#D5DBE4] focus:border-[#515152] focus:ring-4 focus:ring-[#4D4D4D]/10 outline-none text-base transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="heading block mb-2 text-sm font-semibold text-left text-[#2C2C2C]">
                                Mật khẩu
                            </label>
                            <div className="relative">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#2C2C2C]">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5 16.477 5 20.268 7.943 21.542 12 20.268 16.057 16.477 19 12 19 7.523 19 3.732 16.057 2.458 12z" />
                                    </svg>
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="••••••••"
                                    className="w-full h-14 pl-14 pr-14 rounded-2xl border border-[#D5DBE4] focus:border-[#515152] focus:ring-4 focus:ring-[#4D4D4D]/10 outline-none text-base transition-all"
                                    required
                                />

                            </div>
                            <p className="text-xs text-gray-500 mt-2 text-left">Nhập ít nhất 8 ký tự</p>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="heading block mb-2 text-sm font-semibold text-left text-[#2C2C2C]">
                                Xác nhận mật khẩu
                            </label>
                            <div className="relative">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#2C2C2C]">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5 16.477 5 20.268 7.943 21.542 12 20.268 16.057 16.477 19 12 19 7.523 19 3.732 16.057 2.458 12z" />
                                    </svg>
                                </div>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="••••••••"
                                    className="w-full h-14 pl-14 pr-14 rounded-2xl border border-[#D5DBE4] focus:border-[#515152] focus:ring-4 focus:ring-[#4D4D4D]/10 outline-none text-base transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="heading w-full h-16 bg-gradient-to-r from-[#FF00A8] to-[#990065] text-white font-semibold text-lg rounded-2xl shadow-lg shadow-[#FF00A8]/40 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.985] transition-all duration-200 flex items-center justify-center gap-3"
                        >
                            Tạo tài khoản
                            <span className="text-2xl">→</span>
                        </button>
                    </form>

                    <div className="relative my-10">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[#FA649A]"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-white px-8 text-sm text-[#4D4D4D]">Đăng ký với</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            className="h-14 border-2 border-[#222222] rounded-2xl hover:bg-[#999DA2] bg-black flex items-center justify-center gap-3 font-bold text-[#FFFFFF] transition-all active:scale-95"
                        >
                            <span className="heading text-xl">G</span>
                            Google
                        </button>
                        <button
                            type="button"
                            className="h-14 border-2 border-[#222222] rounded-2xl hover:bg-[#999DA2] bg-black flex items-center justify-center gap-3 font-bold text-[#FFFFFF] transition-all active:scale-95"
                        >
                            <span className="heading text-xl text-blue-600">f</span>
                            Facebook
                        </button>
                    </div>

                    <p className="mt-10 text-[#4D4D4D] text-base">
                        Bạn đã có tài khoản?{" "}
                        <a href="/sign-in" className="heading text-[#FA649A] font-semibold hover:underline">Đăng nhập</a>
                    </p>
                </div>
            </main>
        </div>
    );
}