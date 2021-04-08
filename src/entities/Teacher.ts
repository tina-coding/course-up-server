import { Course } from './Course';
import { Field, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

// Entities
import { User } from './User';

@ObjectType()
@Entity()
export class Teacher extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Int)
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Field(() => Int)
  @OneToMany(() => Course, (course) => course.teacher)
  courses: Course[];

  @Field(() => String)
  @Column()
  fName!: string;

  @Field(() => String)
  @Column()
  lName!: string;

  @Field(() => String)
  @Column({ nullable: false, unique: true })
  email!: string;

  @Field(() => String)
  @Column({ nullable: true })
  phone?: string;

  @Field(() => String)
  @Column({ nullable: true })
  office?: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
