// Importing packages
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/connectdb.js";
import userRoutes from "./routes/user.route.js"; // Importing user routes
import transactionRouter from "./routes/transaction.route.js";

// Load environment variables
config();

// Connect to the database
connectDB();

// Create an Express app
const app = express();

// Middleware
app.use(cors({
    origin:["https://expense-management-system-rk9d.vercel.app"],
    methods:["POST","GET"],
    credentials:true
}));
app.use(morgan("dev"));
app.use(express.json());

mongoose.connect('mongodb+srv://savladeev:deev123@cluster0.xmzfgcq.mongodb.net/expenseApp?retryWrites=true&w=majority&appName=Cluster0')


// Routes
app.use("/users", userRoutes); // user route
app.use("/transactions",transactionRouter) // transaction route

// Initialize port
const PORT = process.env.PORT || 8080;

// Listen to port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
