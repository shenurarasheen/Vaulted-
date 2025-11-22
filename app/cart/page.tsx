import Button from "@/components/Button";
import CartCard from "@/components/CartCard";
import Navbar from "@/components/Navbar";
import PaginationBar from "@/components/Pagination";
import PriceDetailsSection from "@/components/PriceDetailsSection";
import { CircleAlert, ShieldAlert } from "lucide-react";
import Link from "next/link";
import products from "@/data/products.json";

const CartPage = () => {
    return (
        <>
            <Navbar />
            <main className="w-full px-10 mt-3">
                <div className="flex items-center justify-between py-2">
                    <h1 className="text-xl font-semibold">Shopping Cart</h1>
                    <Link href="/" className="text-xs text-blue-600 underline">Send Us Your Comments</Link>
                </div>

                <div className="w-full flex md:flex-row flex-col gap-3 mt-2">
                    {/* for cart items */}
                    <div className="md:w-2/3 w-full space-y-2 mb-6">
                        <CartCard product={products[0]} />
                        <CartCard product={products[1]} />
                        <CartCard product={products[2]} />
                        <div className="w-full flex justify-end mt-10">
                            <PaginationBar />
                        </div>
                    </div>
                    {/* for price details */}
                    <div className="md:w-1/3 w-full">
                        <PriceDetailsSection
                            itemsQty={2}
                            itemsPrice={1534}
                            shippingCost={20}
                        />
                    </div>
                </div>
            </main>
        </>
    )
}

export default CartPage;