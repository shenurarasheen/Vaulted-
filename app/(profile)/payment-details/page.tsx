"use client";

import VirtualCreditCard from "@/components/CreditCard";
import ShippingAddressCard from "@/components/ShippingAddressCard";
import AddAddressModal from "@/components/AddAddressModal";
import api from "@/lib/api";
import { MapPin, Plus, CreditCard } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const PaymentDetailsPage = () => {

    const [savedCards, setSavedCards] = useState<CreditCardProps[]>([
        {
            id: 1,
            cardHolder: "Shenura Rasheen",
            cardNumber: "4532 •••• •••• 1289",
            expiryDate: "12/26",
            cardType: "Visa",
            isDefault: true,
            lastUsed: "May 15, 2026"
        },
        {
            id: 2,
            cardHolder: "Shenura Rasheen",
            cardNumber: "5425 •••• •••• 4010",
            expiryDate: "08/27",
            cardType: "Mastercard",
            isDefault: false,
            lastUsed: "April 28, 2026"
        },
        {
            id: 3,
            cardHolder: "Shenura Rasheen",
            cardNumber: "3782 •••• •••• 8220",
            expiryDate: "06/25",
            cardType: "American Express",
            isDefault: false,
            lastUsed: "March 10, 2026"
        }
    ]);

    const [shippingAddresses, setShippingAddresses] = useState<ShippingAddress[]>([]);
    const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editingAddressId, setEditingAddressId] = useState<string>("")


    useEffect(() => {
        const fetchShippingAddresses = async () => {
            try {
                const res = await api.get("/profile/payment-details", { withCredentials: true });
                const data = res.data;

                if (data.success) {
                    const fetchedAddresses = data.data as ShippingAddress[];
                    setShippingAddresses(fetchedAddresses);
                } else {
                    toast.error("Failed to fetch user addresses.");
                }
            } catch (error) {
            }
        }
        fetchShippingAddresses();
    }, []);



    // Function to handle adding a new address
    const handleAddAddress = async (formData: AddressFormData) => {
        try {
            const res = await api.post("/profile/save-address", formData, { withCredentials: true });
            const data = res.data;
            if (data.success) {
                const newAddress = data.data as ShippingAddress;

                setShippingAddresses(prevAddresses => [...prevAddresses, newAddress]);
                setIsAddAddressModalOpen(false);

                toast.success("Address saved succesfully!");
            } else {
                toast.error("Failed to add user address. Please try again later.");
            }
        } catch (error) {
        }
    };



    // Function to handle deleting an address
    const handleAddressDelete = async (addressId: string) => {
        try {
            const res = await api.delete(`profile/delete-address/${addressId}`, { withCredentials: true });
            const data = res.data;

            if (data.success) {

                // remove the address from the state
                setShippingAddresses(prevAddresses => prevAddresses.filter(address => address.addressId !== addressId));
                toast.success(data.data.message || "Address deleted successfully!");

            } else {
                toast.error("Failed to delete the address.");
            }
        } catch (error) {
        }
    }



    // Function to handle update address
    const handleAddressUpdate = async (formData: AddressFormData, addressId: string) => {
        const res = await api.put(`profile/update-address/${addressId}`, formData, { withCredentials: true });
        const data = res.data;

        if (data.success) {
            const updatedAddress = data.data as ShippingAddress;
            if (updatedAddress) {
                setShippingAddresses(prevAddresses => prevAddresses.map(address => address.addressId === updatedAddress.addressId ? updatedAddress : address));
                setIsAddAddressModalOpen(false);
                console.log(updatedAddress);
                toast.success(data.message ||"Address updated successfully!");
            } else {
                toast.error("Failed to update the address.");
            }

        } else {
            toast.error("Failed to update the address.");
        }
    }



    // Function to open the edit address modal
    const openEditAddressModal = (addressId: string) => {
        const address = shippingAddresses.find(address => address.addressId === addressId);
        if (address) {
            setIsAddAddressModalOpen(true);
            setEditingAddressId(addressId);
            setIsEditing(true);
        } else {
            toast.error("Address not found.");
        }
    }



    return (
        <div className="w-full bg-gray-50 min-h-screen p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Payment & Addresses</h1>
                <p className="text-gray-600 mt-2">Manage your payment methods and shipping addresses</p>
            </div>

            {/* Saved Payment Methods Section */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                        <CreditCard className="text-blue-600" size={28} />
                        Saved Payment Methods
                    </h2>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium">
                        <Plus size={20} />
                        Add Card
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedCards.map((card) => (
                        <VirtualCreditCard key={card.id} card={card} />
                    ))}
                </div>
            </div>

            {/* Saved Addresses Section */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                        <MapPin className="text-blue-600" size={28} />
                        Shipping Addresses
                    </h2>
                    <button
                        onClick={() => {
                            setIsAddAddressModalOpen(true);
                            setIsEditing(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium"
                    >
                        <Plus size={20} />
                        Add Address
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        shippingAddresses.length > 0 ? (
                            shippingAddresses.map(address => (
                                <ShippingAddressCard
                                    key={address.addressId}
                                    addressId={address.addressId}
                                    address={address}
                                    handleAddressDelete={handleAddressDelete}
                                    openEditAddressModal={openEditAddressModal}
                                />
                            )
                            )) : (
                            <div className="col-span-3">
                                <p className="text-center my-10 text-gray-500 text-lg font-semibold">No shipping Address Added</p>
                            </div>
                        )

                    }
                </div>
            </div>

            <AddAddressModal
                isOpen={isAddAddressModalOpen}
                onClose={() => setIsAddAddressModalOpen(false)}
                onSubmit={(formData) => {
                    if (isEditing && editingAddressId) {
                        handleAddressUpdate(formData, editingAddressId);
                    } else {
                        handleAddAddress(formData);
                    }
                }}
                mode={isEditing ? "edit" : "add"}
                initialData={isEditing ? shippingAddresses.find(address => address.addressId === editingAddressId) : undefined}
                addressId={isEditing ? editingAddressId : undefined}
            />

        </div>
    );
};

export default PaymentDetailsPage;