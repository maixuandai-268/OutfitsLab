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
    // 1. Chỉ khai báo shopId một lần ở đây
    const [shopId, setShopId] = useState<number | null>(null);

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

    const handleSubmit = async () => {
        setLoading(true);
        const token = localStorage.getItem("access_token") || localStorage.getItem("token");

        if (!token) {
            alert("Vui lòng đăng nhập!");
            router.push("/sign-in");
            return;
        }

        try {
            // 1. Sửa port từ 3001 thành 3000
            const res = await fetch("http://localhost:3000/api/shops/become", { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                // 2. Chỉ gửi ĐÚNG các trường có trong CreateShopDto
                body: JSON.stringify({
                    shop_name: formData.storeName,
                    description: formData.storeDescription,
                    contact_email: formData.email,
                    // location: "Vietnam", // Thêm nếu cần, hoặc để trống vì là IsOptional
                })
            });

            const result = await res.json();

            if (res.ok) {
                setShopId(result.id); 
                // Không cần redirect ngay để StepConfirm hiện nút bấm
            } else {
                // Hiển thị lỗi cụ thể từ ValidationPipe
                const errorMsg = Array.isArray(result.message) ? result.message.join("\n") : result.message;
                alert("Lỗi dữ liệu:\n" + errorMsg);
            }
        } catch (error) {
            console.error("Lỗi kết nối:", error);
            alert("Không thể kết nối tới Server. Hãy kiểm tra xem Backend đã chạy ở port 3000 chưa.");
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
                    shopId={shopId} // Truyền shopId xuống
                />
            )}
        </div>
    );
}