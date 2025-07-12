const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Question = sequelize.define("Question", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quiz_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  question: DataTypes.TEXT,
  option_a: DataTypes.STRING,
  option_b: DataTypes.STRING,
  option_c: DataTypes.STRING,
  option_d: DataTypes.STRING,
  correct_option: DataTypes.STRING,
}, {
  tableName: "questions",
  timestamps: false,
});

module.exports = Question;
