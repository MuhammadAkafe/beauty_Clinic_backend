import { DataSource } from "typeorm";
import { Users } from "../entity/Users";
import { Services } from "../entity/Service";
import { Items } from "../entity/Items";
import path from "path";
import dotenv from "dotenv";

const env = process.env.NODE_ENV;

dotenv.config({
    path: path.join(__dirname, `../../.env.${env}`)
});    




export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: false,
    logging: false,
    migrations: [path.join(__dirname, "../migrations/*.ts")],
    migrationsTableName: "migrations",
    entities: [Users, Services, Items],
    ssl: false
})






