import { DataSource } from "typeorm";
import { Users } from "../entity/Users";
import { Services } from "../entity/Service";
import { Items } from "../entity/Items";
import path from "path";
import dotenv from "dotenv";

let AppDataSource: DataSource;
const env = process.env.NODE_ENV || 'development';

// Load environment variables from the root directory
dotenv.config({
    path: path.resolve(process.cwd(), `.env.${env}`)
});

if(process.env.NODE_ENV === 'development') {
  AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    migrations: [path.join(__dirname, "../migrations/*.ts")],
    migrationsTableName: "migrations",
    entities: [Users, Services, Items]
  })
}
else {
  if (!process.env.DATABASE_URL_PROD) {
    throw new Error('DATABASE_URL_PROD is not defined in production environment');
  }
  
  AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL_PROD,
    synchronize: false,
    logging: false,
    migrations: [path.join(__dirname, "../migrations/*.ts")],
    migrationsTableName: "migrations",
    migrationsRun: true,
    entities: [Users, Services, Items],
    ssl: true
  })
}

export default AppDataSource;



