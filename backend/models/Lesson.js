const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Lesson = sequelize.define("Lesson", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  module_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "modules",
      key: "id",
    },
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image_url: DataTypes.STRING,
  video_url: DataTypes.STRING,
}, {
  tableName: "lessons",
  timestamps: false,
});

module.exports = Lesson;
