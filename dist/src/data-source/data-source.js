"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("../entity/Users");
const dotenv_1 = __importDefault(require("dotenv"));
const Service_1 = require("../entity/Service");
const Items_1 = require("../entity/Items");
const path_1 = __importDefault(require("path"));
// Load production environment variables
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../..//.env.production') });
// Log the database URL (without password) for debugging
const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
    console.error('DATABASE_URL is not set in .env.production');
    process.exit(1);
}
// Log the host part of the URL for debugging
try {
    const url = new URL(dbUrl);
    console.log('Database host:', url.hostname);
}
catch (error) {
    console.error('Invalid DATABASE_URL format:', error);
    process.exit(1);
}
// export const AppDataSource = new DataSource({
//     type: "postgres",
//     host: process.env.DB_HOST,
//     port: parseInt(process.env.DB_PORT || "5432"),
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     synchronize: true,
//     logging: true,
//     entities: [Users, Services, Items]
// })
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: dbUrl,
    synchronize: false,
    logging: true,
    migrations: [path_1.default.join(__dirname, "../migrations/*.ts")],
    migrationsTableName: "migrations",
    migrationsRun: true,
    entities: [Users_1.Users, Service_1.Services, Items_1.Items],
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});
