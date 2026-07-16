"use client";

import { ImagePlus, LoaderCircle, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type DiscountType = "none" | "percentage" | "fixed";

type AddProductPopupProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: FormData) => void | Promise<void>;
    initialData?: ProductProps | null;
    isLoading: boolean;
}

const NUMERIC_FIELDS = ["basePrice", "stock", "shippingAmount", "discountValue"] as const;
const CLOUDINARY_BASE_URL = process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL;
const EMPTY_IMAGES = [null, null, null, null] as const;

const createEmptyFormData = (): ProductFormData => ({
    images: [...EMPTY_IMAGES],
    title: "",
    description: "",
    basePrice: 0,
    discountType: "none",
    discountValue: 0,
    category: "",
    attributes: [{ key: "", value: "" }],
    stock: 0,
    shippingAmount: 0,
});

const normalizeImages = (images?: (string | null)[]) => {
    const nextImages = [...(images?.slice(0, 4) ?? []), ...EMPTY_IMAGES];
    return nextImages.slice(0, 4);
};

const createInitialFormData = (initialData?: ProductProps | null): ProductFormData => {
    if (!initialData) {
        return createEmptyFormData();
    }

    return {
        images: normalizeImages(initialData.imageUrls),
        title: initialData.title,
        description: initialData.description,
        basePrice: initialData.basePrice,
        discountType: initialData.discountType,
        discountValue: initialData.discountValue,
        category: initialData.category,
        attributes: initialData.attributes.length > 0 ? initialData.attributes : [{ key: "", value: "" }],
        stock: initialData.stock,
        shippingAmount: initialData.shippingAmount,
    };
};

const AddProductPopup = ({ isOpen, onClose, onSubmit, initialData, isLoading }: AddProductPopupProps) => {
    const [imageFiles, setImageFiles] = useState<(File | null)[]>([null, null, null, null]);
    const [formData, setFormData] = useState<ProductFormData>(() => createInitialFormData(initialData));

    // Field-level error messages keyed by ProductFormData field
    const [errors, setErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({});

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        const isNumeric = (NUMERIC_FIELDS as readonly string[]).includes(name);
        setFormData((prev) => ({
            ...prev,
            [name]: isNumeric ? (value === "" ? 0 : Number(value)) : value,
        }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof ProductFormData, string>> = {};

        const isInvalidateImages = formData.images.some((img) => img === null);
        if (isInvalidateImages) {
            newErrors.images = "All 4 images are required.";
        }
        if (formData.title.trim() === "") {
            newErrors.title = "Title is required.";
        }
        if (formData.description.trim() === "") {
            newErrors.description = "Description is required.";
        }
        if (formData.basePrice <= 0) {
            newErrors.basePrice = "Base price must be greater than 0.";
        }
        if (formData.stock < 0) {
            newErrors.stock = "Stock must be 0 or greater.";
        }
        if (formData.discountType != "none" && formData.discountValue <= 0) {
            newErrors.discountValue = "Discount value must be greater than 0.";
        }
        if (formData.discountType === "percentage" && formData.discountValue >= 100) {
            newErrors.discountValue = "Discount percentage must be less than 100.";
        }
        if (formData.category.trim() === "") {
            newErrors.category = "Category is required.";
        }
        const isInvalidAttributes = formData.attributes.some(
            (a) => (a.key.trim() === "") || (a.value.trim() === "")
        );
        if (isInvalidAttributes) {
            newErrors.attributes = "Attribute key and value must not be empty.";
        }
        if (formData.shippingAmount < 0) {
            newErrors.shippingAmount = "Shipping amount must be 0 or greater.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImageFiles((prev) => {
            const next = [...prev];
            next[index] = file;
            return next;
        });

        const url = URL.createObjectURL(file);
        setFormData((prev) => ({
            ...prev,
            images: prev.images.map((image, imageIndex) => (imageIndex === index ? url : image)),
        }));

        setErrors((prev) => ({ ...prev, images: undefined }));
    };

    const removeImage = (index: number) => {

        setImageFiles((prev) => {
            const next = [...prev];
            next[index] = null;
            return next;
        });

        setFormData((prev) => ({
            ...prev,
            images: prev.images.map((image, imageIndex) => (imageIndex === index ? null : image)),
        }));
    };

    const addAttribute = () => {
        setFormData((prev) => ({
            ...prev,
            attributes: [...prev.attributes, { key: "", value: "" }],
        }));
    };

    const removeAttribute = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            attributes: prev.attributes.filter((_, i) => i !== index),
        }));
    };

    const updateAttribute = (index: number, field: "key" | "value", val: string) => {
        setFormData((prev) => ({
            ...prev,
            attributes: prev.attributes.map((a, i) =>
                i === index ? { ...a, [field]: val } : a,
            ),
        }));
        setErrors((prev) => ({ ...prev, attributes: undefined }));
    };

    // Need to append data to a FormData object before send
    const handleSubmit = () => {
        if (!validateForm()) {
            return;
        }

        const productFormData = new FormData();
        // Append image files to FormData
        imageFiles.forEach((file) => {
            if (file && file instanceof File) {
                productFormData.append("images", file as File);
            }
        });

        const cleanedAttributes = formData.attributes.filter((a) => a.key.trim() !== "");
        productFormData.append("attributes", JSON.stringify(cleanedAttributes));

        productFormData.append("title", formData.title);
        productFormData.append("description", formData.description);
        productFormData.append("basePrice", String(formData.basePrice));
        productFormData.append("discountType", formData.discountType);
        productFormData.append("discountValue", String(formData.discountType === "none" ? 0 : formData.discountValue));
        productFormData.append("category", formData.category);
        productFormData.append("stock", String(formData.stock));
        productFormData.append("shippingAmount", String(formData.shippingAmount));

        console.log("Submitting product form data:", productFormData.getAll("images"), productFormData.get("attributes"), productFormData.get("title"), productFormData.get("description"), productFormData.get("basePrice"), productFormData.get("discountType"), productFormData.get("discountValue"), productFormData.get("category"), productFormData.get("stock"), productFormData.get("shippingAmount"));

        onSubmit(productFormData);
    };

    // If isOpen false, then return null to close the popup
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto hide-scrollbar">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10 rounded-t-3xl">
                    <h2 className="text-lg font-semibold text-gray-900">Add product</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                        aria-label="Close"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5 flex flex-col gap-5">

                    {/* Images */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Product images <span className="text-gray-400 font-normal">(up to 4)</span>
                        </label>

                        <div className="grid grid-cols-4 gap-2">
                            {formData.images.map((img, i) => (
                                <div key={i} className="relative aspect-square">
                                    {img ? (
                                        <>
                                            <Image
                                                src={img.startsWith("blob:") ? img : `${CLOUDINARY_BASE_URL}/${img}`}
                                                width={100}
                                                height={100}
                                                alt={`Product ${i + 1}`}
                                                className="w-full h-full object-cover rounded-xl border border-gray-200"
                                            />
                                            <button
                                                onClick={() => removeImage(i)}
                                                className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs"
                                                aria-label="Remove image"
                                            >
                                                <X size={12} color="white" />
                                            </button>
                                        </>
                                    ) : (
                                        <label className="w-full h-full flex items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
                                            <ImagePlus size={24} className="text-gray-400" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => handleImageUpload(i, e)}
                                            />
                                        </label>
                                    )}
                                </div>
                            ))}
                        </div>
                        {errors.images && (
                            <p className="mt-1 text-xs text-red-500">{errors.images}</p>
                        )}
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="e.g. Wireless headphones"
                            aria-invalid={!!errors.title}
                            className={`w-full px-3 py-2 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-gray-900/10 outline-none text-sm transition-all ${errors.title ? "border-red-300" : "border-gray-200 focus:border-gray-300"}`}
                        />
                        {errors.title && (
                            <p className="mt-1 text-xs text-red-500">{errors.title}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={4}
                            placeholder="Describe the product..."
                            aria-invalid={!!errors.description}
                            className={`w-full px-3 py-2 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-gray-900/10 outline-none text-sm resize-none transition-all ${errors.description ? "border-red-300" : "border-gray-200 focus:border-gray-300"}`}
                        />
                        {errors.description && (
                            <p className="mt-1 text-xs text-red-500">{errors.description}</p>
                        )}
                    </div>

                    {/* Price & Stock */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Base price</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                                <input
                                    type="number"
                                    name="basePrice"
                                    value={formData.basePrice === 0 ? "" : formData.basePrice}
                                    onChange={handleInputChange}
                                    placeholder="0.00"
                                    aria-invalid={!!errors.basePrice}
                                    className={`w-full pl-7 pr-3 py-2 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-gray-900/10 outline-none text-sm transition-all ${errors.basePrice ? "border-red-300" : "border-gray-200 focus:border-gray-300"}`}
                                />
                            </div>
                            {errors.basePrice && (
                                <p className="mt-1 text-xs text-red-500">{errors.basePrice}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Stock</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock === 0 ? "" : formData.stock}
                                onChange={handleInputChange}
                                placeholder="0"
                                aria-invalid={!!errors.stock}
                                className={`w-full px-3 py-2 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-gray-900/10 outline-none text-sm transition-all ${errors.stock ? "border-red-300" : "border-gray-200 focus:border-gray-300"}`}
                            />
                            {errors.stock && (
                                <p className="mt-1 text-xs text-red-500">{errors.stock}</p>
                            )}
                        </div>
                    </div>

                    {/* Discount type & value */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Discount type</label>
                            <select
                                name="discountType"
                                value={formData.discountType}
                                onChange={(e) => {
                                    const value = e.target.value as DiscountType;
                                    setFormData((prev) => ({
                                        ...prev,
                                        discountType: value,
                                        discountValue: 0,
                                    }));
                                    setErrors((prev) => ({
                                        ...prev,
                                        discountType: undefined,
                                        discountValue: undefined,
                                    }));
                                }}
                                className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 outline-none text-sm transition-all"
                            >
                                <option value="none">None</option>
                                <option value="percentage">Percentage</option>
                                <option value="fixed">Fixed amount</option>
                            </select>
                        </div>

                        {formData.discountType !== "none" && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    {formData.discountType === "percentage" ? "Discount (%)" : "Discount amount ($)"}
                                </label>
                                <div className="relative">
                                    {formData.discountType === "fixed" && (
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                                    )}
                                    <input
                                        type="number"
                                        name="discountValue"
                                        value={formData.discountValue === 0 ? "" : formData.discountValue}
                                        onChange={handleInputChange}
                                        placeholder={formData.discountType === "percentage" ? "0" : "0.00"}
                                        aria-invalid={!!errors.discountValue}
                                        className={`w-full ${formData.discountType === "fixed" ? "pl-7" : "px-3"} pr-3 py-2 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-gray-900/10 outline-none text-sm transition-all ${errors.discountValue ? "border-red-300" : "border-gray-200 focus:border-gray-300"}`}
                                        min={0}
                                        max={formData.discountType === "percentage" ? 99 : undefined}
                                    />
                                    {formData.discountType === "percentage" && (
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
                                    )}
                                </div>
                                {errors.discountValue && (
                                    <p className="mt-1 text-xs text-red-500">{errors.discountValue}</p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            aria-invalid={!!errors.category}
                            className={`w-full px-3 py-2 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-gray-900/10 outline-none text-sm transition-all ${errors.category ? "border-red-300" : "border-gray-200 focus:border-gray-300"}`}
                        >
                            <option value="">Select a category</option>
                            <option value="electronics">Electronics</option>
                            <option value="apparel">Apparel</option>
                            <option value="home">Home & living</option>
                            <option value="beauty">Beauty</option>
                            <option value="sports">Sports & outdoors</option>
                        </select>
                        {errors.category && (
                            <p className="mt-1 text-xs text-red-500">{errors.category}</p>
                        )}
                    </div>

                    {/* Shipping */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Shipping amount</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                            <input
                                type="number"
                                name="shippingAmount"
                                value={formData.shippingAmount === 0 ? "" : formData.shippingAmount}
                                onChange={handleInputChange}
                                placeholder="0.00"
                                min={0}
                                aria-invalid={!!errors.shippingAmount}
                                className={`w-full pl-7 pr-3 py-2 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-gray-900/10 outline-none text-sm transition-all ${errors.shippingAmount ? "border-red-300" : "border-gray-200 focus:border-gray-300"}`}
                            />
                        </div>
                        {errors.shippingAmount && (
                            <p className="mt-1 text-xs text-red-500">{errors.shippingAmount}</p>
                        )}
                    </div>

                    {/* Attributes */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Attributes</label>
                        <div className="flex flex-col gap-2">
                            {formData.attributes.map((attr, i) => (
                                <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2">
                                    <input
                                        type="text"
                                        value={attr.key}
                                        onChange={(e) => updateAttribute(i, "key", e.target.value)}
                                        placeholder="Key (e.g. Color)"
                                        className="px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 outline-none text-sm transition-all"
                                    />
                                    <input
                                        type="text"
                                        value={attr.value}
                                        onChange={(e) => updateAttribute(i, "value", e.target.value)}
                                        placeholder="Value (e.g. Black)"
                                        className="px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 outline-none text-sm transition-all"
                                    />
                                    <button
                                        onClick={() => removeAttribute(i)}
                                        disabled={formData.attributes.length === 1}
                                        className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                        aria-label="Remove attribute"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                        {errors.attributes && (
                            <p className="mt-1 text-xs text-red-500">{errors.attributes}</p>
                        )}
                        <button
                            onClick={addAttribute}
                            className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Add attribute
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex justify-end gap-3 rounded-b-3xl">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-xl border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors"
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className={`px-5 py-2 rounded-xl text-white font-medium text-sm transition-colors ${isLoading ? "bg-gray-600" : "bg-gray-900 hover:bg-gray-800"}`}
                    >
                        { isLoading ? (
                            <span className="flex items-center gap-2">
                                <LoaderCircle size={16} className="animate-spin" />
                                {initialData ? "Updating..." : "Adding..."}
                            </span>
                        ) : initialData ? "Update Product" : "Add Product"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProductPopup;