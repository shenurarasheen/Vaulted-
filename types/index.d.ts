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
    price: string;
    soldCount: number;
    src: string;
    alt: string;
}

declare type SectionTitleProps = {
    title: string;
}

declare type Product = {
    title: string;
    description: string;
    price: number;
    soldCount: number;
    src: string;
}

declare type ProductCardContainerProps = {
    products: Product[];
}

declare type BannerImageProps = {
    src: string;
    alt: string;
}

declare type FooterItem = {
    href: string;
    label: string;
}

declare type FooterColumnProps = {
    title: string;
    items: FooterItem[];
}