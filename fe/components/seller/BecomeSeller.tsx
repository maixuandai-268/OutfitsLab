"use client";

import { useState } from "react";
import StepInfo from "./StepInfo";
import StepStore from "./StepStore";
import StepConfirm from "./StepConfirm";

export default function BecomeSeller() {

    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",

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
        <>
            {step === 1 && (
                <StepInfo
                    fullName={formData.fullName}
                    email={formData.email}
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
                    formData={formData}
                    prevStep={prevStep}
                />
            )}
        </>
    );
}