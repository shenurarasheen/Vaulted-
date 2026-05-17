'use server'

import { connectDB } from "@/lib/db";
import Product from "@/model/product.model";

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
      await connectDB(); 
      await Product.create(data); 
    } catch (error) {
        throw new Error(`Error in creating a new product ${error}`);
    }
}