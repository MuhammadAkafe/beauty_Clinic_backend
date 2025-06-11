import path from "path";
import fs from "fs";
import dotenv from "dotenv";

export const handleEnv = (): string => {
    // Determine the environment
    const isProduction = process.env.NODE_ENV === 'production';
    const envFile = isProduction ? '.env.production' : '.env.development';
    const envPath = path.join(process.cwd(), envFile);

    // Check if the environment file exists
    if (!fs.existsSync(envPath)) {
        console.error(`Environment file ${envFile} not found!`);
        process.exit(1);
    }

    // Load environment variables
    const result = dotenv.config({ path: envPath });
    
    if (result.error) {
        console.error('Error loading environment variables:', result.error);
        process.exit(1);
    }

    // Set NODE_ENV if not already set
    if (!process.env.NODE_ENV) {
        process.env.NODE_ENV = isProduction ? 'production' : 'development';
    }

    console.log(`Running in ${process.env.NODE_ENV} mode`);
    console.log(`Loading environment from: ${envFile}`);

    // Validate required environment variables
    const requiredVars = ['DATABASE_URL', 'JWT_SECRET', 'PORT'];
    const missingVars = requiredVars.filter(varName => !process.env[varName]);

    if (missingVars.length > 0) {
        console.error(`Missing required environment variables in ${envFile}:`, missingVars);
        process.exit(1);
    }

    console.log('Environment variables loaded successfully');
    console.log('Loaded variables:', Object.keys(process.env).filter(key => 
        requiredVars.includes(key)
    ));

    return envPath;
};