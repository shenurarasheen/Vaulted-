import CarouselContent from "@/components/CarouselContent";
import HomeCarousel from "@/components/HomeCarousel";
import ProductCard from "@/components/ProductCard";
import { ArrowRight } from "lucide-react";

const HomePage = () => {
    return (
        <>
            <section className="xl:w-6xl lg:w-5xl px-8 mx-auto mt-8 mb-10">
                <HomeCarousel
                    height="300px"
                    areButtonsShown={true}
                    carouselDelay={5000}
                    itemContent={[
                        <CarouselContent key={1} />,
                        <CarouselContent key={2} />,
                        <CarouselContent key={3} />
                    ]}
                />
            </section>

            <section className="px-10">
                <div className="flex gap-3 items-center">
                    <h1 className="text-xl">All Arivals</h1>
                    <div className="size-8 bg-white border border-gray-300 rounded-full flex items-center justify-center">
                        <ArrowRight size={18} />
                    </div>
                </div>

                {/* card container */}
                <div className="w-full grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 mb-6">
                    {/* cards go here */}
                    <ProductCard
                        title="Product Title"
                        desc="product description"
                    />
                </div>
            </section>
        </>
    )
}

export default HomePage;