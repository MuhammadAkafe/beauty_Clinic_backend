import { DataSource } from "typeorm";
import { Users } from "../entity/Users";
import dotenv from "dotenv";
import { Services } from "../entity/Service";
import { Items } from "../entity/Items";
dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [Users, Services, Items]
})

