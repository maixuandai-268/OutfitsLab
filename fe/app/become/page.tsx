"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import StepInfo from "@/components/seller/StepInfo";
import StepStore from "@/components/seller/StepStore";
import StepConfirm from "@/components/seller/StepConfirm";

export default function BecomePage() {
    const router = useRouter();
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
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    // Hàm Xử lý Gửi Dữ Liệu Cuối Cùng
    const handleSubmit = async () => {
        setLoading(true);
        const token = localStorage.getItem("access_token") || localStorage.getItem("token");

        if (!token) {
            alert("Vui lòng đăng nhập để thực hiện chức năng này!");
            router.push("/sign-in");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/shops/become", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData) // Gửi toàn bộ formData
            });

            const result = await res.json();

            if (res.ok) {
                alert("Chúc mừng! Bạn đã trở thành người bán. Hãy đăng nhập lại để cập nhật quyền hạn.");
                localStorage.removeItem("token");
                localStorage.removeItem("access_token");
                router.push("/sign-in");
            } else {
                alert(result.message || "Đăng ký không thành công.");
            }
        } catch (error) {
            console.error("Lỗi:", error);
            alert("Lỗi kết nối server.");
        } finally {
            setLoading(false);
        }
    };

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    return (
        <div className="min-h-screen bg-white">
            {step === 1 && (
                <StepInfo
                    firstName={formData.firstName}
                    lastName={formData.lastName}
                    email={formData.email}
                    phone={formData.phone}
                    onChange={handleChange}
                    nextStep={nextStep}
                />
            )}

            {step === 2 && (
                <StepStore
                    storeName={formData.storeName}
                    storeDescription={formData.storeDescription}
                    primaryCategory={formData.primaryCategory}
                    rememberMe={formData.rememberMe}
                    onChange={handleChange}
                    nextStep={nextStep}
                    prevStep={prevStep}
                />
            )}

            {step === 3 && (
                <StepConfirm
                    firstName={formData.firstName}
                    email={formData.email}
                    storeName={formData.storeName}
                    prevStep={prevStep}
                    onSubmit={handleSubmit} 
                    loading={loading}
                />
            )}
        </div>
    );
}