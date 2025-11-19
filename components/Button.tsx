const Button = ({title, textColor="text-white", className} : ButtonProps) => {
    return (
        <button className={`rounded-full px-4 py-2 cursor-pointer ${className} w-fit text-nowrap`}>
            <span className={`text-sm font-semibold ${textColor}`}>{title}</span>
        </button>
    )
}

export default Button;