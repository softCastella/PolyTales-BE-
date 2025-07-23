// back/src/routes/stories.js
const express = require('express');
const router = express.Router();
const storiesController = require('../controllers/stories');

// GET /stories - 스토리 목록 (레벨 필터링 가능)
router.get('/', storiesController.getStories);

// GET /stories/level/:level - 레벨별 스토리 (이것을 먼저 써야 함)
router.get('/level/:level', storiesController.getStoryByLevel);

// GET /stories/:id - 스토리 상세 (이것을 나중에 써야 함)
router.get('/:id', storiesController.getStoryById);

module.exports = router;