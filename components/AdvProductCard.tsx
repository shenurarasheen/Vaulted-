import { ShoppingCart } from "lucide-react"
import Image from "next/image"

const AdvProductCard = ({ title, desc, price, soldCount, src, alt, shippingCost=0 }: ProductCardProps) => {
    return (
        <div className="cursor-pointer">
            <div className="relative h-46 max-sm:h-40 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                    src={src}
                    alt={alt}
                    className="object-fill bg-cover transition-transform duration-300 ease-in-out hover:scale-110 will-change-transform"
                    fill
                />
                <div className="absolute top-2 right-2 size-8 bg-white rounded-full flex items-center justify-center">
                    <ShoppingCart size={20} />
                </div>
            </div>
            <div>
                <h1 className="text-[14px] font-semibold mt-2 line-clamp-1">{title}</h1>
                <p className="text-[13px] mt-2 line-clamp-2">{desc}</p>
                <p className="text-[16px] font-semibold mt-1">{price}</p>
                <span className="p-1 bg-sky-500/20 rounded-full text-[10px] text-sky-500 mt-3">{soldCount}+ sold</span>
                <p className="text-[11px] text-gray-500 font-semibold mt-2">$48+ shipping</p>
            </div>
        </div>
    )
}

export default AdvProductCard;