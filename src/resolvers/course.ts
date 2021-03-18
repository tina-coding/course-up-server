import { Course } from '../entities/Course';
import { Field, ObjectType, Query, Resolver } from 'type-graphql';

@ObjectType()
class FieldError {
  @Field(() => String)
  field: 'courses';

  @Field(() => String)
  message: string;
}

@ObjectType()
	class CourseResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];

	@Field(() => [Course], { nullable: true })
	courses?: Course[];
	}

@Resolver()
export class CourseResolver {
  //--------------------------------------
  // Queries
  //--------------------------------------

  @Query(() => CourseResponse)
  async courses(): Promise<CourseResponse> {
    const courses = await Course.find({}); // find all courses
		return courses.length > 0
      ? {courses}
      : ({
      errors: [
        {
          field: 'courses',
          message: 'There are no courses yet. Try to adding one.'
        }
      ]
    });
  }

  //--------------------------------------
  // Mutations
  //--------------------------------------
}
