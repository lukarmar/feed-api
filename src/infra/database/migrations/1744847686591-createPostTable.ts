import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePostTable1744847686591 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.createTable(
                    new Table({
                      name: 'post',
                      columns: [
                        {
                          name: 'id',
                          type: 'uuid',
                          isPrimary: true,
                          generationStrategy: 'uuid',
                        },
                        {
                          name: 'content',
                          type: 'varchar',
                        },
                        {
                          name: 'user_id',
                          type: 'uuid',
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
                  await queryRunner.createForeignKey(
                    'post',
                    new TableForeignKey({
                      columnNames: ['user_id'],
                      referencedTableName: 'user',
                      referencedColumnNames: ['id'],
                      onDelete: 'CASCADE', 
                    })
                  );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('post');
        const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.indexOf('user_id') !== -1);
        if (foreignKey) {
            await queryRunner.dropForeignKey('post', foreignKey);
        }
        await queryRunner.dropTable('post');
    }

}
