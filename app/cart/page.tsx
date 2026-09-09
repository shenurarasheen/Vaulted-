import { cookies } from "next/headers";
import Navbar from "@/components/Navbar";
import CartContent from "@/components/CartContent";
import Link from "next/link";
import Footer from "@/components/Footer";
import api from "@/lib/api";
import toast from "react-hot-toast";

const CartPage = async () => {

    const getAllCartItems = async (): Promise<CartItemProps[]> => {

        const cookieStore = await cookies();

        try {
            const res = await api.get("cart/all", {
                headers: {
                    Cookie: cookieStore.toString()
                }
            });
            const data = res.data;
            if (data.success) {
                return data.data as CartItemProps[];
            }
            toast.error(data.message || "Failed to fetch cart items.");
        } catch {

        }
        return [];
    }

    const cartItems = await getAllCartItems();

    return (
        <>
            <Navbar />
            <main className="w-full px-10 mt-3">
                <div className="flex items-center justify-between py-2">
                    <h1 className="text-xl font-semibold">Shopping Cart</h1>
                    <Link href="/" className="text-xs text-blue-600 underline">Send Us Your Comments</Link>
                </div>

                <CartContent cartItems={cartItems} />
            </main>
            <Footer />
        </>
    )
}

export default CartPage;