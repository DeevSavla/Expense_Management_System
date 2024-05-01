// Importing packages
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "dotenv";
import colors from "colors";
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
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/users", userRoutes); // user route
app.use("/transactions",transactionRouter) // transaction route

// Initialize port
const PORT = process.env.PORT || 8080;

// Listen to port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
