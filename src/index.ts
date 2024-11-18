import express, { Application } from "express";
import DataBase from "./DB/DBconnect";
import NoteRouter from "./router/NoteRouter";

const PORT: number = 4000;

class App {
  public app: Application;
  constructor() {
    this.app = express();
    this.databaseSync();
    this.plugins();
    this.routes();
  }

  protected plugins(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  protected databaseSync(): void {
    const db = new DataBase();
    db.sequelize?.sync();
  }

  protected routes(): void {
    this.app.use("/api/v1/note", NoteRouter);
  }
}

const app = new App().app;

app.listen(PORT, () => {
  console.log("Server is running");
});
