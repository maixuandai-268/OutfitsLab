"use client";


import { useState } from "react";

export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <div className="w-full max-w-md px-6 flex flex-col">
            <div className="mt-21.25 flex justify-center ">
                <div className="text-center ">
                    <div className="w-16 h-16 bg-[#D4A23F] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                        O
                    </div>

                    <h1 className="mb-1 text-2xl font-bold">
                        Welcome back
                    </h1>
                    <p className="text-[#4d4d4d] text-[16px] mb-6">
                        Sign In to continue to OutfitsLab
                    </p>

                    <div className="flex flex-col mt-10">
                        <label htmlFor="Email" className="text-[14px] font-bold text-left">Email Address</label>
                        <input type="email"
                            placeholder="you@example.com"
                            className="mt-1 w-md h-12.5 border border-[#FFE9CC] rounded-2xl pl-10 pr-4 py-3" />
                    </div>

                    <div className="flex flex-col mt-6">
                        <label htmlFor="Password" className="text-[14px] font-bold text-left">Password</label>
                        <input type="password"
                            placeholder="Enter your password"
                            className="mt-1 w-[448px] h-[50px] border border-[#FFE9CC] rounded-[16px] pl-10 pr-4 py-3" />
                    </div>

                    <div className="mt-8 flex w-full items-center">
                        <input
                            type="checkbox"
                            id="remember"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="w-4 h-4 border border-[#666666] rounded-[2px] bg-white appearance-none checked:bg-[#D4A23F] checked:border-[#D4A23F] relative checked:before:content-['✓'] checked:before:text-white checked:before:absolute checked:before:inset-0 checked:before:flex checked:before:items-center checked:before:justify-center"
                        />
                        <label htmlFor="remember" className="ml-2 text-[14px] text-[#4d4d4d] cursor-pointer">Remember me</label>
                        <p className="ml-auto text-[14px] text-[#D4A23F]">Forgot password?</p>
                    </div>

                    <div className="mt-8 w-[448px] h-[50px] flex items-center justify-center border bg-[#BD8928] rounded-full text-white">
                        Sign In →
                    </div>

                    <p className="mt-10 ml-8 text-center text-[14px] text-[#4d4d4d]">Or continue with </p>

                    <div className="grid grid-cols-2 gap-2 w-[448px] h-[50px] mt-6 font-semibold">
                        <button className="w-[216px] h-[52px] border-3 border-[#FFE9CC] rounded-[16px]">Google</button>
                        <button className="w-[216px] h-13 border-3 border-[#FFE9CC] rounded-[16px]">Facebook</button>
                    </div>
                    <p className="mt-6 mb-6 text-[14px] text-[#4d4d4d] text-center flex justify-center">
                        Don't have an account?
                        <a href="Sign Up" className="ml-1 text-[#D4A23F]">Create one</a>
                    </p>


                    <section className="w-full h-full flex flex-col items-center py-16">
                        <div className="w-[448px] h-[1px] bg-[#FFE9CC] mb-12 "></div>
                        <div className="mt-[33px] w-[448px] h-[120] border border-[#FFF4E6] bg-[#FFF4E6] rounded-[16px]">
                            <h1 className="mt-4 text-[#4d4d4d] text-[14px]">Want to sell on OutfitsLab?</h1>
                            <button className="mt-4 w-[163px] h-[40px] border rounded-full bg-[#D19F42] text-white">Become a Seller</button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}