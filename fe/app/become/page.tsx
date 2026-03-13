"use client"

import { useState } from "react";
import StepInfo from "@/components/seller/StepInfo";
import StepStore from "@/components/seller/StepStore";
import StepConfirm from "@/components/seller/StepConfirm";

export default function BecomePage() {

    const [step, setStep] = useState(1);

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    return (
        <div className="min-h-screen">

            {step === 1 && (
                <StepInfo nextStep={nextStep} />
            )}

            {step === 2 && (
                <StepStore
                    nextStep={nextStep}
                    prevStep={prevStep} storeName={""} storeDescription={""} primaryCategory={""} onChange={function (field: string, value: string): void {
                        throw new Error("Function not implemented.");
                    }} />
            )}

            {step === 3 && (
                <StepConfirm storeName={""} storeDescription={""} primaryCategory={""} onChange={function (field: string, value: string): void {
                    throw new Error("Function not implemented.");
                }} prevStep={function (): void {
                    throw new Error("Function not implemented.");
                }} />
            )}
        </div>
    );
}