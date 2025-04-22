import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateLikeTable1744847906674 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
                            new Table({
                              name: 'like',
                              columns: [
                                {
                                  name: 'id',
                                  type: 'uuid',
                                  isPrimary: true,
                                  generationStrategy: 'uuid',
                                },
                                {
                                  name: 'post_id',
                                  type: 'uuid',
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
                                'like',
                                new TableForeignKey({
                                columnNames: ['post_id'],
                                referencedTableName: 'post',
                                referencedColumnNames: ['id'],
                                onDelete: 'CASCADE', 
                                })
                            );

                          await queryRunner.createForeignKey(
                            'like',
                            new TableForeignKey({
                              columnNames: ['user_id'],
                              referencedTableName: 'user',
                              referencedColumnNames: ['id'],
                              onDelete: 'CASCADE', 
                            })
                          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('like');
        const foreignKeyPost = table?.foreignKeys.find(fk => fk.columnNames.indexOf('post_id') !== -1);
        const foreignKeyUser = table?.foreignKeys.find(fk => fk.columnNames.indexOf('user_id') !== -1);
        if (foreignKeyPost) {
            await queryRunner.dropForeignKey('like', foreignKeyPost);
        }
        if (foreignKeyUser) {
            await queryRunner.dropForeignKey('like', foreignKeyUser);
        }
        await queryRunner.dropTable('like');
    }

}
