const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');

// 진도 저장(POST)
router.post('/save', progressController.saveProgress);

// 진도 조회(GET)
router.get('/', progressController.getProgress);

module.exports = router;