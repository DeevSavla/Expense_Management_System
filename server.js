import express from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "dotenv";
import connectDB from "./config/connectdb.js";
import userRoutes from "./routes/user.route.js"; 
import transactionRouter from "./routes/transaction.route.js";

// Load environment variables
config();

// Connect to the database
connectDB();

// Create an Express app
const app = express();

app.use(morgan("dev"));
app.use(express.json());
// Middleware
app.use(cors());

// Routes
app.use("/api/v1/users", userRoutes); // user route
app.use("/api/v1/transactions",transactionRouter) // transaction route

// Initialize port
const PORT = process.env.PORT || 8080;

// Listen to port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
