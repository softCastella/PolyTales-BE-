'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require("sequelize");
// const sqlite3 = require('better-sqlite3');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development"; // 환경변수에 NODE_ENV development
const config = require(__dirname + "/../config/config.json")[env]; // config/config.json
const db = {};

// const database = new sqlite3(path.join(__dirname, '../database/sample.db'), { verbose: console.log }); // SQLite 데이터베이스 연결

// sequelize 객체를 생성
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // SQLite는 config 객체만 넘기면 됨
  sequelize = new Sequelize(config);
}

// 모델 파일 동적으로 로드
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    ); // 데이터베이스 연결을 모델에 전달
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
