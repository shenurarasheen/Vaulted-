"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import React from "react"

const HomeCarousel = ({ height, itemContent, areButtonsShown = true, carouselDelay = 4000, className = "" }: HomeCarouselProps) => {

    const plugin = React.useRef(
        Autoplay({ delay: carouselDelay, stopOnInteraction: true })
    )

    return (
        <Carousel plugins={[plugin.current]} className={className}>
            <CarouselContent>
                {itemContent.map((content, index) => (
                    <CarouselItem key={index} style={{height}}>
                        {content}
                    </CarouselItem>
                ))}
            </CarouselContent>
            {areButtonsShown && (
                <>
                    <CarouselPrevious />
                    <CarouselNext />
                </>
            )}
        </Carousel>
    )
}

export default HomeCarousel;