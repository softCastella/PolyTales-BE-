const express = require("express");
const router = express.Router();
const noteController = require("../controllers/notes");

// http://localhost:3000/notes
router.post("/", noteController.createNote);      // 노트 생성
router.get("/", noteController.findNotes);        // 노트 목록
router.get("/:id", noteController.findNote);      // 노트 상세
router.put("/:id", noteController.updateNote);    // 노트 수정
router.delete("/:id", noteController.deleteNote); // 노트 삭제

module.exports = router;