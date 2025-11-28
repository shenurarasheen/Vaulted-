import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI;
        if (!MONGODB_URI) throw new Error('MONGODB_URI is missing!');
        const conn = await mongoose.connect(MONGODB_URI);
        console.log(`MongoDB connected ${conn.connection.host}`);

    } catch (error) {
        console.log(`MongoDB connection errro ${error}`)
    }
}