import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CLOUDINARY_BASE_URL = process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL!;

const AdvProductCard = ({ product }: { product: ProductProps }) => {

    return (
        <Link href={`/itm/${product._id}`} className="w-full">
            <div className="cursor-pointer">
                <div className="relative h-46 max-sm:h-40 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                        src={`${CLOUDINARY_BASE_URL}/${product.imageUrls[0]}`}
                        alt={product.title}
                        className="object-fill bg-cover transition-transform duration-300 ease-in-out hover:scale-110 will-change-transform"
                        fill
                    />
                    <div className="absolute top-2 right-2 size-8 bg-white rounded-full flex items-center justify-center">
                        <ShoppingCart size={20} />
                    </div>
                </div>
                <div>
                    <h1 className="text-[14px] font-semibold mt-2 line-clamp-1">{product.title}</h1>
                    <p className="text-[13px] mt-2 line-clamp-2">{product.description}</p>
                    <p className="text-[16px] font-semibold mt-1">{product.basePrice.toFixed(2)}</p>
                    <span className="p-1 bg-sky-500/20 rounded-full text-[10px] text-sky-500 mt-3">{product.soldCount}+ sold</span>
                    <p className="text-[11px] text-gray-500 font-semibold mt-2">LKR {product.shippingAmount?.toFixed(2) || '0.00'}+ shipping</p>
                </div>
            </div>
        </Link>
    )
}

export default AdvProductCard;