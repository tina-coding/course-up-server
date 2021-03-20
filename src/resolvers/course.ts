import { Course } from '../entities/Course';
import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver
} from 'type-graphql';

@InputType()
class CreateCourseInput {
  @Field(() => String, {
    description:
      'Course number, please prefix it with the department name. Cannot duplicate.'
  })
  courseRef: string;

  @Field(() => String, {
    description:
      'The name of the course, try not to make it too long but make it unique.'
  })
  name: string;

  @Field(() => String, {
    description:
      'Please describe the course, prerequisites and what the students will get out of it.'
  })
  description: string;

  @Field(() => Int, {
    description: 'The number of credits this course satifies.'
  })
  credits: number;
}

@ObjectType()
class FieldError {
  @Field(() => String)
  field: 'courses' | 'course';

  @Field(() => String)
  message: string;
}

@ObjectType()
class CoursesResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => [Course], { nullable: true })
  courses?: Course[];
}
@ObjectType()
class CourseResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Course, { nullable: true })
  course?: Course;
}

@Resolver()
export class CourseResolver {
  //--------------------------------------
  // Queries
  //--------------------------------------

  @Query(() => CoursesResponse)
  async courses(): Promise<CoursesResponse> {
    const courses = await Course.find({}); // find all courses
    return courses.length > 0
      ? { courses }
      : {
          errors: [
            {
              field: 'courses',
              message: 'There are no courses yet. Try to adding one.'
            }
          ]
        };
  }

  //--------------------------------------
  // Mutations
  //--------------------------------------

  @Mutation(() => CourseResponse)
  async createCourse(
    @Arg('options') options: CreateCourseInput
  ): Promise<CourseResponse> {
    let course;
    try {
      course = await Course.create(options).save();
    } catch (error) {
      console.log({ error });
      // User tries to add a course with existing courseRef
      if (error.code === '23505' && error.detail.includes('courseRef')) {
        return {
          errors: [
            {
              field: 'course',
              message: 'A course with that course number already exists.'
            }
          ]
        };
      }
    }
    return { course };
  }
}
