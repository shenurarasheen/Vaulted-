import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const SignInPage = () => {
    return (
        <div className="md:w-3/5 w-full mx-auto flex justify-center items-center">
            <FieldSet className="w-[520px] max-sm:w-full md:px-10 px-6">
                <FieldGroup>
                    <h1 className="md:text-3xl text-2xl font-semibold">Login</h1>
                    <Field>
                        <FieldLabel htmlFor="username" className="md:text-sm text-[14px]">Username</FieldLabel>
                        <Input id="username" type="text" placeholder="Max Leiter" className="placeholder:text-sm focus-visible:border-sky-500 focus-visible:ring-sky-500/40 focus-visible:ring-2"/>
                        <FieldDescription className="md:text-sm text-xs">
                            Choose a unique username for your account.
                        </FieldDescription>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="password" className="md:text-sm text-[13px]">Password</FieldLabel>
                        <FieldDescription className="md:text-sm text-xs">
                            Must be at least 8 characters long.
                        </FieldDescription>
                        <Input id="password" type="password" placeholder="••••••••" className="placeholder:text-sm focus-visible:border-sky-500 focus-visible:ring-sky-500/40 focus-visible:ring-2" />
                    </Field>

                    <button className="w-full h-9 md:text-sm text-[14px] bg-sky-500 text-white font-semibold rounded-md mt-3 shadow shadow-sky-400/30 cursor-pointer">Sign In</button>

                    <p className="text-center text-sm text-gray-400">New to the Vaulted ? <Link href="/sign-up" className="text-sky-600 hover:underline">Create Account</Link></p>
                </FieldGroup>
            </FieldSet>
        </div>
    )
}

export default SignInPage;