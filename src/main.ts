import dotenv from "dotenv";
import path from "path";
// Load environment variables first, before any other imports
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
import express from "express";
import cors from "cors";
import authRouter from "./router/auth_router"
import "reflect-metadata"
import cookieParser from "cookie-parser";
import serviceRouter from "./router/service_router";
import { AppDataSource } from "./data-source/data-source";

// Log environment variables for debugging
console.log('Environment loaded:', {
    NODE_ENV: process.env.NODE_ENV,
    PRIVATE_KEY_EXISTS: !!process.env.PRIVATE_KEY,
    PORT: process.env.PORT
});

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(cors({
    origin: ['https://vite-project-eight-self.vercel.app', 'http://localhost:5173'],
    credentials: true,
  }));

app.use(cookieParser());

// Initialize database connection
const initializeApp = async () => {
    try {
        if (!AppDataSource.isInitialized) {
            console.log('Initializing database connection...');
            await AppDataSource.initialize();
            console.log("Database connection initialized successfully");
        }

        app.use("/auth", authRouter);
        app.use("/service", serviceRouter);
        app.listen(port, () => {
            console.log(` server is running on http://localhost:${port}`);
        });
    } 
    catch (error) {
        console.error("Error during application initialization:", error);
        if (error instanceof Error) {
            console.error("Error details:", error.message);
        }
        process.exit(1);
    }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
    console.error('Unhandled promise rejection:', error);
    process.exit(1);
});

initializeApp();
