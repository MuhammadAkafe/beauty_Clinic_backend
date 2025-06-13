"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("../entity/Users");
const Service_1 = require("../entity/Service");
const Items_1 = require("../entity/Items");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const env = process.env.NODE_ENV;
dotenv_1.default.config({
    path: path_1.default.join(__dirname, `../../.env.${env}`)
});
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: false,
    logging: false,
    migrations: [path_1.default.join(__dirname, "../migrations/*.ts")],
    migrationsTableName: "migrations",
    entities: [Users_1.Users, Service_1.Services, Items_1.Items],
    ssl: false
});
