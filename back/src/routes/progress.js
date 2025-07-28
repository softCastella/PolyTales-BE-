const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const progressController = require('../controllers/progress');
=======
const progressController = require('../controllers/progressController');
>>>>>>> a27df77fd646921950b87dad19bf37c64c6086b3

// 진도 저장(POST)
router.post('/progress', progressController.saveProgress);

// 진도 전체 조회(GET)
router.get('/progress', progressController.getProgress);

// 개별 스토리별 진도 조회(GET)
router.get('/progress', progressController.getProgress);

module.exports = router;