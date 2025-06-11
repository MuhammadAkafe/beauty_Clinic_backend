"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_router_1 = __importDefault(require("./router/auth_router"));
require("reflect-metadata");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const service_router_1 = __importDefault(require("./router/service_router"));
const data_source_1 = require("./data-source/data-source");
const dotenv_1 = __importDefault(require("dotenv"));
const fs = __importStar(require("fs"));
const env = process.env.NODE_ENV || "development";
console.log(env);
if (fs.existsSync('.env')) {
    dotenv_1.default.config({ path: '.env' });
}
const envFile = `.env.${env}`;
if (fs.existsSync(envFile)) {
    dotenv_1.default.config({ path: envFile, override: true });
}
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
        const port = process.env.PORT;
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
