"use client";

import { useRouter } from "next/navigation";
import AuthBottomLink from "@/components/AuthBottomLink";
import AuthButton from "@/components/AuthButton";
import InputField from "@/components/InputField";
import {
    FieldGroup,
    FieldSet,
} from "@/components/ui/field";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { validateEmail, validatePassword } from "@/lib/validations";
import api, { ApiResponse } from "@/lib/api";

const SignUpPage = () => {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    }

    const validateFormData = (): boolean => {
        const { firstName, lastName, email, password, confirmPassword } = formData;

        if (!firstName) {
            toast.error("First name is required!");
            console.log("First name is required!");
            return false;
        }
        if (!lastName) {
            toast.error("Last name is required!");
            return false;
        }
        if (!email) {
            toast.error("Email is required!");
            return false;
        }
        if (!validateEmail(email)) {
            toast.error("Please enter a valid email address!");
            return false;
        }
        if (!password) {
            toast.error("Password is required!");
            return false;
        }
        if (!validatePassword(password)) {
            toast.error("Password does not meet the requirements!");
            return false;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return false;
        }
        return true;
    }

    const handleSignUp = async () => {
        if (!validateFormData()) return;

        setIsLoading(true);

        try {
            const res = await api.post<ApiResponse>(`/auth/register`, formData);
            const data = res.data;
            if (data.success) {
                toast.success(data.message || "Sign Up Successful!");
                router.push("/");
            }
        } catch (error) {
            // Error handling is done globally in the API interceptor, so we don't need to do anything here.
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="md:w-3/5 w-full flex flex-col items-center md:px-10 px-5 overflow-y-auto">
            <FieldSet className="lg:w-[600px] w-[500px] mt-18 mb-10 max-sm:w-full md:px-10 px-6">
                <FieldGroup>
                    <h1 className="md:text-3xl text-2xl font-semibold mb-3">Sign Up</h1>

                    <div className="w-full flex gap-3">
                        <InputField
                            label="First Name"
                            field="firstName"
                            placeholder="ex-: John"
                            handleInputChange={handleInputChange}
                            desc="Enter your given name as it appears on ID."
                        />
                        <InputField
                            label="Last Name"
                            field="lastName"
                            placeholder="ex-: Smith"
                            handleInputChange={handleInputChange}
                            desc="Enter your family name or surname."
                        />
                    </div>

                    <InputField
                        label="Email Address"
                        field="email"
                        type="email"
                        placeholder="ex-: john.smith@exampel.com"
                        handleInputChange={handleInputChange}
                        desc="Enter a valid email address (e.g.- john.smith@example.com)"
                    />

                    <InputField
                        label="Password"
                        field="password"
                        type="password"
                        placeholder="••••••••"
                        handleInputChange={handleInputChange}
                        desc="Create a strong password (min 8 chars, mix letters, numbers, and symbols)."
                    />

                    <InputField
                        label="Confirm Password"
                        field="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        handleInputChange={handleInputChange}
                        desc="Re-enter your password to confirm it matches"
                    />

                    <AuthButton
                        title="Sign Up"
                        handleClick={handleSignUp}
                        isLoading={isLoading}
                    />

                    <AuthBottomLink
                        desc="Already have an account?"
                        href="/sign-in"
                        linkText="Sign In"
                    />
                </FieldGroup>
            </FieldSet>
        </div>
    )
}

export default SignUpPage;