import CarouselContent from "@/components/CarouselContent";
import Footer from "@/components/Footer";
import HomeBottomBanner from "@/components/HomeBottomBanner";
import HomeCarousel from "@/components/HomeCarousel";
import OfferBanner from "@/components/OfferBanner";
import ProductCardContainer from "@/components/ProductCardContainer";
import SectionTitle from "@/components/SectionTitle";
import AIChatWidget from "@/components/AIChatWidget";
import products from "@/data/products.json"

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
                {/* section title */}
                <SectionTitle title="All Arivals" />

                <ProductCardContainer products={products} />

                <OfferBanner/>

                {/* section title */}
                <SectionTitle title="Trending Items" />

                <ProductCardContainer products={products} />

                <HomeBottomBanner/>

                {/* section title */}
                <SectionTitle title="All Items" />

                <ProductCardContainer products={products} />
            </section>

            <Footer/>

            <AIChatWidget />
        </>
    )
}

export default HomePage;