import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { TABLE_NAME as SURVEYS_TABLE } from './1616682373259-CreateSurveysTable'
import { TABLE_NAME as USERS_TABLE } from './1616682335475-CreateUsersTable'

export const TABLE_NAME = 'survey_user'

export class CreateSurveyUserTable1616683003844 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: TABLE_NAME,
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'survey_id',
          type: 'uuid',
        },
        {
          name: 'user_id',
          type: 'uuid',
        },
        {
          name: 'value',
          type: 'number',
          isNullable: true,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'NOW()',
        },
      ],
      foreignKeys: [
        {
          name: 'fk_survey',
          referencedTableName: SURVEYS_TABLE,
          referencedColumnNames: ['id'],
          columnNames: ['survey_id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        {
          name: 'fk_user',
          referencedTableName: USERS_TABLE,
          referencedColumnNames: ['id'],
          columnNames: ['user_id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      ],
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TABLE_NAME)
  }
}
