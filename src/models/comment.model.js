const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Comment = sequelize.define("Comment", {

  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

});

module.exports = Comment;