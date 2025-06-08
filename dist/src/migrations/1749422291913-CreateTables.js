"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTables1749422291913 = void 0;
class CreateTables1749422291913 {
    constructor() {
        this.name = 'CreateTables1749422291913';
    }
    async up(queryRunner) {
        // Drop existing tables if they exist
        await queryRunner.query(`DROP TABLE IF EXISTS "items" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "services" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "users" CASCADE`);
        // Create users table
        await queryRunner.query(`
            CREATE TABLE "users" (
                "user_id" SERIAL NOT NULL,
                "username" text NOT NULL,
                "email" text NOT NULL,
                "password" text NOT NULL,
                "isAdmin" boolean NOT NULL DEFAULT false,
                "url" text,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_users_email" UNIQUE ("email"),
                CONSTRAINT "PK_users" PRIMARY KEY ("user_id")
            )
        `);
        // Create services table
        await queryRunner.query(`
            CREATE TABLE "services" (
                "service_id" SERIAL NOT NULL,
                "user_id" integer NOT NULL,
                "title" text NOT NULL,
                "sub_title" text NOT NULL,
                "status" text NOT NULL DEFAULT 'جلسه',
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_services" PRIMARY KEY ("service_id"),
                CONSTRAINT "FK_services_users" FOREIGN KEY ("user_id") 
                    REFERENCES "users"("user_id") ON DELETE CASCADE
            )
        `);
        // Create items table
        await queryRunner.query(`
            CREATE TABLE "items" (
                "item_id" SERIAL NOT NULL,
                "service_id" integer NOT NULL,
                "type" text NOT NULL,
                "price" integer NOT NULL,
                CONSTRAINT "PK_items" PRIMARY KEY ("item_id"),
                CONSTRAINT "FK_items_services" FOREIGN KEY ("service_id") 
                    REFERENCES "services"("service_id") ON DELETE CASCADE
            )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "items"`);
        await queryRunner.query(`DROP TABLE "services"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
exports.CreateTables1749422291913 = CreateTables1749422291913;
