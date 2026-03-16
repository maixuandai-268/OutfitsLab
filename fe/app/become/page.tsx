"use client";

import { useState } from "react";

import StepInfo from "@/components/seller/StepInfo";
import StepStore from "@/components/seller/StepStore";
import StepConfirm from "@/components/seller/StepConfirm";
import { useSearchParams } from "next/navigation";
export default function BecomePage() {

    const searchParams = useSearchParams();
    const initialStep = parseInt(searchParams.get("step") || "1");

    const [step, setStep] = useState(initialStep);

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

    const nextStep = () => setStep((prev) => prev + 1);

    const prevStep = () => setStep((prev) => prev - 1);

    return (
        <div className="min-h-screen">

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
                />
            )}

        </div>
    );
}