"use client";

import { useState } from "react";
import CheckoutAddressDetails from "./CheckoutAddressDetails";
import CheckoutOrderItems from "./CheckoutOrderitems";
import CheckoutPaymentDetails from "./CheckoutPaymentDetails";
import CheckoutTotalAmountSection from "./CheckoutTotalAmountSection";
import api from "@/lib/api";

declare global {
  interface Window {
    payhere: any;
  }
}

const CheckoutPageContent = ({ permanentAddressId, userAddresses, cartItems, subtotal, shipping, tax, total }: { permanentAddressId: string, userAddresses: AddressProps[], cartItems: CartItemProps[], subtotal: number, shipping: number, tax: number, total: number }) => {
    const [selectedAddressId, setSelectedAddressId] = useState(permanentAddressId);

    const handlePlaceOrder = async () => {
        try {
            const res = await api.post("/checkout/payment/place-order", { selectedAddressId }, { withCredentials: true });
            const data = res.data;
            if (data.success) {
                const paymentData = await data.data;

                window.payhere.onCompleted = (orderId: string) => {
                    //alert(`Subscription authorization completed for order: ${orderId}`);
                    window.location.assign("/orders")
                };

                window.payhere.onDismissed = () => {
                    console.warn('Checkout closed by user');
                };

                window.payhere.onError = (error: string) => {
                    console.error('PayHere Error:', error);
                };

                window.payhere.startPayment(paymentData);
            }
        } catch (error) {
            // Errors already handled by interceptor
            console.log("Checkout error: ", error);
        }
    }

    return (
        <div className="flex gap-8 mt-6 max-lg:flex-col">
            <div className="lg:w-3/5 flex flex-col gap-6">

                <CheckoutAddressDetails
                    permanentAddressId={permanentAddressId}
                    userAddresses={userAddresses}
                    selectedAddress={selectedAddressId}
                    setSelectedAddress={setSelectedAddressId}
                />

                <CheckoutPaymentDetails />

                <CheckoutOrderItems orderItems={cartItems} />
            </div>

            <div className="lg:w-2/5">
                <CheckoutTotalAmountSection
                    subtotal={subtotal}
                    shipping={shipping}
                    tax={tax}
                    total={total}
                    handlePlaceOrder={handlePlaceOrder}
                />
            </div>
        </div>
    )
}

export default CheckoutPageContent;