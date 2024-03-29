import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
class SurveyResponse extends BaseEntity {

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

export default SurveyResponse
