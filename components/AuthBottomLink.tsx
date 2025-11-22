import Link from "next/link";

const AuthBottomLink = ({desc, href, linkText} : AuthBottomLinkProps) => {
    return (
        <p className="text-center text-sm text-gray-400">
            {desc} <Link href={href} className="text-sky-600 hover:underline">{linkText}</Link>
        </p>
    )
}

export default AuthBottomLink;