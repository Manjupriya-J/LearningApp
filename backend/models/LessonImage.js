const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const LessonImage = sequelize.define("LessonImage", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  lesson_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "lessons",
      key: "id",
    },
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "lesson_images",
  timestamps: false,
});

module.exports = LessonImage;
