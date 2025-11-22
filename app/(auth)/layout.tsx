import AuthLeftContent from "@/components/AuthLeftContent";
import Image from "next/image";

type AppLayoutProps = Readonly<{ children: React.ReactNode }>

const AuthLayout = ({ children }: AppLayoutProps) => {
    return (
        <main className="flex h-screen w-full fixed">
            <AuthLeftContent />
            {children}
        </main>
    )
}

export default AuthLayout;