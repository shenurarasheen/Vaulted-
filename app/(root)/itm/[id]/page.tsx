import products from "@/data/products.json";
import Button from "@/components/Button";
import ProductCardContainer from "@/components/ProductCardContainer";
import SectionTitle from "@/components/SectionTitle";
import Footer from "@/components/Footer";
import api from "@/lib/api";
import toast from "react-hot-toast";
import ProductImagesContainer from "@/components/ProductImagesContainer";


const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {

    const { id } = await params;

    const getProduct = async (id: string): Promise<ProductProps | null> => {
        // Need to request to the backend for get the product details that belongs to the id.
        try {
            const res = await api.get(`/products/get/${id}`, { withCredentials: true });
            const data = res.data;
            if (data.success) {
                console.log("Product details fetched successfully:", data.data);
                return data.data as ProductProps;
            } else {
                toast.error(data.message || "Failed to fetch product details.");
            }
        } catch {

        }
        return null;
    }

    const product = await getProduct(id);

    if (!product) {
        return (
            <main className="w-full px-10 flex items-center justify-center mt-20">
                <h1 className="text-xl text-gray-300">No Product Found!</h1>
            </main>
        )
    }

    return (
        <>
            <main className="w-full flex md:px-10 px-4 mt-10 gap-4 max-md:flex-col">

                <div className="md:w-3/5 xl:h-[520px] px-10">
                    <ProductImagesContainer product={product} />
                </div>

                <div className="md:w-2/5">
                    <h1 className="text-2xl font-semibold">{product.title}</h1>
                    <hr className="w-full border border-gray-100 my-3" />
                    <p className="text-sm">{product.description}</p>
                    <hr className="w-full border border-gray-100 my-3" />
                    <div className="flex items-center gap-6">
                        <h2 className="text-[25px] font-semibold">US ${product.basePrice.toFixed(2)}</h2>
                        <span className="px-2 py-1 bg-sky-500/20 rounded-full text-[11px] text-sky-500 border border-sky-400">{product.soldCount}+ sold</span>
                    </div>
                    <p className="text-gray-400 text-lg max-md:text-xs line-through font-semibold">US $145.45</p>
                    <h4 className="text-[15px] text-gray-400 mt-1">(US ${product.basePrice.toFixed(2)} / unit)</h4>
                    <p className="text-[13.4px] mt-2">Shipping: US ${product.shippingAmount}</p>
                    <hr className="w-full border border-gray-100 my-3" />
                    <div className="flex items-center gap-6 ">
                        <p className="text-[15px]">Condition : </p>
                        <span className="text-[10px] bg-green-500/20 text-green-400 border border-green-400 rounded-full px-2">New</span>
                    </div>
                    <div className="flex items-center gap-6 mt-4">
                        <p className="text-[15px]">Quantity : </p>
                        <input type="text" defaultValue={1} className="border border-gray-400 rounded-md px-3 py-3 text-sm w-24 bg-gray-100" />
                        <span className="text-[15px] text-gray-500 font-semibold">{product.stock} Available</span>
                    </div>
                    <Button
                        title="Buy Now"
                        className="w-full bg-blue-600 mt-8 py-3"
                    />
                    <Button
                        title="Add to Cart"
                        textColor="text-blue-600"
                        className="w-full border border-blue-600 mt-3 py-3"
                    />
                </div>
            </main>
            <section className="w-full px-10 mt-15">
                <SectionTitle title="Similar Products" />
                <ProductCardContainer products={products} />
            </section>
            <Footer />
        </>
    )
}

export default ProductDetailsPage;