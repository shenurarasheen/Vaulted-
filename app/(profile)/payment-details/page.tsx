"use client";

import VirtualCreditCard from "@/components/CreditCard";
import ShippingAddressCard from "@/components/ShippingAddressCard";
import { MapPin, Plus, Trash2, Edit2, CheckCircle, CreditCard } from "lucide-react";
import { useState } from "react";

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

    const [shippingAddresses, setShippingAddresses] = useState([
        {
            id: 1,
            name: "Home Address",
            street: "123 Main Street",
            city: "Galle",
            postalCode: "80000",
            country: "Sri Lanka",
            phone: "+1 (555) 123-4567",
            isDefault: true
        },
        {
            id: 2,
            name: "Work Address",
            street: "456 Business Ave, Suite 200",
            city: "Colombo",
            postalCode: "00100",
            country: "Sri Lanka",
            phone: "+1 (555) 987-6543",
            isDefault: false
        },
        {
            id: 3,
            name: "Vacation Home",
            street: "789 Beach Road",
            city: "Mirissa",
            postalCode: "81000",
            country: "Sri Lanka",
            phone: "+1 (555) 456-7890",
            isDefault: false
        }
    ]);

    const getCardColor = (cardType: string) => {
        switch (cardType) {
            case "Visa":
                return "from-blue-300 to-blue-400";
            case "Mastercard":
                return "from-red-300 to-orange-400";
            case "American Express":
                return "from-green-300 to-emerald-400";
            default:
                return "from-gray-300 to-gray-400";
        }
    };

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
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium">
                        <Plus size={20} />
                        Add Address
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {shippingAddresses.map((address) => (
                        <ShippingAddressCard key={address.id} address={address} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PaymentDetailsPage;