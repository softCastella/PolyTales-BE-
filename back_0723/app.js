// back/app.js 또는 서버의 진입점
require('dotenv').config(); // .env 파일 로드

const express = require('express');
const cors = require("cors");
const path = require("path");

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const authRouter = require("./src/routes/auth");
const postRouter = require("./src/routes/postRouter");
const todosRouter = require("./src/routes/todos");
const models = require("./src/models");
const { logger, logging } = require("./src/middlewares/logger");

const app = express();
const uploadDir = `public/uploads`;
app.use(logging); // 로깅 미들웨어
// 미들웨어 설정 (반드시 express.json()이나 라우터보다 위에 위치해야 합니다.)
app.use(cors({
  origin: 'http://localhost:3001',           // 프론트엔드 주소
  credentials: true,                         // 인증 정보 포함 허용
  exposedHeaders: ['Authorization']          // 응답 헤더에서 Authorization 허용
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/posts", postRouter);
app.use("/todos", todosRouter);

// Swagger 설정
const swaggerDocument = YAML.load(path.join(__dirname, "swagger.yaml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 파일 다운로드 경로 설정
app.use(`/downloads`, express.static(path.join(__dirname, uploadDir)));

// 404 에러 처리
app.use((req, res) => {
  res.status(404).json({
    status: "Fail",
    message: "요청한 리소스를 찾을 수 없습니다.",
  });
});

// 500 에러 처리
app.use((err, req, res, next) => {
  logger.error(`Server Error: ${err.message}`, { stack: err.stack });
  res.status(500).json({
    status: "Error",
    message: `서버 오류: ${err.stack}`,
  });
});

// ----------------------- [서버 시작] -----------------------
const PORT = process.env.PORT || 3000; // 포트 설정
app.listen(PORT, () => {
  logger.info(`서버가 http://localhost:${PORT} 에서 실행 중 입니다.`);
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중 입니다.`);
  models.sequelize
    .sync({ force: false }) // true -> false
    .then(() => {
      console.log("DB connected");
    })
    .catch(() => {
      console.error("DB error");
      process.exit();
    });
});

// const initializeDatabase = require('./src/database/initDatabase');