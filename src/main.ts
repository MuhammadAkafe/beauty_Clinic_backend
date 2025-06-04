import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./router/auth_router"
import "reflect-metadata"
import cookieParser from "cookie-parser";
import serviceRouter from "./router/service_router";
import { AppDataSource } from "./data-source/data-source";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use(cookieParser());

// Initialize database connection
AppDataSource.initialize()
    .then(() => {
        console.log("Database connection initialized successfully");
    })
    .catch((error) => {
        console.error("Error during Data Source initialization:", error);
    });

const port = process.env.PORT || 3001;

app.use("/auth", authRouter);
app.use("/service", serviceRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
