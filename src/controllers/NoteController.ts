import { Request, Response } from "express";
import { Note } from "../models/Note";
import { NoteRepo } from "../repository/NoteRepo";
import asyncHandler from "../utils/asyncHandler";

class NoteController {
  create = asyncHandler(async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const newNote = new Note();
      newNote.name = data.name;
      newNote.description = data.description;

      await new NoteRepo().save(newNote);

      res.status(200).json({ message: "Note created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to create note" });
    }
  });
  update = asyncHandler(async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params["id"]);
      const data = req.body;
      const new_note = new Note();
      new_note.id = id;
      new_note.name = data.name;
      new_note.description = data.description;

      await new NoteRepo().update(new_note);

      res.status(200).json({ message: "Note updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to update note" });
    }
  });
  delete = asyncHandler(async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params["id"]);
      await new NoteRepo().delete(id);
      res.status(200).json({ message: "Note Deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete note" });
    }
  });
  findAll = asyncHandler(async (_req: Request, res: Response) => {
    try {
      const notes = await new NoteRepo().retriveAll();

      res.status(200).json({ message: "Note fetch All successfully", notes });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete note" });
    }
  });
  findByID = asyncHandler(async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params["id"]);
      const note = await new NoteRepo().retriveByID(id);
      res.status(200).json({ message: "Note fetch successfully", note });
    } catch (error) {
      res.status(500).json({ message: "Failed to find note" });
    }
  });
}

export default new NoteController();
