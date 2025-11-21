import FooterColumn from "./FooterColumn";
import { footerColumns } from "@/data/footer"

const Footer = () => {
    return (
        <footer className="w-full bg-gray-100 mt-16 border-t border-gray-400 px-10 pt-10 flex flex-col">
            <div className="w-full flex justify-between mb-10 max-sm:flex-col max-sm:items-start max-sm:space-y-3">
                {footerColumns.map((col, index) => (
                    <FooterColumn
                        key={index}
                        title={col.title}
                        items={col.items}
                    />
                ))}
            </div>
            <div className="flex justify-center">
                <p className="py-5 text-[11px]">Copyright © 2024-2025 vaulted Inc. All right reserved.&nbsp;
                    <span className="text-[11px] underline text-blue-600"> Accessibility, User Agreement, Privacy, Consumer Health Data, Payments Terms of Use, Cookies, CA Privacy Notice, Your Privacy Choices and AdChoice </span>
                </p>
            </div>
        </footer>
    )
}

export default Footer;