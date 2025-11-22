import { ArrowRight } from "lucide-react";

const SectionTitle = ({title}: SectionTitleProps) => {
    return (
        <div className="flex gap-3 items-center">
            <h1 className="text-xl">{title}</h1>
            <div className="size-8 bg-white border border-gray-300 shadow-sm rounded-full flex items-center justify-center">
                <ArrowRight size={18} />
            </div>
        </div>
    )
}

export default SectionTitle;