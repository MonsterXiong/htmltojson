const seq = require("../seq");
const Sequelize = require("sequelize");
const Bookmark = seq.define("bookmark", {
  cid: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: "书签名称",
  },
  icon: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
    comment: "描述",
  },
});

module.exports = Bookmark;
