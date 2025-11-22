declare type ButtonProps = {
    title: string;
    textColor?: string;
    className: string;
    url?: string
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
    shippingCost: number;
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
    shippingAmount?: number
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

declare type InputFiledProps = {
    label: string;
    type?: "text" | "password";
    placeholder: string;
    desc?: string;
    className?: string;
}

declare type AuthButtonProps = {
    title: string;
}

declare type AuthBottomLinkProps = {
    desc: string;
    href: string;
    linkText: string;
}

declare type PriceDetailsSectionProps = {
    itemsQty: number;
    itemsPrice: number;
    shippingCost: number; 
}