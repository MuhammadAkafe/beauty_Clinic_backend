import { MigrationInterface, QueryRunner } from "typeorm";

export class DropUsersTable1709123456789 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "users"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "user_id" BIGSERIAL PRIMARY KEY,
                "username" text NOT NULL,
                "email" text NOT NULL UNIQUE,
                "password" text NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now()
            )
        `);
    }
} 