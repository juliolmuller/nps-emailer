import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
class Survey extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column()
  title: string

  @Column()
  description: string

  @CreateDateColumn()
  createdAt: Date
}

export default Survey
