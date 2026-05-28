"use client";

import { X } from "lucide-react";
import { useState } from "react";

interface AddAddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (address: AddressFormData) => void;
}

interface AddressFormData {
    addressLine1: string;
    addressLine2: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
}

const AddAddressModal = ({ isOpen, onClose, onSubmit }: AddAddressModalProps) => {
    const [formData, setFormData] = useState<AddressFormData>({
        addressLine1: "",
        addressLine2: "",
        city: "",
        postalCode: "",
        country: "United States",
        phone: ""
    });

    const [errors, setErrors] = useState<Partial<AddressFormData>>({});

    const validateForm = () => {
        const newErrors: Partial<AddressFormData> = {};

        if (!formData.addressLine1.trim()) {
            newErrors.addressLine1 = "Address Line 1 is required";
        }
        if (!formData.addressLine2.trim()) {
            newErrors.addressLine2 = "Address Line 2 is required";
        }
        if (!formData.city.trim()) {
            newErrors.city = "City is required";
        }
        if (!formData.postalCode.trim()) {
            newErrors.postalCode = "Postal Code is required";
        }
        if (!formData.country) {
            newErrors.country = "Country is required";
        }
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name as keyof AddressFormData]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
            setFormData({
                addressLine1: "",
                addressLine2: "",
                city: "",
                postalCode: "",
                country: "United States",
                phone: ""
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white px-5 py-4 flex items-center justify-between border-b border-gray-100">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Add New Address</h2>
                        <p className="text-sm text-gray-500 mt-0.5">Fill in your address details</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                    {/* Address Line 1 */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Address Line 1 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="addressLine1"
                            value={formData.addressLine1}
                            onChange={handleInputChange}
                            placeholder="Enter your street address"
                            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none transition-all ${
                                errors.addressLine1
                                    ? "border-red-500 bg-red-50"
                                    : "border-gray-300 focus:border-blue-600 hover:border-gray-400"
                            }`}
                        />
                        {errors.addressLine1 && (
                            <p className="text-red-500 text-xs mt-0.5">{errors.addressLine1}</p>
                        )}
                    </div>

                    {/* Address Line 2 */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Address Line 2 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="addressLine2"
                            value={formData.addressLine2}
                            onChange={handleInputChange}
                            placeholder="Apartment, suite, etc."
                            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none transition-all ${
                                errors.addressLine2
                                    ? "border-red-500 bg-red-50"
                                    : "border-gray-300 focus:border-blue-600 hover:border-gray-400"
                            }`}
                        />
                        {errors.addressLine2 && (
                            <p className="text-red-500 text-xs mt-0.5">{errors.addressLine2}</p>
                        )}
                    </div>

                    {/* City and Postal Code */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                City <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                placeholder="Enter city name"
                                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none transition-all ${
                                    errors.city
                                        ? "border-red-500 bg-red-50"
                                        : "border-gray-300 focus:border-blue-600 hover:border-gray-400"
                                }`}
                            />
                            {errors.city && (
                                <p className="text-red-500 text-xs mt-0.5">{errors.city}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Postal Code <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleInputChange}
                                placeholder="Enter postal code"
                                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none transition-all ${
                                    errors.postalCode
                                        ? "border-red-500 bg-red-50"
                                        : "border-gray-300 focus:border-blue-600 hover:border-gray-400"
                                }`}
                            />
                            {errors.postalCode && (
                                <p className="text-red-500 text-xs mt-0.5">{errors.postalCode}</p>
                            )}
                        </div>
                    </div>

                    {/* Country and Phone */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Country <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                placeholder="Enter country name"
                                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none transition-all ${
                                    errors.country
                                        ? "border-red-500 bg-red-50"
                                        : "border-gray-300 focus:border-blue-600 hover:border-gray-400"
                                }`}
                            />
                            {errors.country && (
                                <p className="text-red-500 text-xs mt-0.5">{errors.country}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Phone <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="Enter phone number"
                                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none transition-all ${
                                    errors.phone
                                        ? "border-red-500 bg-red-50"
                                        : "border-gray-300 focus:border-blue-600 hover:border-gray-400"
                                }`}
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-xs mt-0.5">{errors.phone}</p>
                            )}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-gray-200 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-semibold text-sm rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-sm rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
                        >
                            Add Address
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAddressModal;
