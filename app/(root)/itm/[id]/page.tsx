import Image from "next/image";
import products from "@/data/products.json";

const ProductDetailsPage = async ({params} : ProductDetailsPageProps) => {

    const { id } = await params;

    const product: Product | undefined = products.find(item => item.id === id);

    return (
        <main className="w-full flex px-6 mt-8 gap-4 max-md:flex-col">
            <div className="md:w-1/2 lg:h-[420px] px-6">
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
            <div className="md:w-1/2">
                <h1 className="text-xl">Product description goes here</h1>
                <p>product description</p>
            </div>
        </main>
    )
}

export default ProductDetailsPage;