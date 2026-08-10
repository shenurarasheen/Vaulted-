"use client";
import { useState } from "react";
import SinglePoductImageContainer from "./SingleProductImageContainer";

const CLOUDINARY_BASE_URL = process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL!;

const IMAGE_CONTAINER_CLASSNAMES = {
    small: "relative bg-sky-200 xl:h-42 w-full row-span-3 h-full rounded-lg overflow-hidden border border-gray-200 hover:cursor-pointer",
    large: "relative row-span-12 col-span-6 h-full w-full aspect-square rounded-lg overflow-hidden border border-gray-200"
}

const ProductImagesContainer = ({ product }: { product: ProductProps }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

    const imageUrls = product.imageUrls.map((url) => `${CLOUDINARY_BASE_URL}/${url}`);

    return (
        <div className="grid grid-flow-col grid-cols-8 grid-rows-[12] gap-2 h-full">

            <div className="overflow-y-auto col-span-2 row-span-12 gap-2 space-y-2 hide-scrollbar shadow-[0_18px_18px_-20px_rgba(0,0,0,0.4)] scroll-smooth">
                {imageUrls.map((url, index) => (
                    <SinglePoductImageContainer
                        key={index}
                        selectImage={setSelectedImageIndex}
                        selectedIndex={index}
                        className={IMAGE_CONTAINER_CLASSNAMES.small}
                        src={url}
                        alt={product.title}
                    />
                ))}
            </div>

            <SinglePoductImageContainer
                className={IMAGE_CONTAINER_CLASSNAMES.large}
                src={`${CLOUDINARY_BASE_URL}/${product.imageUrls[selectedImageIndex]!}`}
                alt={product.title}
            />

        </div>
    )
}

export default ProductImagesContainer;