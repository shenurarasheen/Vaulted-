import CheckoutAddressDetails from "@/components/CheckoutAddressDetails";
import CheckoutOrderItems from "@/components/CheckoutOrderitems";
import CheckoutPaymentDetails from "@/components/CheckoutPaymentDetails";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import api from "@/lib/api";
import { calculateActualPrice } from "@/lib/utils";
import { cookies } from "next/headers";


type AddressPayload = {
    permanentAddressId: string;
    addresses: AddressProps[];
}

const TAX_RATE = 0.08;

function Button({ title, className = "" } : { title: string, className: string}) {
    return (
        <button className={`font-medium text-white transition-colors ${className}`}>
            Proceed to Checkout
        </button>
    );
}

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

                <div className="flex gap-8 mt-6 max-lg:flex-col">
                    <div className="lg:w-3/5 flex flex-col gap-6">

                        <CheckoutAddressDetails 
                            permanentAddressId={permanentAddressId}
                            userAddresses={userAddresses}
                        />

                        <CheckoutPaymentDetails />

                        <CheckoutOrderItems orderItems={allCartItems} />
                    </div>

                    <div className="lg:w-2/5">
                        <div className="border border-gray-200 rounded-lg p-6 lg:sticky lg:top-[121px]">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

                            <div className="flex flex-col gap-2.5 text-sm">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="text-gray-900 text-[17px] font-medium">{subtotal.toFixed(2)} LKR</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-gray-900 font-medium">{shipping.toFixed(2)} LKR</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax</span>
                                    <span className="text-gray-900 font-medium">{tax.toFixed(2)} LKR</span>
                                </div>
                            </div>

                            <hr className="border-gray-100 my-4" />

                            <div className="flex justify-between items-center">
                                <span className="text-[15px] font-medium text-gray-900">Total</span>
                                <span className="text-2xl font-semibold text-gray-900">{total.toFixed(2)} LKR</span>
                            </div>

                            <Button title="Place Order" className="w-full bg-blue-600 mt-6 py-4 rounded-4xl text-sm" />

                            <p className="text-xs text-gray-400 text-center mt-3">
                                By placing your order, you agree to our terms and conditions
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default CheckoutPage;
