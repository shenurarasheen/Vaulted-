'use server'

type ProductData = {
    title: string;
    description: string;
    price: number;
    soldCount: number;
    shippingAmount: number;
    images: [{public_id: string, url: string}]
}

const createProduct = async (data: ProductData) => {
    try {
        
    } catch (error) {
        throw new Error(`Error in creating a new product ${error}`);
    }
}