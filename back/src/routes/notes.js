const express = require("express");
const router = express.Router();
const noteController = require("../controllers/notes");

// http://localhost:3000/notes/
router.post("/", noteController.createNote);
router.get("/", noteController.findNotes);
router.get("/:id", noteController.findNote);
router.put("/:id", noteController.updateNote);
router.delete("/:id", noteController.deleteNote);

module.exports = router;