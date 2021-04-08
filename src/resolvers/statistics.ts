import { Int, Query, Resolver } from "type-graphql";
import { getConnection } from 'typeorm';


@Resolver()
export class StatisticsResolver {
	/**
	 * Teachers Count: queries the teacher table and counts the number of rows
	 * or the number of teachers in the db
	 * @returns int, number of rows in teacher table
	 */
	@Query(() => Int)
	async teachersCount(): Promise<number> {
		const result = await getConnection().query(`SELECT COUNT(*) FROM teacher;`);
		return result[0].count;
	}

	/**
	 * Courses Count: queries the course table and counts the number of courses
	 * @returns int, number of rows in course table
	 */
	@Query(() => Int)
	async coursesCount(): Promise<number> {
		const result = await getConnection().query(`SELECT COUNT(*) FROM course;`);
		return result[0].count;
	}
}