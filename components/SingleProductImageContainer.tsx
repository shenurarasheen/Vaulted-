import Image from "next/image";

const SinglePoductImageContainer = ({className, src, alt} : {className: string; src: string; alt: string}) => {
    return (
        <div className={`relative bg-sky-200 h-full rounded-lg overflow-hidden border border-gray-200 ${className}`}>
            <Image
                src={src}
                alt={alt}
                fill
            />
        </div>
    )
}

export default SinglePoductImageContainer;