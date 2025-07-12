const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Quiz = sequelize.define("Quiz", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  module_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "quizzes",
  timestamps: false,
});

module.exports = Quiz;
