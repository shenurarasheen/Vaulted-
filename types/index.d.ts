declare type ButtonProps = {
    title: string;
    textColor?: string;
    className: string;
}

declare type Category = {
    label: string;
    value: string;
}

declare type HomeCarouselProps = {
    height: string;
    itemContent: React.ReactNode[];
    areButtonsShown?: boolean;
    carouselDelay?: number;
    className?: string
}

declare type ProductCardProps = {
    title: string;
    desc: string;
}