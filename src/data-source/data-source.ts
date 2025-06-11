import { DataSource } from "typeorm";
import { Users } from "../entity/Users";
import { Services } from "../entity/Service";
import { Items } from "../entity/Items";
import path from "path";




const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) 
    {
    console.error('DATABASE_URL is not set in .env.production');
    process.exit(1);
}


try {
    const url = new URL(dbUrl);
    console.log('Database host:', url.hostname);
} catch (error) 
{
    console.error('Invalid DATABASE_URL format:', error);
    process.exit(1);
}


export const AppDataSource = new DataSource({
    type: "postgres",
    url: dbUrl,
    synchronize: false,
    logging: true,
    migrations: [path.join(__dirname, "../migrations/*.ts")],
    migrationsTableName: "migrations",
    migrationsRun: true,
    entities: [Users, Services, Items],
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
})






