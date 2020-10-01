import { ConnectionOptions } from "typeorm";

export const connectionOptions: ConnectionOptions = {
  database: "test",
  synchronize: true,
  logging: true,
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: ["src/entities/**.*.ts"],
};
