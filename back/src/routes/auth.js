// File: back/routes/auth.js
//백엔드에서 회원가입과 로그인 요청을 처리하는 라우터

const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

// http://localhost:3000/auth/register

//SNS간편 가입/로그인
<<<<<<< HEAD
router.post("/google", authController.googleAuth);
// router.post("/auth/naver", authController.register);
// router.post("/auth/kakao", authController.register);
=======
router.post("/auth/google", authController.register);
router.post("/auth/naver", authController.register);
router.post("/auth/kakao", authController.register);
>>>>>>> a27df77fd646921950b87dad19bf37c64c6086b3


// // http://localhost:3000/auth/login
// router.post('/login', authController.login);

module.exports = router;