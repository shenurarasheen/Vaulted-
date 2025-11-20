"use client"

import Image from "next/image"

const BannerImage = ({ src, alt }: BannerImageProps) => {
    return (
        <div className="relative sm:size-[90px] md:size-[180px] overflow-hidden">
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
            />
        </div>
    )
}

export default BannerImage;