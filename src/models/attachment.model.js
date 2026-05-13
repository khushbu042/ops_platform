const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const Attachment = sequelize.define(
  "Attachment",
  {

    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    filePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    mimeType: {
      type: DataTypes.STRING,
    },

  }
);

module.exports = Attachment;