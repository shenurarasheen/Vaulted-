"use client";

import Image from "next/image";

const CATEGORY_LABELS: Record<string, string> = {
    electronics: "Electronics",
    apparel: "Apparel",
    home: "Home & living",
    beauty: "Beauty",
    sports: "Sports & outdoors",
};

const CLOUDINARY_BASE_URL = process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL || "";

const ProductDetailPopup = ({ product, isOpen, onClose, onDelete }: {
    product: ProductProps;
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
}) => {
    const finalPrice = (() => {
        if (product.discountType === "percentage") {
            return product.basePrice * (1 - product.discountValue / 100);
        }
        if (product.discountType === "fixed") {
            return Math.max(0, product.basePrice - product.discountValue);
        }
        return product.basePrice;
    })();

    const hasDiscount = product.discountType !== "none";

    const discountLabel = product.discountType === "percentage"
        ? `${product.discountValue}% off`
        : `$${product.discountValue.toFixed(2)} off`;

    const validImages = product.imageUrls?.map((imgUrl) => `${CLOUDINARY_BASE_URL}/${imgUrl}`);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[88vh] overflow-y-auto hide-scrollbar">

                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-3.5 flex items-center justify-between z-10 rounded-t-3xl">
                    <div className="flex items-center gap-2.5">
                        <span className={`w-2 h-2 rounded-full ${product.stock > 0 ? "bg-green-500" : "bg-red-400"}`} />
                        <span className="text-sm text-gray-500">
                            {product.stock > 0 ? "In stock" : "Out of stock"}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onClose}
                            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                            aria-label="Close"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="px-6 pb-6">

                    {/* Image grid */}
                    <div className="grid grid-cols-4 gap-2 pt-5">
                        <div className="relative col-span-2 row-span-2 aspect-square rounded-2xl overflow-hidden bg-green-50">
                            {validImages[0] ? (
                                <Image
                                    src={validImages[0]}
                                    alt={product.title}
                                    fill
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                            )}
                        </div>
                        {[0, 1, 2, 3].map((i) => (
                            <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-50">
                                {validImages[i] ? (
                                    <Image
                                        src={validImages[i]}
                                        alt={`${product.title} ${i + 1}`}
                                        fill
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                    </svg>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Title & category */}
                    <div className="mt-5">
                        <h2 className="text-lg font-semibold text-gray-900 leading-snug">{product.title}</h2>
                        <div className="flex items-center gap-2 flex-wrap mt-2">
                            {product.category && (
                                <span className="text-xs px-2.5 py-1 rounded-full bg-green-50 text-green-700 font-medium">
                                    {CATEGORY_LABELS[product.category] ?? product.category}
                                </span>
                            )}
                            <span className="text-xs px-2.5 py-1 rounded-full bg-gray-50 text-gray-500 border border-gray-200">
                                SKU #{product._id}
                            </span>
                        </div>
                    </div>

                    {/* Pricing & stock metrics */}
                    <div className="grid grid-cols-3 gap-2.5 mt-5">
                        <div className="bg-gray-50 rounded-xl px-3.5 py-3">
                            <div className="text-xs text-gray-400 mb-1">Base price</div>
                            <div className="text-base font-semibold text-gray-900">${product.basePrice.toFixed(2)}</div>
                        </div>
                        <div className="bg-green-50 rounded-xl px-3.5 py-3">
                            <div className="text-xs text-green-600 mb-1">Final price</div>
                            <div className="text-base font-semibold text-green-800">${finalPrice.toFixed(2)}</div>
                        </div>
                        <div className="bg-gray-50 rounded-xl px-3.5 py-3">
                            <div className="text-xs text-gray-400 mb-1">Stock</div>
                            <div className="text-base font-semibold text-gray-900">{product.stock} units</div>
                        </div>
                    </div>

                    {/* Discount banner */}
                    {hasDiscount && (
                        <div className="mt-2.5 bg-amber-50 rounded-xl px-4 py-2.5 flex items-center gap-2.5">
                            <svg className="w-4 h-4 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                            </svg>
                            <span className="text-sm font-medium text-amber-800">{discountLabel}</span>
                            <span className="text-sm text-amber-600">
                                {product.discountType === "percentage" ? "percentage discount" : "fixed discount"} applied
                            </span>
                            <span className="ml-auto text-sm text-amber-500 line-through">${product.basePrice.toFixed(2)}</span>
                        </div>
                    )}

                    {/* Description */}
                    <div className="mt-5">
                        <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Description</div>
                        <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
                    </div>

                    {/* Shipping & date */}
                    <div className="grid grid-cols-2 gap-2.5 mt-5">
                        <div className="bg-gray-50 rounded-xl px-3.5 py-3 flex items-start gap-2">
                            <svg className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                            </svg>
                            <div>
                                <div className="text-xs text-gray-400 mb-0.5">Shipping</div>
                                <div className="text-sm font-semibold text-gray-900">${product.shippingAmount.toFixed(2)}</div>
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-xl px-3.5 py-3 flex items-start gap-2">
                            <svg className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
                            </svg>
                            <div>
                                <div className="text-xs text-gray-400 mb-0.5">Added</div>
                                <div className="text-sm font-semibold text-gray-900">
                                    {new Date(product.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Attributes */}
                    {product.attributes.filter((a) => a.key).length > 0 && (
                        <div className="mt-5">
                            <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Attributes</div>
                            <div className="border border-gray-100 rounded-xl overflow-hidden divide-y divide-gray-100">
                                {product.attributes.filter((a) => a.key).map((attr, i) => (
                                    <div key={i} className="flex justify-between items-center px-4 py-2.5">
                                        <span className="text-sm text-gray-500">{attr.key}</span>
                                        <span className="text-sm font-medium text-gray-900">{attr.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex justify-end gap-2.5 rounded-b-3xl">
                    <button
                        onClick={onDelete}
                        className="px-4 py-2 rounded-xl border border-red-200 text-red-500 text-sm font-medium hover:bg-red-50 transition-colors flex items-center gap-1.5"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        Delete
                    </button>
                    <button
                        onClick={() => { }}
                        className="px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-1.5"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                        </svg>
                        Edit product
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPopup;