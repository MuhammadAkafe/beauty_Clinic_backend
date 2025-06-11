import path from "path";
import fs from "fs";
import dotenv from "dotenv";

export const handleEnv = () => {
    // Get the current environment
    const env = process.env.NODE_ENV || 'development';
    
    // Define the base path for environment files
    const basePath = path.resolve(process.cwd());
    
    // Define possible environment file paths
    const envFiles = [
        path.join(basePath, `.env.${env}`),  // .env.development or .env.production
        path.join(basePath, '.env')          // Default .env
    ];

    // Try to load each environment file
    for (const envFile of envFiles) {
        if (fs.existsSync(envFile)) {
            console.log(`Loading environment from ${envFile}`);
            dotenv.config({ path: envFile });
            return envFile;
        }
    }

    // If no environment file is found, throw an error
    throw new Error(`No environment file found for ${env} environment`);
};