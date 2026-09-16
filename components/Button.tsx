'use client'

import { useRouter } from "next/navigation";

const Button = ({title, textColor="text-white", className, url="/"} : ButtonProps) => {
    const router = useRouter();
    return (
        <button 
        className={`rounded-full px-4 py-2 cursor-pointer ${className} w-fit text-nowrap`} 
        onClick={() => router.push(url)}>
            <span className={`text-sm font-semibold ${textColor}`}>{title}</span>
        </button>
    )
}

export default Button;