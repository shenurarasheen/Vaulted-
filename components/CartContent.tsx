"use client";

import { useState } from "react";
import CartCard from "@/components/CartCard";
import PaginationBar from "@/components/Pagination";
import PriceDetailsSection from "@/components/PriceDetailsSection";
import Button from "@/components/Button";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import api from "@/lib/api";

type CartContentProps = {
    cartItems: CartItemProps[];
}

const calculateActualItemPrice = (
    basePrice: number,
    discountType: ProductProps["discountType"],
    discountValue: number,
) => {
    if (discountType === "percentage") {
        return basePrice - (basePrice * (discountValue / 100));
    }
    if (discountType === "fixed") {
        return basePrice - discountValue;
    }
    return basePrice;
}

const CartContent = ({cartItems}: CartContentProps) => {
    const [cartItemsState, setCartItemsState] = useState<CartItemProps[]>(cartItems);
    const [quantities, setQuantities] = useState<Record<string, number>>(
        () => Object.fromEntries(cartItems.map((item) => [item._id, item.quantity])),
    );

    const updateQuantity = (cartItemId: string, quantity: number) => {
        setQuantities((currentQuantities) => ({
            ...currentQuantities,
            [cartItemId]: quantity,
        }));
    };

    const priceDetails = cartItemsState.reduce<PriceDetailsProps>((details, item) => {
        const quantity = quantities[item._id] ?? item.quantity;
        const actualPrice = calculateActualItemPrice(
            item.productId.basePrice,
            item.productId.discountType,
            item.productId.discountValue,
        );

        details.itemsQty += quantity;
        details.itemsPrice += actualPrice * quantity;
        details.shippingCost += item.productId.shippingAmount * quantity;
        details.subTotal += (actualPrice + item.productId.shippingAmount) * quantity;
        return details;
    }, {itemsQty: 0, itemsPrice: 0, shippingCost: 0, subTotal: 0});

    const handleRemoveItem = async (cartItemId: string) => {
        try {
            const res = await api.delete(`cart/remove/${cartItemId}`, { withCredentials: true });
            const data = res.data;
            if (data.success) {
                setCartItemsState((currentItems) => currentItems.filter((item) => item._id !== cartItemId));
                setQuantities((currentQuantities) => {
                    const updatedQuantities = { ...currentQuantities };
                    delete updatedQuantities[cartItemId];
                    return updatedQuantities;
                });
                toast.success(data.message || "Item removed from the cart successfully.");
                return;
            }
            toast.error(data.message || "Failed to remove item from the cart.");
        } catch (error) {

        }
    }

    return (
        <div className="w-full flex md:flex-row flex-col gap-3 mt-2">
            <div className="md:w-2/3 w-full space-y-2 mb-6">
                {cartItemsState.length ? cartItemsState.map((item) => (
                    <CartCard
                        key={item._id}
                        product={item.productId}
                        quantity={quantities[item._id] ?? item.quantity}
                        calculateActualItemPrice={calculateActualItemPrice}
                        onQuantityChange={(quantity) => updateQuantity(item._id, quantity)}
                        onRemoveItem={() => handleRemoveItem(item._id)}
                    />
                )) : (
                    <div className="w-full flex flex-col items-center space-y-4">
                        <ShoppingCart size={80} color="gray" />
                        <p className="text-center text-gray-500 text-2xl">Your cart is empty</p>
                        <Button title="Continue Shopping" className="bg-sky-300 hover:bg-sky-400 mt-2" />
                    </div>
                )}
                <div className="w-full flex justify-end mt-10">
                    <PaginationBar />
                </div>
            </div>
            <div className="md:w-1/3 w-full">
                <PriceDetailsSection {...priceDetails } quantities={quantities} />
            </div>
        </div>
    );
}

export default CartContent;