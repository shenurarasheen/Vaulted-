import { X } from "lucide-react";
import Image from "next/image";

const CartCard = ({product} : {product: Product}) => {
    const {title, description, price, soldCount, src, shippingAmount} = product;

    return (
        <div className="relative border border-gray-300 rounded-lg flex gap-3 justify-between items-center py-4 px-6">
            <div className="absolute top-1 right-1 bg-white size-5 rounded-full border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-100">
                <X size={14} color="gray" className="font-semibold"/>
            </div>
            <div className="w-1/5">
                <div className="relative md:w-[110px] md:h-[110px] w-20 h-20 rounded-lg overflow-hidden">
                    <Image
                        src={src}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            <div className="space-y-1 w-2/5">
                <span className="px-2 py-1 bg-sky-500/20 rounded-full text-[11px] text-sky-500 border border-sky-400">{soldCount}+ sold</span>
                <p className="md:text-sm text-[12px] font-semibold mt-2 line-clamp-1">{title}</p>
                <p className="md:text-xs text-[11px] line-clamp-2">{description}</p>
                <span className="text-[10px] bg-green-500/20 text-green-400 border border-green-400 rounded-full px-1">New</span>
            </div>

            <div className="w-1/5 flex justify-center">
                <div>
                    <span className="md:text-[13px] text-[12px] font-semibold">Qty</span>&nbsp;&nbsp;
                    <select className="border-[1.5px] border-gray-400 rounded-lg md:w-14 md:h-9 w-10 h-6 text-sm bg-gray-100/50 text-center qty-select">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
            </div>

            <div className="w-1/5 flex flex-col items-end">
                <p className="md:text-xl text-sm font-semibold">${price.toFixed(2)}</p>
                <p className="text-gray-400 max-md:text-xs line-through">$145.45</p>
                <p className="md:text-[13px] text-[10px] text-gray-400 font-semibold">Shipping: ${shippingAmount?.toFixed(2)}</p>
                <p className="mt-2 text-xs text-sky-600">Free returns</p>
            </div>
        </div>
    )
}

export default CartCard;