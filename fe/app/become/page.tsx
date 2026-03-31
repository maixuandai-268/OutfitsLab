"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import StepInfo from "@/components/seller/StepInfo";
import StepStore from "@/components/seller/StepStore";
import StepConfirm from "@/components/seller/StepConfirm";
import { useAuth } from "@/context/AuthContext";

export default function BecomePage() {
    const router = useRouter();
    const { refreshUser } = useAuth();
    const searchParams = useSearchParams();
    const initialStep = parseInt(searchParams.get("step") || "1");

    const [step, setStep] = useState(initialStep);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        storeName: "",
        storeDescription: "",
        primaryCategory: "",
        rememberMe: false
    });

    const handleChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        const token = localStorage.getItem("token") || localStorage.getItem("access_token");

        if (!token) {
            alert("Vui lòng đăng nhập!");
            router.push("/sign-in");
            return;
        }

        try {
            const res = await fetch("https://outfitslab.onrender.com/api/shops/become", { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    shop_name: formData.storeName,
                    description: formData.storeDescription || undefined,
                    contact_email: formData.email || undefined,
                })
            });

            const result = await res.json();

            if (res.ok) {
                if (refreshUser) await refreshUser(); 
                
                alert("Đăng ký thành công! Vui lòng chờ Admin phê duyệt.");
                router.push("/");
            } else {
                const errorMsg = Array.isArray(result.message) ? result.message.join("\n") : result.message;
                alert("Lỗi: " + errorMsg);
            }
        } catch (error) {
            alert("Không thể kết nối tới Server.");
        } finally {
            setLoading(false);
        }
    };

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    return (
        <div className="min-h-screen bg-white">
            {step === 1 && (
                <StepInfo {...formData} onChange={handleChange} nextStep={nextStep} />
            )}

            {step === 2 && (
                <StepStore
                    {...formData}
                    onChange={handleChange}
                    nextStep={nextStep}
                    prevStep={prevStep}
                />
            )}

            {step === 3 && (
                <StepConfirm
                    {...formData}
                    prevStep={prevStep}
                    onSubmit={handleSubmit}
                    loading={loading}
                />
            )}
        </div>
    );
}