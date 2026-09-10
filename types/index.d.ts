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
    id: string;
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
    id: string;
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
    type?: string;
    field: string;
    placeholder: string;
    handleInputChange: (field: string, value: string) => void;
    desc?: string;
    className?: string;
}

declare type AuthButtonProps = {
    title: string;
    handleClick: () => void;
    isLoading?: boolean;
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
    subTotal: number;
}

declare type ProductDetailsPageProps = {
    params: Promise<{
        id: string;
    }>
}

declare type ProfileDataProps = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    addressLine1: string,
    addressLine2: string,
    city: string,
    postalCode: string,
    country: string,
    [key: string]: string
}

declare type CreditCardProps = {
    id: number,
    cardHolder: string,
    cardNumber: string,
    expiryDate: string,
    cardType: string,
    isDefault: boolean,
    lastUsed: string
}

declare type ShippingAddress = {
    addressId: string,
    name: string,
    addressLine1: string,
    addressLine2: string,
    city: string,
    postalCode: string,
    country: string,
    phone?: string,
    isDefault?: boolean
}

declare type AddressFormData = {
    addressLine1: string;
    addressLine2: string;
    city: string;
    postalCode: string;
    country: string;
}

// Product Form Data type for adding new products
type ProductFormData = {
    images: (string | null)[];
    title: string;
    description: string;
    basePrice: number;
    discountType: "none" | "percentage" | "fixed";
    discountValue: number;
    category: string;
    attributes: {key: string; value: string}[];
    stock: number;
    shippingAmount: number;
}

// Product props for response after adding a new product
declare type ProductProps = {
    _id: string;
    imageUrls: (string | null)[];
    title: string;
    description: string;
    basePrice: number;
    discountType: "none" | "percentage" | "fixed";
    discountValue: number;
    category: string;
    attributes: {key: string; value: string}[];
    stock: number;
    shippingAmount: number;
    soldCount: number;
    status: "active" | "inactive"
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

declare type SearchData = {
    searchOptions: string[];
    categories: string[];
    minPrice: number;
    maxPrice: number;
    sellerType: string;
    authorizedSeller: boolean;
    deliveryOptions: string[];
    listedIn: string;
    sortBy: string;
}

declare type CartItemProps = {
    _id: string;
    userId: string;
    productId: ProductProps;
    quantity: number;
    createdAt: string;
    updatedAt: string;
}

declare type PriceDetailsProps = {
    itemsQty: number;
    itemsPrice: number;
    shippingCost: number;
    subTotal: number;
}

declare type AddressProps = {
    addressId: string;
    firstName: string;
    lastName: string;
    phone: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    postalCode: string;
    country: string;
};

