'use client'

import Image from "next/image";
import { useState } from "react";

const SAVED_CARDS = [
    { id: "card-1", brand: "visa", last4: "4242", expiry: "08/27" },
    { id: "card-2", brand: "mastercard", last4: "8210", expiry: "01/26" },
];

const PayPalBadge = () => {
    return (
        <Image
            src="/images/card-icons/paypal-ic.png"
            alt="PayPal"
            width={65}
            height={37}
            className="object-contain"
        />
    );
}

const CardBrandBadge = ({ brand }: { brand: string}) => {
    if (brand === "visa") {
        return (
            <Image
                src="/images/card-icons/visa.png"
                alt="Visa"
                width={40}
                height={32}
                className="object-contain"
            />
        );
    }
    return (
        <Image
            src="/images/card-icons/master.png"
            alt="MasterCard"
            width={40}
            height={32}
            className="object-contain"
        />
    );
}

const CheckoutPaymentDetails = () => {

    const [selectedPayment, setSelectedPayment] = useState("cod");
    const [selectedCardId, setSelectedCardId] = useState(SAVED_CARDS[0].id);

    return (
        <section className="border border-gray-200 rounded-lg p-5">
            <h2 className="text-[15px] font-semibold text-gray-900 mb-4">Payment Method</h2>

            <div className="flex flex-col gap-3">
                {/* Cash on Delivery */}
                <label
                    className={`flex items-start gap-3 border rounded-lg p-4 cursor-pointer transition-colors ${selectedPayment === "cod"
                        ? "border-blue-600 bg-blue-50/40"
                        : "border-gray-200 hover:border-gray-300"
                        }`}
                >
                    <input
                        type="radio"
                        name="payment"
                        checked={selectedPayment === "cod"}
                        onChange={() => setSelectedPayment("cod")}
                        className="mt-1 accent-blue-600"
                    />
                    <div className="text-sm">
                        <p className="font-medium text-gray-900">Cash on Delivery</p>
                        <p className="text-gray-400 mt-0.5">Pay when your order arrives</p>
                    </div>
                </label>

                {/* PayPal */}
                <label
                    className={`flex items-start gap-3 border rounded-lg p-4 cursor-pointer transition-colors ${selectedPayment === "paypal"
                        ? "border-blue-600 bg-blue-50/40"
                        : "border-gray-200 hover:border-gray-300"
                        }`}
                >
                    <input
                        type="radio"
                        name="payment"
                        checked={selectedPayment === "paypal"}
                        onChange={() => setSelectedPayment("paypal")}
                        className="mt-1 accent-blue-600"
                    />
                    <div className="text-sm flex-1">
                        <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900">PayPal</p>
                            <PayPalBadge />
                        </div>
                        <p className="text-gray-400 mt-0.5">
                            You&lsquo;ll be redirected to PayPal to complete payment
                        </p>
                    </div>
                </label>

                {/* Card */}
                <label
                    className={`flex items-start gap-3 border rounded-lg p-4 cursor-pointer transition-colors ${selectedPayment === "card"
                        ? "border-blue-600 bg-blue-50/40"
                        : "border-gray-200 hover:border-gray-300"
                        }`}
                >
                    <input
                        type="radio"
                        name="payment"
                        checked={selectedPayment === "card"}
                        onChange={() => setSelectedPayment("card")}
                        className="mt-1 accent-blue-600"
                    />
                    <div className="text-sm flex-1">
                        <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900">Debit / Credit Card</p>
                            <div className="flex items-center gap-1">
                                <CardBrandBadge brand="visa" />
                                <CardBrandBadge brand="mastercard" />
                            </div>
                        </div>
                        <p className="text-gray-400 mt-0.5">Pay with a card you&lsquo;ve saved</p>
                    </div>
                </label>

                {/* Saved cards — shown only when Card is selected */}
                {selectedPayment === "card" && (
                    <div className="ml-8 flex flex-col gap-2 -mt-1">
                        {SAVED_CARDS.map((card) => (
                            <label
                                key={card.id}
                                className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition-colors ${selectedCardId === card.id
                                    ? "border-blue-600 bg-blue-50/40"
                                    : "border-gray-200 hover:border-gray-300"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="saved_card"
                                    checked={selectedCardId === card.id}
                                    onChange={() => setSelectedCardId(card.id)}
                                    className="accent-blue-600"
                                />
                                <CardBrandBadge brand={card.brand} />
                                <span className="text-sm text-gray-700">•••• •••• •••• {card.last4}</span>
                                <span className="text-xs text-gray-400 ml-auto">Exp {card.expiry}</span>
                            </label>
                        ))}
                        <button className="text-sm text-blue-600 hover:underline text-left mt-1">
                            + Add new card
                        </button>
                    </div>
                )}

                {/* Bank Transfer */}
                <label
                    className={`flex items-start gap-3 border rounded-lg p-4 cursor-pointer transition-colors ${selectedPayment === "bank_transfer"
                        ? "border-blue-600 bg-blue-50/40"
                        : "border-gray-200 hover:border-gray-300"
                        }`}
                >
                    <input
                        type="radio"
                        name="payment"
                        checked={selectedPayment === "bank_transfer"}
                        onChange={() => setSelectedPayment("bank_transfer")}
                        className="mt-1 accent-blue-600"
                    />
                    <div className="text-sm">
                        <p className="font-medium text-gray-900">Bank Transfer</p>
                        <p className="text-gray-400 mt-0.5">Transfer details will be shown after ordering</p>
                    </div>
                </label>
            </div>
        </section>
    )
}

export default CheckoutPaymentDetails;