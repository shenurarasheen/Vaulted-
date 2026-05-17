"use client";

import Image from "next/image";
import { useState } from "react";
import { Edit2, CheckCircle } from "lucide-react";

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "Shenura",
        lastName: "Rasheen",
        email: "shenurarasheen@gmail.com",
        phone: "+1 (555) 123-4567",
        addressLine1: "Arachchigoda",
        addressLine2: "Welipitimodara, Gintota",
        city: "Galle",
        postalCode: "80000",
        country: "Sri Lanka"
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = () => {
        setIsEditing(false);
        // API call would go here
    };

    return (
        <div className="w-full bg-gray-50 min-h-screen p-8">
            {/* Profile Header Section */}
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <Image
                                src={`https://ui-avatars.com/api/?name=Shenura+Rasheen&background=random&size=128`}
                                alt="User profile image"
                                width={96}
                                height={96}
                                className="rounded-full border-4 border-blue-100"
                            />
                            <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors shadow-md">
                                <Edit2 size={16} />
                            </button>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{formData.firstName} {formData.lastName}</h1>
                            <p className="text-gray-500 mt-1">{formData.email}</p>
                            <div className="flex items-center gap-2 mt-3">
                                <CheckCircle size={16} className="text-green-600" />
                                <span className="text-sm text-green-600 font-medium">Profile verified</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className={`px-6 py-2 rounded-lg font-medium transition-all ${
                            isEditing
                                ? "bg-red-50 text-red-600 hover:bg-red-100"
                                : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                        }`}
                    >
                        {isEditing ? "Cancel" : "Edit Profile"}
                    </button>
                </div>
            </div>

            {/* Personal Information Section */}
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                    Personal Information
                </h2>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={formData.firstName}
                                onChange={(e) => handleInputChange("firstName", e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter first name"
                            />
                        ) : (
                            <p className="text-gray-900 font-medium">{formData.firstName}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={formData.lastName}
                                onChange={(e) => handleInputChange("lastName", e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter last name"
                            />
                        ) : (
                            <p className="text-gray-900 font-medium">{formData.lastName}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                        {isEditing ? (
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter email"
                            />
                        ) : (
                            <p className="text-gray-900 font-medium">{formData.email}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                        {isEditing ? (
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter phone number"
                            />
                        ) : (
                            <p className="text-gray-900 font-medium">{formData.phone}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Address Information Section */}
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                    Address Information
                </h2>
                <div className="grid grid-cols-1 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Address Line 1</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={formData.addressLine1}
                                onChange={(e) => handleInputChange("addressLine1", e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter street address"
                            />
                        ) : (
                            <p className="text-gray-900 font-medium">{formData.addressLine1}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Address Line 2</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={formData.addressLine2}
                                onChange={(e) => handleInputChange("addressLine2", e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter apartment, suite, etc."
                            />
                        ) : (
                            <p className="text-gray-900 font-medium">{formData.addressLine2}</p>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={formData.city}
                                onChange={(e) => handleInputChange("city", e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter city"
                            />
                        ) : (
                            <p className="text-gray-900 font-medium">{formData.city}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Postal Code</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={formData.postalCode}
                                onChange={(e) => handleInputChange("postalCode", e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter postal code"
                            />
                        ) : (
                            <p className="text-gray-900 font-medium">{formData.postalCode}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={formData.country}
                                onChange={(e) => handleInputChange("country", e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter country"
                            />
                        ) : (
                            <p className="text-gray-900 font-medium">{formData.country}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
                <div className="flex gap-4 justify-end">
                    <button
                        onClick={() => setIsEditing(false)}
                        className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md"
                    >
                        Save Changes
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;