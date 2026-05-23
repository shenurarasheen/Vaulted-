import { Loader2 } from "lucide-react";

const AuthButton = ({ title, handleClick, isLoading = false }: AuthButtonProps) => {
    return (
        <button
            className={`w-full flex items-center justify-center gap-3 h-9 md:text-sm text-[14px] bg-sky-500 text-white font-semibold rounded-md mt-3 shadow shadow-sky-400/30 cursor-pointer ${isLoading && "disabled:cursor-not-allowed disabled:opacity-50"}`}
            onClick={() => handleClick()}
            disabled={isLoading}
        >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isLoading ? "Processing..." : title}
        </button>
    )
}

export default AuthButton;