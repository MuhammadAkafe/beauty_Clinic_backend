import express from "express";
import cors from "cors";
import authRouter from "./router/auth_router"
import "reflect-metadata"
import cookieParser from "cookie-parser";
import serviceRouter from "./router/service_router";
import { AppDataSource } from "./data-source/data-source";
import { handleEnv } from "./controller/handle_env";

// Load environment variables
handleEnv();



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

        const port = process.env.PORT ;
        app.use("/auth", authRouter);
        app.use("/service", serviceRouter);
        
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
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
