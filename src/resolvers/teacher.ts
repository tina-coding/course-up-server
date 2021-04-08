import { Arg, Field, InputType, Mutation, Query, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { Teacher } from '../entities/Teacher';

@InputType()
class CreateTeacherInput {
  @Field(() => String)
  fName!: string;

  @Field(() => String)
  lName!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => String, { nullable: true })
  office?: string;

  @Field(() => String)
  username: string;
}

@Resolver()
export class TeacherResolver {
  //--------------------------------------
  // Queries
  //--------------------------------------

  @Query(() => [Teacher])
  async teachers(): Promise<Teacher[]> {
    return await Teacher.find({});
  }

  //--------------------------------------
  // Mutations
  //--------------------------------------

  @Mutation(() => Boolean)
  async createTeacher(
    @Arg('options') options: CreateTeacherInput
  ): Promise<boolean> {
    // create the teacher => get the id => create the user => return { teacher, user }
    const { fName, lName, email, office, phone, username } = options;
    try {
      await getConnection().transaction(async (transactionmanager) => {
        const userId = await transactionmanager.query(
          `
         INSERT INTO "user" ("username")
         values ($1)
         RETURNING id;
        `,
          [username]
        );

        await transactionmanager.query(
          `
				  INSERT INTO teacher ("fName", "lName", "email", "phone", "office", "userId")
					values ($1, $2, $3, $4, $5, $6)
					RETURNING id;
				`,
          [fName, lName, email, phone, office, userId[0].id]
        );

      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
