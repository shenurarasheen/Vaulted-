'use client';

import api from "@/lib/api";
import AdvProductCard from "./AdvProductCard";
import toast from "react-hot-toast";

const AdvProductCardContainer = ({ products }: { products: ProductProps[] }) => {

    const handleAddToCart = async(productId: string, quantity: number=1) => {
        try {
            const res = await api.post("cart/add", { productId, quantity }, { withCredentials: true });
            const data = res.data;
            if (data.success) {
                toast.success(data.message || "Product added to the cart successfully.");
                return;
            }
            toast.error(data.message || "Failed to add product to the cart.");
        }catch (error) {

        }
    }

    return (
        <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 mb-6">
            {/* cards go here */}
            {products.map((product, index) => (
                <AdvProductCard
                    key={index}
                    product={product}
                    onAddToCart={(quantity) => handleAddToCart(product._id, quantity)}
                />
            ))}
        </div>
    )
}

export default AdvProductCardContainer;