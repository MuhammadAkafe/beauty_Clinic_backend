"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load environment variables first, before any other imports
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), '.env') });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_router_1 = __importDefault(require("./router/auth_router"));
require("reflect-metadata");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const service_router_1 = __importDefault(require("./router/service_router"));
const data_source_1 = require("./data-source/data-source");
// Log environment variables for debugging
console.log('Environment loaded:', {
    NODE_ENV: process.env.NODE_ENV,
    PRIVATE_KEY_EXISTS: !!process.env.PRIVATE_KEY,
    PORT: process.env.PORT
});
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
app.use((0, cors_1.default)({
    origin: ['https://vite-project-eight-self.vercel.app', 'http://localhost:5173'],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
// Initialize database connection
const initializeApp = async () => {
    try {
        if (!data_source_1.AppDataSource.isInitialized) {
            console.log('Initializing database connection...');
            await data_source_1.AppDataSource.initialize();
            console.log("Database connection initialized successfully");
        }
        app.use("/auth", auth_router_1.default);
        app.use("/service", service_router_1.default);
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
