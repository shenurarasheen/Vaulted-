import Image from "next/image";

const CLOUDINARY_BASE_URL = process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL!;

const calculateActualitemPrice = (basePrice: number, discountType: string, discountAmount: number): number => {
    if (discountType === "percentage") {
        return basePrice - (basePrice * (discountAmount / 100))
    }
    if (discountType === "fixed") {
        return basePrice - discountAmount;
    }
    if (discountType === "none") {
        return basePrice;
    }
    return basePrice;
}

const CheckoutOrderItems = ({ orderItems }: { orderItems: CartItemProps[] }) => {

    return (
        <section className="border border-gray-200 rounded-lg p-5">
            <h2 className="text-[15px] font-semibold text-gray-900 mb-4">Order Items</h2>

            {orderItems.length === 0 ? (
                <p className="text-sm text-gray-500">No items in the order.</p>
            ) : (
                <div className="flex flex-col divide-y divide-gray-100">
                    {orderItems.map((item) => (
                        <div key={item._id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                            <div className="relative w-12 h-12 shrink-0 rounded-md overflow-hidden border border-gray-100 bg-gray-50">
                                <Image
                                    src={`${CLOUDINARY_BASE_URL}/${item.productId.imageUrls[0]}`}
                                    width={48}
                                    height={48}
                                    alt={item.productId.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-900 truncate">{item.productId.title}</p>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    {calculateActualitemPrice(item.productId.basePrice, item.productId.discountType, item.productId.discountValue).toFixed(2)} LKR x {item.quantity}
                                </p>
                            </div>

                            <p className="text-sm font-medium text-gray-900 shrink-0">
                                {(calculateActualitemPrice(item.productId.basePrice, item.productId.discountType, item.productId.discountValue) * item.quantity).toFixed(2)} LKR
                            </p>
                        </div>
                    ))}
                </div>
            )}

        </section>
    )
}

export default CheckoutOrderItems;