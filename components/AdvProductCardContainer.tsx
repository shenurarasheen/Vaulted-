import AdvProductCard from "./AdvProductCard";

const AdvProductCardContainer = ({ products }: { products: ProductProps[] }) => {

    return (
        <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 mb-6">
            {/* cards go here */}
            {products.map((product, index) => (
                <AdvProductCard
                    key={index}
                    product={product}
                />
            ))}
        </div>
    )
}

export default AdvProductCardContainer;