import { MigrationInterface, QueryRunner } from "typeorm";

export class DropServiceTable1748909210256 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "service"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "service" (
                "service_id" SERIAL PRIMARY KEY,
                "title" VARCHAR NOT NULL,
                "sub_title" VARCHAR,
                "items" JSONB,
                "created_at" TIMESTAMP DEFAULT now(),
                "updated_at" TIMESTAMP DEFAULT now()
            )
        `);
    }

}
