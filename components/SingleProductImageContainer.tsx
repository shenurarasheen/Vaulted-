"use client";

import Image from "next/image";

const SinglePoductImageContainer = ({className, src, alt, selectImage, selectedIndex=0} : {className: string; src: string; alt: string; selectImage?: (index: number) => void; selectedIndex?: number}) => {
    return (
        <div className={className}>
            <Image
                src={src}
                alt={alt}
                fill
                onClick={selectImage ? () => selectImage(selectedIndex) : undefined}
            />
        </div>
    )
}

export default SinglePoductImageContainer;