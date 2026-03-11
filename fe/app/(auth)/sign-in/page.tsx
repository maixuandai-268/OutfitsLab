"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const payload = {
            ...data,
            rememberMe
        };

        try {
            const res = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const result = await res.json();

            console.log(result);

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

                    {/* LOGO */}

                    <div className="h-[74px] flex items-center justify-center">
                        <img
                            src="/images/logo.png"
                            alt="OutfitsLab"
                            width={300}
                            height={60}
                            className="object-contain"
                        />
                    </div>

                    {/* TITLE */}

                    <h1 className="mt-4 text-3xl font-bold">
                        Welcome back
                    </h1>

                    <p className="text-gray-500 text-[16px] mb-6">
                        Sign In to continue to OutfitsLab
                    </p>

                    {/* FORM */}

                    <form
                        onSubmit={handleSubmit}
                        className="mt-10 flex flex-col items-center"
                    >

                        {/* EMAIL */}

                        <div className="w-[400px] text-left">
                            <label className="block mb-2 text-[14px] font-bold">
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                required
                                className="w-full h-14 pl-5 pr-5 border border-[#FFE9CC] rounded-[16px]"
                            />
                        </div>

                        {/* PASSWORD */}

                        <div className="w-[400px] text-left mt-4">

                            <label className="block mb-2 text-[14px] font-bold">
                                Password
                            </label>

                            <div className="relative">

                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    required
                                    className="w-full h-14 pl-5 pr-14 border border-[#FFE9CC] rounded-[16px]"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>

                            </div>

                        </div>

                        {/* REMEMBER */}

                        <div className="mt-6 flex w-[400px] items-center">

                            <input
                                type="checkbox"
                                id="remember"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-4 h-4 border border-[#666666]"
                            />

                            <label
                                htmlFor="remember"
                                className="ml-2 text-[14px] text-[#4d4d4d]"
                            >
                                Remember me
                            </label>

                            <p className="ml-auto text-[14px] text-[#D4A23F] cursor-pointer">
                                Forgot password?
                            </p>

                        </div>

                        {/* BUTTON */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-8 w-[400px] h-14 flex items-center justify-center bg-[#BD8928] rounded-full text-white font-semibold"
                        >
                            {loading ? "Signing in..." : "Sign In →"}
                        </button>

                    </form>

                    {/* SOCIAL */}

                    <p className="mt-10 text-[14px] text-[#4d4d4d]">
                        Or continue with
                    </p>

                    <div className="grid grid-cols-2 gap-2 w-[400px] mt-6 font-semibold">

                        <button className="h-14 border border-[#FFE9CC] rounded-[16px]">
                            Google
                        </button>

                        <button className="h-14 border border-[#FFE9CC] rounded-[16px]">
                            Facebook
                        </button>

                    </div>

                    {/* SIGNUP */}

                    <p className="mt-6 mb-6 text-[14px] text-[#4d4d4d]">

                        Don't have an account?

                        <a
                            href="/sign-up"
                            className="ml-1 text-[#D4A23F]"
                        >
                            Create one
                        </a>

                    </p>

                    {/* SELLER */}

                    <section className="flex flex-col items-center py-10">

                        <div className="w-[448px] h-[1px] bg-[#FFE9CC] mb-10"></div>

                        <div className="w-[448px] border border-[#FFF4E6] bg-[#FFF4E6] rounded-[16px] p-6">

                            <h1 className="text-[#4d4d4d] text-[14px]">
                                Want to sell on OutfitsLab?
                            </h1>

                            <button className="mt-4 w-[200px] h-14 rounded-full bg-[#D19F42] text-white">
                                Become a Seller
                            </button>

                        </div>

                    </section>

                </div>

            </div>

        </div>
    );
}