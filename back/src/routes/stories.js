// back/src/routes/stories.js
const express = require('express');
const router = express.Router();
const storiesController = require('../controllers/stories');

// GET /stories - 스토리 목록 (레벨 필터링 가능)
router.get('/stories', storiesController.getStories);

// GET /stories/:id - 스토리 상세
router.get('/stories/:id', storiesController.getStoryById);

// GET /stories/level/:level - 레벨별 스토리
router.get('/stories?level=:level', storiesController.getStoryByLevel);

module.exports = router;