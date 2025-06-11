import { DataSource } from "typeorm";
import { Users } from "../entity/Users";
import { Services } from "../entity/Service";
import { Items } from "../entity/Items";
import path from "path";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "1234",
    database: "beautyclinic",
    synchronize: false,
    logging: true,
    migrations: [path.join(__dirname, "../migrations/*.ts")],
    migrationsTableName: "migrations",
    entities: [Users, Services, Items],
    ssl: false
})






