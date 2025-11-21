import Image from "next/image";

type AppLayoutProps = Readonly<{ children: React.ReactNode }>

const AuthLayout = ({ children }: AppLayoutProps) => {
    return (
        <main className="flex min-h-screen w-full">
            <div className="w-2/5 bg-sky-50 max-md:hidden flex flex-col items-center justify-center rounded-tr-4xl px-6">
                <Image
                    src="/images/logo-only.png"
                    alt="logo"
                    width={75}
                    height={75}
                />
                <h1 className="text-[25px] text-center font-semibold mt-5">Welcome back to Vaulted !</h1>
                <p className="text-sm text-center text-gray-500 mt-3">We're excited to see you! Please log in below to continue.</p>
            </div>
            {children}
        </main>
    )
}

export default AuthLayout;