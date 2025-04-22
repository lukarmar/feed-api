import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1744847326175 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'user',
              columns: [
                {
                  name: 'id',
                  type: 'uuid',
                  isPrimary: true,
                  generationStrategy: 'uuid',
                },
                {
                  name: 'name',
                  type: 'varchar',
                },
                {
                  name: 'email',
                  type: 'varchar',
                },
                {
                  name: 'password',
                  type: 'varchar',
                },
                {
                  name: 'created_at',
                  type: 'timestamp',
                  default: 'now()',
                },
                {
                  name: 'updated_at',
                  type: 'timestamp',
                  default: 'now()',
                },
                {
                  name: 'deleted_at',
                  type: 'timestamp',
                  isNullable: true,
                }
              ],
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user');
    }

}
