"use client";

import { useEffect, useState } from "react";
import ProfileHeader from "@/components/ProfileHeader";
import EditableField from "@/components/EditableField";
import api from "@/lib/api";
import toast from "react-hot-toast";

type ProfileData = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    profilePicUrl: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    postalCode: string;
    country: string;
};

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<ProfileData>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        profilePicUrl: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        postalCode: "",
        country: ""
    });

    const [hasAddress, setHasAddress] = useState<boolean>(false);

    const personalInfoFields = [
        { label: "First Name", field: "firstName", type: "text", placeholder: "Enter first name" },
        { label: "Last Name", field: "lastName", type: "text", placeholder: "Enter last name" },
        { label: "Email Address", field: "email", type: "email", placeholder: "Enter email" },
        { label: "Phone Number", field: "phone", type: "tel", placeholder: "Enter phone number" }
    ];

    const addressInfoFields = [
        { label: "Address Line 1", field: "addressLine1", type: "text", placeholder: "Enter street address", gridCols: "col-span-full" },
        { label: "Address Line 2", field: "addressLine2", type: "text", placeholder: "Enter apartment, suite, etc.", gridCols: "col-span-full" },
        { label: "City", field: "city", type: "text", placeholder: "Enter city", gridCols: "col-span-1" },
        { label: "Postal Code", field: "postalCode", type: "text", placeholder: "Enter postal code", gridCols: "col-span-1" },
        { label: "Country", field: "country", type: "text", placeholder: "Enter country", gridCols: "col-span-1" },
    ];

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = async () => {
        setIsEditing(false);

        try {
            const res = await api.put("/profile/update-profile", formData, { withCredentials: true });
            const data = res.data;

            if (data.success) {
               const updatedProfileData = data.data;

               const { addresses, permanentAddressId, ...personalInfo } = updatedProfileData;
               if (addresses) {
                    const permanentAddress = addresses[permanentAddressId];

                    if (permanentAddress) {
                        setFormData({
                            ...personalInfo,
                            addressLine1: permanentAddress.addressLine1,
                            addressLine2: permanentAddress.addressLine2,
                            city: permanentAddress.city,
                            postalCode: permanentAddress.postalCode,
                            country: permanentAddress.country
                        });
                        setHasAddress(true);
                        setIsEditing(false);
                    }
               }
               
            } else {
                toast.error("Failed to update profile. Please try again.");
            }

        } catch (error) {
        }
    };

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const res = await api.get("/profile/profile-details", { withCredentials: true });
                const data = res.data;

                if (data.success && data.data) {

                    const profileData = data.data;

                    setFormData({
                        firstName: profileData.firstName,
                        lastName: profileData.lastName,
                        email: profileData.email,
                        phone: profileData.mobile || "-",
                        profilePicUrl: profileData.profilePicUrl,
                        addressLine1: profileData.permanentAddress?.line1 || "",
                        addressLine2: profileData.permanentAddress?.line2 || "",
                        city: profileData.permanentAddress?.city || "",
                        postalCode: profileData.permanentAddress?.postalCode || "",
                        country: profileData.permanentAddress?.country || ""
                    });

                    setHasAddress(!!profileData.permanentAddress);

                }
            } catch (error) {
            }
        }
        fetchProfileData();
    }, []);

    return (
        <div className="w-full bg-gray-50 min-h-screen p-8">

            {/* Profile Header Section */}
            <ProfileHeader setIsEditing={setIsEditing} isEditing={isEditing} formData={formData} />

            {/* Personal Information Section */}
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                    Personal Information
                </h2>
                <div className="grid grid-cols-2 gap-6">

                    {
                        personalInfoFields.map((field, index) => (
                            <div key={index}>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">{field.label}</label>
                                <EditableField
                                    isEditing={isEditing}
                                    field={field.field}
                                    placeholder={field.placeholder}
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                />
                            </div>
                        ))
                    }

                </div>
            </div>

            {/* Address Information Section */}
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                    Address Information
                </h2>

                {(isEditing || hasAddress) ? (
                    <div className="grid grid-cols-3 gap-6 mb-6">

                        {
                            addressInfoFields.map((field, index) => (
                                <div key={index} className={field.gridCols}>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">{field.label}</label>
                                    <EditableField
                                        isEditing={isEditing}
                                        field={field.field}
                                        placeholder={field.placeholder}
                                        formData={formData}
                                        handleInputChange={handleInputChange}
                                    />
                                </div>
                            ))
                        }

                    </div>
                ) : (
                    <p className="text-gray-500">No address information available.</p>
                )}

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