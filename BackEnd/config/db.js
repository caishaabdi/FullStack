import mongoose from 'mongoose';
import { dburl } from './config.js';

const connectDB = async () => {
    try {
        await mongoose.connect(dburl)
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
