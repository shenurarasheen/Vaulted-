import { ShoppingCart } from "lucide-react"
import Image from "next/image"

const ProductCard = ({ title, desc, price, soldCount, src, alt }: ProductCardProps) => {
    return (
        <div className="cursor-pointer">
            <div className="relative h-55 max-sm:h-40 bg-gray-100 rounded-lg overflow-hidden">
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
                <h1 className="text-lg font-semibold mt-2 line-clamp-1">{title}</h1>
                <p className="text-[13.5px] mt-2 line-clamp-2">{desc}</p>
                <p className="text-[18px] font-semibold mt-1">{price}</p>
                <p className="text-[15px] text-gray-500 line-through">$250.45</p>
                <span className="px-2 py-1 bg-sky-500/20 rounded-full text-[11px] text-sky-500 mt-3">{soldCount}+ sold</span>
                <p className="text-[11px] text-gray-500 font-semibold mt-2">$48+ shipping</p>
            </div>
        </div>
    )
}

export default ProductCard