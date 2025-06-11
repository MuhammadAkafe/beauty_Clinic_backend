"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleEnv = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
const handleEnv = () => {
    // Get the current environment
    const env = process.env.NODE_ENV || 'development';
    // Define the base path for environment files
    const basePath = path_1.default.resolve(process.cwd());
    // Define possible environment file paths
    const envFiles = [
        path_1.default.join(basePath, `.env.${env}`), // .env.development or .env.production
        path_1.default.join(basePath, '.env') // Default .env
    ];
    // Try to load each environment file
    for (const envFile of envFiles) {
        if (fs_1.default.existsSync(envFile)) {
            console.log(`Loading environment from ${envFile}`);
            dotenv_1.default.config({ path: envFile });
            return envFile;
        }
    }
    // If no environment file is found, throw an error
    throw new Error(`No environment file found for ${env} environment`);
};
exports.handleEnv = handleEnv;
