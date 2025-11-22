"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

const AuthLeftContent = () => {
    const pathName = usePathname();

    return (
        <div className="w-2/5 bg-sky-50 max-md:hidden flex flex-col items-center justify-center rounded-tr-4xl rounded-br-4xl px-6">
            <Image
                src="/images/logo-only.png"
                alt="logo"
                width={75}
                height={75}
            />
            {pathName === "/sign-in" ? (
                <>
                    <h1 className="text-[25px] text-center font-semibold mt-5">Welcome back to Vaulted !</h1>
                    <p className="text-sm text-center text-gray-500 mt-3">We're excited to see you! Please log in below to continue.</p>
                </>
            ) : (
                <>
                    <h1 className="text-[25px] text-center font-semibold mt-5">Start Your Journey with Vaulted</h1>
                    <p className="text-sm text-center text-gray-500 mt-3">Unlock exclusive features by creating an account today.</p>
                </>
            )}

        </div>
    )
}

export default AuthLeftContent;