const User = require("./User");
const Quiz = require("./Quiz");
const Lesson = require("./Lesson");
const Module = require("./Module");
const Question=require("./Question");
const LessonImage=require("./LessonImage")
// ✅ if not yet created, see below

// Define associations if needed
// Example: Quiz.belongsTo(Module, { foreignKey: "module_id" });
Quiz.hasMany(Question, { foreignKey: "quiz_id", as: "questions" });
Question.belongsTo(Quiz, { foreignKey: "quiz_id" });
Lesson.hasMany(LessonImage, { foreignKey: "lesson_id", as: "images" });
LessonImage.belongsTo(Lesson, { foreignKey: "lesson_id" });


module.exports = { Quiz, Question };
module.exports = {
  User,
  Quiz,
  Lesson,
  Module,
  Question,
  LessonImage
};
