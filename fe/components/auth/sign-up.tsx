"use client";

import { useState, FormEvent } from "react";

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreed, setAgreed] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const payload = { ...data };


        fetch("http://localhost:3000/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }).then(res => res.json()).then(console.log);
    };

    return (
        <div className="w-full max-w-md px-6 bg-white flex flex-col shadow-2xl shadow-[#FFE9CC]/50 rounded-3xl">
            <main className="mt-[85px] flex justify-center pb-12">
                <div className="w-full max-w-[448px] text-center">

                    <h1 className="mb-2 text-3xl font-bold tracking-tight text-[#2C2C2C]">
                        Create an Account
                    </h1>
                    <p className="mb-10 text-base text-gray-500">
                        Join OutfitsLab and start your style journey
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block mb-2 text-sm font-semibold text-left text-[#2C2C2C]">
                                    First Name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        placeholder="John"
                                        className="w-full h-14 pl-5 pr-5 rounded-2xl border border-[#FFE9CC] focus:border-[#D4A23F] focus:ring-4 focus:ring-[#D4A23F]/10 outline-none text-base transition-all"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block mb-2 text-sm font-semibold text-left text-[#2C2C2C]">
                                    Last Name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        placeholder="Doe"
                                        className="w-full h-14 pl-5 pr-5 rounded-2xl border border-[#FFE9CC] focus:border-[#D4A23F] focus:ring-4 focus:ring-[#D4A23F]/10 outline-none text-base transition-all"
                                        required
                                    />
                                </div>
                            </div>
                        </div>


                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-semibold text-left text-[#2C2C2C]">
                                Tên hiển thị
                            </label>
                            <div className="relative">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#D4A23F]">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2.01 2.01 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="displayName"
                                    name="displayName"
                                    placeholder="your display name"
                                    className="w-full h-14 pl-14 pr-5 rounded-2xl border border-[#FFE9CC] focus:border-[#D4A23F] focus:ring-4 focus:ring-[#D4A23F]/10 outline-none text-base transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-semibold text-left text-[#2C2C2C]">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#D4A23F]">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2.01 2.01 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    className="w-full h-14 pl-14 pr-5 rounded-2xl border border-[#FFE9CC] focus:border-[#D4A23F] focus:ring-4 focus:ring-[#D4A23F]/10 outline-none text-base transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="phone" className="block mb-2 text-sm font-semibold text-left text-[#2C2C2C]">
                                Phone Number
                            </label>
                            <div className="relative">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#D4A23F]">
                                    
                                </div>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="+84 123 456 789"
                                    className="w-full h-14 pl-14 pr-5 rounded-2xl border border-[#FFE9CC] focus:border-[#D4A23F] focus:ring-4 focus:ring-[#D4A23F]/10 outline-none text-base transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-semibold text-left text-[#2C2C2C]">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#D4A23F]">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5 16.477 5 20.268 7.943 21.542 12 20.268 16.057 16.477 19 12 19 7.523 19 3.732 16.057 2.458 12z" />
                                    </svg>
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    placeholder="••••••••"
                                    className="w-full h-14 pl-14 pr-14 rounded-2xl border border-[#FFE9CC] focus:border-[#D4A23F] focus:ring-4 focus:ring-[#D4A23F]/10 outline-none text-base transition-all"
                                    required
                                />
                                
                            </div>
                            <p className="text-xs text-gray-500 mt-2 text-left">At least 8 characters</p>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-semibold text-left text-[#2C2C2C]">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#D4A23F]">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5 16.477 5 20.268 7.943 21.542 12 20.268 16.057 16.477 19 12 19 7.523 19 3.732 16.057 2.458 12z" />
                                    </svg>
                                </div>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="••••••••"
                                    className="w-full h-14 pl-14 pr-14 rounded-2xl border border-[#FFE9CC] focus:border-[#D4A23F] focus:ring-4 focus:ring-[#D4A23F]/10 outline-none text-base transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full h-16 bg-gradient-to-r from-[#BD8928] to-[#D4A23F] text-white font-semibold text-lg rounded-2xl shadow-lg shadow-[#D4A23F]/40 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.985] transition-all duration-200 flex items-center justify-center gap-3"
                        >
                            Create Account
                            <span className="text-2xl">→</span>
                        </button>
                    </form>

                    <div className="relative my-10">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[#FFE9CC]"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-white px-8 text-sm text-[#4D4D4D]">Or sign up with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            className="h-14 border-2 border-[#FFE9CC] rounded-2xl hover:bg-[#FFF4E6] flex items-center justify-center gap-3 font-semibold text-[#2C2C2C] transition-all active:scale-95"
                        >
                            <span className="text-xl">G</span>
                            Google
                        </button>
                        <button
                            type="button"
                            className="h-14 border-2 border-[#FFE9CC] rounded-2xl hover:bg-[#FFF4E6] flex items-center justify-center gap-3 font-semibold text-[#2C2C2C] transition-all active:scale-95"
                        >
                            <span className="text-xl text-blue-600">f</span>
                            Facebook
                        </button>
                    </div>

                    <p className="mt-10 text-[#4D4D4D] text-base">
                        Already have an account?{" "}
                        <a href="/signin" className="text-[#D4A23F] font-semibold hover:underline">Sign In</a>
                    </p>
                </div>
            </main>
        </div>
    );
}