import {
  Query,
  Resolver
} from 'type-graphql';
import { Teacher } from '../entities/Teacher';


@Resolver()
export class TeacherResolver {
  //--------------------------------------
  // Queries
  //--------------------------------------

  @Query(() => [Teacher])
  async teachers(): Promise<Teacher[]> {
    return await Teacher.find({});
  }

}
