import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    soldCount: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    shippingAmount: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    images: [
        {
            public_id: String,
            required: true
        },
        {
            url: String,
            required: true
        }
    ]
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;