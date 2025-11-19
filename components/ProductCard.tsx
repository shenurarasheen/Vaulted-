const ProductCard = ({title, desc} : ProductCardProps) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3">
            <div className="h-50"></div>
            <h1 className="text-lg">{title}</h1>
            <p className="text-sm text-gray-600">{desc}</p>
        </div>
    )
}

export default ProductCard