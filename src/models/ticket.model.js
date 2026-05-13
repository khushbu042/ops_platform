const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Ticket = sequelize.define("Ticket", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM(
      "open",
      "in_progress",
      "resolved",
      "closed"
    ),
    defaultValue: "open",
  },
  assignedTo: {
  type: DataTypes.INTEGER,
  allowNull: true,
  },
});

module.exports = Ticket;