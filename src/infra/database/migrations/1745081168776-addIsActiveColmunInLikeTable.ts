import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsActiveColmunInLikeTable1745081168776 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.query(`
        ALTER TABLE "like" ADD COLUMN IF NOT EXISTS "is_active" BOOLEAN DEFAULT true;`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "like" DROP COLUMN IF EXISTS "is_active";`)
    }

}
