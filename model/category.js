const seq = require("../seq");
const Sequelize = require("sequelize");
const Category = seq.define("category", {
  cid: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: Sequelize.INTEGER,
  },
  parent_id: {
    type: Sequelize.INTEGER,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: "标签类别",
  },
  icon: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
    comment: "描述",
  },
});

module.exports = Category;
