import dotenv from "dotenv";
import { DataSource } from "typeorm";
import {
  dbHost,
  dbName,
  dbPassword,
  dbPort,
  dbUsername,
} from "../utils/constants";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: dbHost,
  port: dbPort,
  username: dbUsername,
  password: dbPassword,
  database: dbName,
  synchronize: true,
  logging: false,
  entities: ["src/entities/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: ["src/subscribers/**/*.ts"],
});

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connection established");
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};
