import { Sequelize } from "sequelize-typescript";
import { Note } from "../models/Note";

// import * as dotenv from "dotenv";
// dotenv.config();

class DataBase {
  public sequelize: Sequelize | undefined;
  // private POSTGRES_DB = process.env.POSTGRES_DB as string;
  // private POSTGRES_HOST = process.env.POSTGRES_HOST as string;
  // private POSTGRES_PORT = process.env.POSTGRES_PORT as unknown as number;
  // private POSTGRES_USER = process.env.POSTGRES_USER as string;
  // private POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as string;
  env = process.env.NODE_ENV || "test";
  config = require(__dirname + "/../../config/config.json")[this.env];

  constructor() {
    this.connectTOPostgre();
    // console.log("here", this.config);
  }
  private async connectTOPostgre() {
    this.sequelize = new Sequelize({
      database: this.config.database,
      username: this.config.username,
      password: this.config.password,
      port: this.config.port,
      host: this.config.host,
      dialect: this.config.dialect,
      // logging: console.log,
      logging: false, // Disable query logging
      models: [Note],
    });

    this.sequelize
      .authenticate()
      .then(() => console.log("Connected database successfully"))
      .catch((err) => console.log("Failed to connect database", err));
  }
}

export default DataBase;
