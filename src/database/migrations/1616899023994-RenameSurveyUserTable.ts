import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { TABLE_NAME as OLD_TABLE_NAME } from './1616683003844-CreateSurveyUserTable'

export const TABLE_NAME = 'survey_responses'

export class RenameSurveyUserTable1616899023994 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable(OLD_TABLE_NAME, TABLE_NAME)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable(TABLE_NAME, OLD_TABLE_NAME)
  }
}
