import { DataSource } from "typeorm";
import { Users } from "../entity/Users";
import { Services } from "../entity/Service";
import { Items } from "../entity/Items";
import path from "path";

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: false,
    logging: true,
    migrations: [path.join(__dirname, "../migrations/*.ts")],
    migrationsTableName: "migrations",
    entities: [Users, Services, Items],
    ssl: false
})






