import Image from "next/image";
import products from "@/data/products.json";
import Button from "@/components/Button";
import ProductCardContainer from "@/components/ProductCardContainer";
import SectionTitle from "@/components/SectionTitle";
import Footer from "@/components/Footer";

const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {

    const { id } = await params;

    const product: Product | undefined = (products as Product[]).find(item => item.id === id);

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
                <div className="md:w-3/5 xl:h-[450px] px-10">
                    <div className="grid grid-flow-col grid-cols-8 grid-rows-3 gap-3 h-full">
                        <div className="relative bg-sky-200 col-span-2 h-full rounded-lg overflow-hidden border border-gray-200">
                            <Image
                                src="/images/watch.jpg"
                                alt="product image"
                                fill
                            />
                        </div>
                        <div className="relative bg-sky-200 col-span-2 h-full rounded-lg overflow-hidden border border-gray-200">
                            <Image
                                src="/images/watch3.png"
                                alt="product image"
                                fill
                            />
                        </div>
                        <div className="relative bg-sky-200 col-span-2 h-full rounded-lg overflow-hidden border border-gray-200">
                            <Image
                                src="/images/watch4.jpg"
                                alt="product image"
                                fill
                            />
                        </div>
                        <div className="relative row-span-3 col-span-6 h-full w-full aspect-square rounded-lg overflow-hidden border border-gray-200">
                            <Image
                                src={product ? product.src! : "/images/watch.jpg"}
                                alt="product image"
                                fill
                            />
                        </div>
                    </div>
                </div>
                <div className="md:w-2/5">
                    <h1 className="text-2xl font-semibold">{product.title}</h1>
                    <hr className="w-full border border-gray-100 my-3" />
                    <p className="text-sm">{product.description}</p>
                    <hr className="w-full border border-gray-100 my-3" />
                    <div className="flex items-center gap-6">
                        <h2 className="text-[25px] font-semibold">US ${product.price.toFixed(2)}</h2>
                        <span className="px-2 py-1 bg-sky-500/20 rounded-full text-[11px] text-sky-500 border border-sky-400">{product.soldCount}+ sold</span>
                    </div>
                    <p className="text-gray-400 text-lg max-md:text-xs line-through font-semibold">US $145.45</p>
                    <h4 className="text-[15px] text-gray-400 mt-1">(US ${product.price.toFixed(2)} / unit)</h4>
                    <p className="text-[13.4px] mt-2">Shipping: US ${product.shippingAmount}</p>
                    <hr className="w-full border border-gray-100 my-3" />
                    <div className="flex items-center gap-6 ">
                        <p className="text-[15px]">Condition : </p>
                        <span className="text-[10px] bg-green-500/20 text-green-400 border border-green-400 rounded-full px-2">New</span>
                    </div>
                    <div className="flex items-center gap-6 mt-4">
                        <p className="text-[15px]">Quantity : </p>
                        <input type="text" defaultValue={1} className="border border-gray-400 rounded-md px-3 py-3 text-sm w-24 bg-gray-100" />
                        <span className="text-[15px] text-gray-500 font-semibold">2 Available</span>
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
                <SectionTitle title="Similar Products"/>
                <ProductCardContainer products={products} />
            </section>
            <Footer />
        </>
    )
}

export default ProductDetailsPage;