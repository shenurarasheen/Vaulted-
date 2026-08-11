import ProductCard from "./ProductCard";

const ProductCardContainer = ({ products }: ProductCardContainerProps) => {

    return (
        <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 mb-6">
            {/* cards go here */}
            {products.map((product, index) => (
                <ProductCard
                    key={index}
                    id={product.id}
                    title={product.title}
                    desc={product.description}
                    price={`$${product.price.toFixed(2)}`}
                    soldCount={product.soldCount}
                    shippingCost={product.shippingAmount ?? 0}
                    src={product.src}
                    alt={product.title}
                />
            ))}
        </div>
    )
}

export default ProductCardContainer;