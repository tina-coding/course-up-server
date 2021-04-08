import { StatisticsResolver } from './resolvers/statistics';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from "typeorm";
// Entities
import { Course } from './entities/Course';
import { Teacher } from './entities/Teacher';
import { User } from './entities/User';
// Resolvers
import { CourseResolver } from './resolvers/course';
import { TeacherResolver } from './resolvers/teacher';

const main = async () => {
	 await createConnection({
		type: 'postgres',
		database: "course-up-server",
		username: "postgres",
		password: "postgres",
		logging: true,
		synchronize: true,
		entities: [Course, Teacher, User]
	});

	const app = express();

	// setup cors
	app.use(
		cors({
			origin: "http://localhost:3000",
			credentials: true
		})
	);

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [CourseResolver, TeacherResolver, StatisticsResolver],
			validate: false,
			emitSchemaFile: true,
		}),
		context: ({ req, res }) => ({ req, res })
	});

	apolloServer.applyMiddleware({
		app,
		cors: false
	});

	app.listen(4000, () => "Listening on port 4000...");
}

main();