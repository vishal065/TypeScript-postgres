import { Note } from "../models/Note";

interface INoteRepo {
  save(note: Note): Promise<void>;
  update(note: Note): Promise<void>;
  delete(noteID: number): Promise<void>;
  retriveByID(noteID: number): Promise<Note>;
  retriveAll(): Promise<Note[]>;
}

export class NoteRepo implements INoteRepo {
  async save(note: Note): Promise<void> {
    try {
      await Note.create({
        name: note.name,
        description: note.description,
      });
      console.log("Note saved successfully");
    } catch (error) {
      console.error("Error saving note:", error);
      throw new Error("Failed to create note");
    }
  }
  async update(note: Note): Promise<void> {
    try {
      console.log("note in repo ", note);

      const new_note = await Note.findByPk(note.id);
      console.log(new_note);

      if (!new_note) throw new Error("Note not found");
      new_note.name = note.name;
      new_note.description = note.description;
      const abc = await new_note.save();
      console.log("abc", abc);
    } catch (error) {
      throw new Error("Failed to update note");
    }
  }
  async delete(noteID: number): Promise<void> {
    try {
      const new_note = await Note.findOne({
        where: {
          id: noteID,
        },
      });
      if (!new_note) throw new Error("Note not found");
      await new_note.destroy();
    } catch (error) {
      throw new Error("Failed to delete note");
    }
  }
  async retriveByID(noteID: number): Promise<Note> {
    try {
      const note = await Note.findByPk(noteID);

      if (!note) throw new Error("Failed to retrive note");

      return note;
    } catch (error) {
      throw new Error("Failed to retrive note");
    }
  }
  async retriveAll(): Promise<Note[]> {
    try {
      const notes = await Note.findAll();
      if (!notes) throw new Error("No note found");

      return notes;
    } catch (error) {
      throw new Error("Failed to retrive note");
    }
  }
}
