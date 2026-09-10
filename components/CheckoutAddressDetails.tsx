"use client";

import { useEffect, useState } from "react";

const CheckoutAddressDetails = ({ permanentAddressId, userAddresses }: { permanentAddressId: string; userAddresses: AddressProps[] }) => {
    const [selectedAddressId, setSelectedAddressId] = useState("");

    useEffect(() => {
        const selectDefaultAddress = () => {
            if (permanentAddressId) {
                setSelectedAddressId(permanentAddressId);
            }
        };
        selectDefaultAddress();
    }, [permanentAddressId]);


    return (
        <section className="border border-gray-200 rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-[15px] font-semibold text-gray-900">Shipping Address</h2>
                <button className="text-sm text-blue-600 hover:underline">Add new address</button>
            </div>

            {userAddresses.length === 0 ? (
                <p className="text-sm text-gray-500">No addresses available. Please add a new address.</p>
            ) 
            : 
            (
                <div className="flex flex-col gap-3">
                    {userAddresses.map((address) => (
                        <label
                            key={address.addressId}
                            className={`flex items-start gap-3 border rounded-lg p-4 cursor-pointer transition-colors ${selectedAddressId === address.addressId
                                ? "border-blue-600 bg-blue-50/40"
                                : "border-gray-200 hover:border-gray-300"
                                }`}
                        >
                            <input
                                type="radio"
                                name="address"
                                checked={selectedAddressId === address.addressId}
                                onChange={() => setSelectedAddressId(address.addressId)}
                                className="mt-1 accent-blue-600"
                            />
                            <div className="text-sm">
                                <p className="font-medium text-gray-900">{address.firstName} {address.lastName}</p>
                                <p className="text-gray-500 mt-0.5">
                                    {address.addressLine1}
                                    {address.addressLine2 ? `, ${address.addressLine2}` : ""}, {address.city} {address.postalCode}
                                </p>
                                <p className="text-gray-400 mt-0.5">{address.phone}</p>
                            </div>
                        </label>
                    ))}
                </div>
            )}

        </section>
    )
}

export default CheckoutAddressDetails;