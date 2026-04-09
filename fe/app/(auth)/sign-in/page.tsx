"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function SignIn() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        setLoading(true);

        const payload = {
            ...data
        };

        try {
            const res = await fetch("https://outfitslab.onrender.com/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const result = await res.json();

            console.log(result);

            login(result.access_token);

            if (res.ok) {
                router.push("/");
            }

        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    };

    return (
        <div className="w-full max-w-md mx-auto px-6 flex flex-col shadow-2xl shadow-[#F5F5FF]/50 rounded-3xl">
            <div className="mt-4 flex justify-center pb-12">
                <div className="text-center">
                    <div className="h-[74px] flex items-center justify-center">
                        <Link href={"/product"}>
                            <img
                                src="/images/Logo.png"
                                alt="OutfitsLab"
                                width={300}
                                height={60}
                                className="object-contain" />
                        </Link>

                    </div>

                    <h1 className="heading mt-4 text-3xl font-bold">
                        Welcome back
                    </h1>
                    <p className="heading text-gray-500 text-[16px] mb-6">
                        Sign In to continue to OutfitsLab
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-10 flex flex-col items-center">
                        <div className="w-[400px] text-left">
                            <label className="heading block mb-2 text-[14px] font-bold">
                                Email Address
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
                                    placeholder="you@example.com"
                                    className="w-full h-14 pl-14 pr-5 rounded-2xl border border-[#D5DBE4] focus:border-[#515152] focus:ring-4 focus:ring-[#4D4D4D]/10 outline-none text-base transition-all"
                                    required
                                />
                            </div>
                        </div>
                        <div className="w-[400px] text-left mt-4">
                            <label className="heading block mb-2 text-[14px] font-bold">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#2C2C2C]">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5 16.477 5 20.268 7.943 21.542 12 20.268 16.057 16.477 19 12 19 7.523 19 3.732 16.057 2.458 12z" />
                                    </svg>
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full h-14 pl-14 pr-14 rounded-2xl border border-[#D5DBE4] focus:border-[#515152] focus:ring-4 focus:ring-[#4D4D4D]/10 outline-none text-base transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex w-[400px] items-center justify-center">
                            <p className=" text-[14px] text-[#FF00A8] cursor-pointer hover:underline">
                                Forgot password?
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="heading w-[400px] h-16 mt-8 bg-gradient-to-r from-[#FF00A8] to-[#990065] text-white font-semibold text-lg rounded-2xl shadow-lg shadow-[#FF00A8]/40 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.985] transition-all duration-200 flex items-center justify-center gap-3"
                        >
                            Đăng nhập
                            <span className="text-2xl">→</span>
                        </button>

                    </form>


                    <div className="relative my-10">
                        <div className="absolute inset-0 flex flex-col justify-center items-center">
                            <div className="w-[400px] border-t border-[#FA649A]"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-white px-8 text-sm text-[#4D4D4D]">Or sign up with</span>
                        </div>
                    </div>

                    <div className=" grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            className="w-[190px] h-14 border-2 border-[#222222] rounded-2xl hover:bg-[#999DA2] bg-black flex items-center justify-center gap-3 font-bold text-[#FFFFFF] transition-all active:scale-95"
                        >
                            <span className="heading text-xl">G</span>
                            Google
                        </button>
                        <button
                            type="button"
                            className="w-[190px] h-14 border-2 border-[#222222] rounded-2xl hover:bg-[#999DA2] bg-black flex items-center justify-center gap-3 font-bold text-[#FFFFFF] transition-all active:scale-95"
                        >
                            <span className="heading text-xl text-blue-600">f</span>
                            Facebook
                        </button>
                    </div>
                    <p className="mt-8 mb-6 text-[14px] text-[#4D4D4D] text-base">
                        Không có tài khoản?{" "}
                        <a href="/sign-up"
                            className="heading ml-1 text-[#FA649A] hover:underline">
                            Create one
                        </a>
                    </p>

                    <section className="flex flex-col items-center py-10">
                        <div className="w-[400px] border border-[#FFF0F5] bg-[#FFF5F7] rounded-[16px] p-6">
                            <h1 className="text-[#4d4d4d] text-[14px]">
                                Want to sell on OutfitsLab?
                            </h1>
                            <Link href="/become">
                                <button className="heading mt-4 w-[200px] h-14 rounded-full hover:bg-pink-300 bg-pink-500 text-white">
                                    Become a Seller
                                </button>
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

