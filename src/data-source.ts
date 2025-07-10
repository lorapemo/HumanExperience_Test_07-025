import { DataSource } from "typeorm";
import { Task } from "./entities/Task";
import { User } from "./entities/User";
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Task, User],
  subscribers: [],
  migrations: [],
});