/**
 * @description 配置 sequelize ，连接 mysql
 */

const Sequelize = require("sequelize");

// 连接配置
const conf = {
  host: "127.0.0.1",
  port: 3306,
  dialect: "mysql",
};

// 创建连接
const seq = new Sequelize("bookmarks", "root", "123456", conf);

// seq.query("create database if not exists bookmarks");
module.exports = seq;
// require("./model/index.js");
// seq.sync({ alter: true });
// 测试连接，直接运行 node src/db/seq/utils/conn-test.js
// seq
//   .authenticate()
//   .then(() => {
//     console.log("ok");
//   })
//   .catch(() => {
//     console.log("fail");
//   })
//   .finally(() => {
//     process.exit();
//   });
