import AdvProductCard from "./AdvProductCard";
import ProductCard from "./ProductCard";

const AdvProductCardContainer = ({ products }: ProductCardContainerProps) => {

    return (
        <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 mb-6">
            {/* cards go here */}
            {products.map((product, index) => (
                <AdvProductCard
                    key={index}
                    title={product.title}
                    desc={product.description}
                    price={`$${product.price.toFixed(2)}`}
                    soldCount={product.soldCount}
                    shippingCost={product.shippingAmount!}
                    src={product.src}
                    alt={product.title}
                />
            ))}
        </div>
    )
}

export default AdvProductCardContainer;