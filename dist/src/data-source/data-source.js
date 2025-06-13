"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Users_1 = require("../entity/Users");
const Service_1 = require("../entity/Service");
const Items_1 = require("../entity/Items");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
let AppDataSource;
const env = process.env.NODE_ENV || 'development';
// Load environment variables from the root directory
dotenv_1.default.config({
    path: path_1.default.resolve(process.cwd(), `.env.${env}`)
});
if (process.env.NODE_ENV === 'development') {
    AppDataSource = new typeorm_1.DataSource({
        type: "postgres",
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432'),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: true,
        logging: false,
        migrations: [path_1.default.join(__dirname, "../migrations/*.ts")],
        migrationsTableName: "migrations",
        entities: [Users_1.Users, Service_1.Services, Items_1.Items]
    });
}
else {
    if (!process.env.DATABASE_URL_PROD) {
        throw new Error('DATABASE_URL_PROD is not defined in production environment');
    }
    AppDataSource = new typeorm_1.DataSource({
        type: "postgres",
        url: process.env.DATABASE_URL_PROD,
        synchronize: false,
        logging: false,
        migrations: [path_1.default.join(__dirname, "../migrations/*.ts")],
        migrationsTableName: "migrations",
        migrationsRun: true,
        entities: [Users_1.Users, Service_1.Services, Items_1.Items],
        ssl: true
    });
}
exports.default = AppDataSource;
