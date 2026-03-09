"use client"
import { useState } from "react";
import StepInfo from "@/components/seller/steps/StepInfo";
import StepStore from "@/components/seller/steps/StepStore";
import StepConfirm from "@/components/seller/steps/StepConfirm";

export default function BecomPage() {
    const [name, setName] = useState("");
    const [formData, setFormData] = useState({ name: "" });
    return (
        <div className="min-h-screen bg-[#FFFBF5]">
            <StepConfirm name={""} />
        </div>
    )
}