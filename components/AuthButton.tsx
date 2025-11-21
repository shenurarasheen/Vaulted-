const AuthButton = ({title} : AuthButtonProps) => {
    return (
        <button
            className="w-full h-9 md:text-sm text-[14px] bg-sky-500 text-white font-semibold rounded-md mt-3 shadow shadow-sky-400/30 cursor-pointer"
        >
            {title}
        </button>
    )
}

export default AuthButton;