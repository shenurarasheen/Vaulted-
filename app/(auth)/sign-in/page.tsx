"use client";

import { useRouter } from "next/navigation";
import AuthBottomLink from "@/components/AuthBottomLink";
import AuthButton from "@/components/AuthButton";
import InputField from "@/components/InputField";
import {
    FieldGroup,
    FieldSet,
} from "@/components/ui/field";
import api, { ApiResponse } from "@/lib/api";
import { useState } from "react";
import { toast } from "react-hot-toast";

const SignInPage = () => {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }));
    }

    const validateFields = (): boolean => {
        const { email, password } = formData;

        if (!email) {
            toast.error("Email is required.");
            return false;
        }

        if (!password) {
            toast.error("Password is required.");
            return false;
        }

        return true;
    }

    const handleSubmit = async () => {
        if (!validateFields()) {
            return;
        }

        setIsLoading(true);

        try {
            const res = await api.post<ApiResponse>("/auth/login", formData);
            const data = res.data;
            if (data.success) {
                toast.success(data.message || "Login successful!");
                router.push("/");
            }
        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="md:w-3/5 w-full flex justify-center items-center">
            <FieldSet className="w-[520px] max-sm:w-full md:px-10 px-6">
                <FieldGroup>
                    <h1 className="md:text-3xl text-2xl font-semibold">Login</h1>

                    <InputField
                        label="Email Address"
                        field="email"
                        type="email"
                        placeholder="ex-: John Smith"
                        handleInputChange={handleInputChange}
                        desc="Choose a unique username for your account."
                    />
                    <InputField
                        label="Password"
                        field="password"
                        type="password"
                        placeholder="••••••••"
                        handleInputChange={handleInputChange}
                        desc="Must be at least 8 characters long."
                    />

                    <AuthButton
                        title="Sign In"
                        handleClick={handleSubmit}
                        isLoading={isLoading}
                    />

                    <AuthBottomLink
                        desc="Don't have an account?"
                        href="/sign-up"
                        linkText="Sign Up"
                    />
                </FieldGroup>
            </FieldSet>
        </div>
    )
}

export default SignInPage;