import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('survey_user')
class SurveyUser extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column()
  surveyId: string

  @Column()
  userId: string

  @Column()
  value: number

  @CreateDateColumn()
  createdAt: Date
}

export default SurveyUser
