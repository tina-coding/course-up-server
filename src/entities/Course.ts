import { Teacher } from './Teacher';
import { Field, Int, ObjectType } from 'type-graphql';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
  ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';

@ObjectType()
@Entity()
export class Course extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  teacherId: number;

  @Field()
  @ManyToOne(() => Teacher, (teacher) => teacher.courses)
  teacher: Teacher;

	@Field(() => String)
	@Column({ nullable: false, unique: true })
	courseRef!: string;

  @Field(() => String)
  @Column({ nullable: false })
  name!: string;

	@Field(() => String)
  @Column({ nullable: false })
  description!: string;

	@Field(() => Int)
  @Column({ nullable: false, type: 'int'})
  credits!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

}
