import CheckoutPageContent from "@/components/CheckoutPageContent";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import api from "@/lib/api";
import { calculateActualPrice } from "@/lib/utils";
import { cookies } from "next/headers";

const TAX_RATE = 0.08;

const CheckoutPage = async () => {

    const getAllUserAddresses = async (): Promise<AddressPayload> => {
        const cookieStore = await cookies();

        try {
            const res = await api.get("/profile/addresses/all", {
                headers: {
                    Cookie: cookieStore.toString()
                }
            });
            const data = res.data;
            if (data.success) {
                return data.data as AddressPayload;
            }
        } catch (error) {
        }
        return { permanentAddressId: "", addresses: [] };
    }

    const getOrderItemsFromCart = async (): Promise<CartItemProps[]> => {
        try {
            const cookieStore = await cookies();
            const res = await api.get("/cart/all", {
                headers: {
                    Cookie: cookieStore.toString()
                }
            });
            const data = res.data;
            if (data.success) {
                return data.data as CartItemProps[];
            }
        } catch (error) {
        }
        return [];
    }


    const addressPayload = await getAllUserAddresses();
    const permanentAddressId = addressPayload.permanentAddressId;
    const userAddresses = addressPayload.addresses;

    const allCartItems = await getOrderItemsFromCart();

    const subtotal = allCartItems.reduce((sum, item) => sum + calculateActualPrice(item.productId.basePrice, item.productId.discountType, item.productId.discountValue) * item.quantity, 0);
    const shipping = allCartItems.length > 0 ? allCartItems.reduce((sum, item) => sum + item.productId.shippingAmount, 0) : 0;
    const tax = subtotal * TAX_RATE;
    const total = subtotal + shipping + tax;

    return (
        <>
            <Navbar />
            <main className="w-full px-4 md:px-10 py-10 bg-white min-h-screen">
                <h1 className="text-2xl font-semibold text-gray-900">Checkout</h1>

                <CheckoutPageContent 
                    permanentAddressId={permanentAddressId}
                    userAddresses={userAddresses}
                    cartItems={allCartItems}
                    subtotal={subtotal}
                    shipping={shipping}
                    tax={tax}
                    total={total}
                />
            </main>
            <Footer />
        </>
    );
}

export default CheckoutPage;
