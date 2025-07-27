const express = require("express");
const router = express.Router();
const noteController = require("../controllers/notes");

// http://localhost:3000/notes/
router.post("/notes", noteController.createNote);
router.get("/notes", noteController.findNotes);
router.get("/notes/:id", noteController.findNote);
router.put("/notes/:id", noteController.updateNote);
router.delete("/notes/:id", noteController.deleteNote);

module.exports = router;