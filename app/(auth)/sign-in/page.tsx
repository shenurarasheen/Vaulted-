import AuthBottomLink from "@/components/AuthBottomLink";
import AuthButton from "@/components/AuthButton";
import InputField from "@/components/InputField";
import {
    FieldGroup,
    FieldSet,
} from "@/components/ui/field";

const SignInPage = () => {
    return (
        <div className="md:w-3/5 w-full mx-auto flex justify-center items-center">
            <FieldSet className="w-[520px] max-sm:w-full md:px-10 px-6">
                <FieldGroup>
                    <h1 className="md:text-3xl text-2xl font-semibold">Login</h1>

                    <InputField
                        label="Username"
                        placeholder="ex-: John Smith"
                        desc="Choose a unique username for your account."
                    />
                    <InputField
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        desc="Must be at least 8 characters long."
                    />

                    <AuthButton title="Sign In" />

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