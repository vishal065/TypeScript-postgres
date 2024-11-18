import NoteController from "../controllers/NoteController";
import validate from "../helper/validate";
import {
  createNoteSchema,
  updateNoteSchema,
} from "../validation/NoteValidation";
import BaseRoutes from "./indexRouter";

class NoteRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post(
      "/create",
      validate(createNoteSchema),
      NoteController.create
    );
    this.router.patch(
      "/update/:id",
      validate(updateNoteSchema),
      NoteController.update
    );
    this.router.delete("/delete/:id", NoteController.delete);
    this.router.get("/", NoteController.findAll);
    this.router.get("/:id", NoteController.findByID);
  }
}

export default new NoteRoutes().router;
