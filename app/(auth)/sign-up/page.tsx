import AuthBottomLink from "@/components/AuthBottomLink";
import AuthButton from "@/components/AuthButton";
import InputField from "@/components/InputField";
import {
    FieldGroup,
    FieldSet,
} from "@/components/ui/field";

const SignUpPage = () => {
    return (
        <div className="md:w-3/5 w-full flex flex-col items-center md:px-10 px-5 overflow-y-auto">
            <FieldSet className="lg:w-[600px] w-[500px] mt-18 mb-10 max-sm:w-full md:px-10 px-6">
                <FieldGroup>
                    <h1 className="md:text-3xl text-2xl font-semibold mb-3">Sign Up</h1>

                    <div className="w-full flex gap-3">
                        <InputField
                            label="First Name"
                            placeholder="ex-: John"
                            desc="Enter your given name as it appears on ID."
                        />
                        <InputField
                            label="Last Name"
                            placeholder="ex-: Smith"
                            desc="Enter your family name or surname."
                        />
                    </div>

                    <InputField
                        label="Address Line 1"
                        placeholder="ex-: 1234 Main St"
                        desc="Street address, P.O. box, company name, c/o."
                    />

                    <InputField
                        label="Address Line 2"
                        placeholder="ex-: Apt 01"
                        desc="Apartment, suite, unit, building, floor (optional)."
                    />

                    <InputField
                        label="City"
                        placeholder="ex-: New York"
                        desc="City, town, or locality."
                    />

                    <div className="w-full flex gap-3">
                        <InputField
                            label="State"
                            placeholder="ex-: NY"
                            desc="State, province, or region"
                        />
                        <InputField
                            label="Postal Code"
                            placeholder="ex-: 10010"
                            desc="ZIP or postal code"
                        />
                    </div>

                    <InputField
                        label="Username"
                        placeholder="ex-: John Smith"
                        desc="Choose a unique username (4–30 characters, letters and numbers)."
                    />

                    <InputField
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        desc="Create a strong password (min 8 chars, mix letters, numbers, and symbols)."
                    />

                    <InputField
                        label="Confirm Password"
                        type="password"
                        placeholder="••••••••"
                        desc="Re-enter your password to confirm it matches"
                    />

                    <AuthButton title="Sign Up" />

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