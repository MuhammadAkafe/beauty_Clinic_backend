import { MigrationInterface, QueryRunner } from "typeorm";

export class Services1748910773165 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "service" (
                "service_id" SERIAL PRIMARY KEY,
                "title" VARCHAR NOT NULL,
                "sub_title" VARCHAR,
                "items" JSONB,
                "created_at" TIMESTAMP DEFAULT now(),
                "updated_at" TIMESTAMP DEFAULT now()
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "service"`);
    }

}
