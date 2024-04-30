import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Connected to MongoDB at ${mongoose.connection.host}`);
    } catch(error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export default connectDB;
