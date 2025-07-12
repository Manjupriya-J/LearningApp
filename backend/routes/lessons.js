const express = require("express");
const router = express.Router(); // ✅ define router first

const Lesson = require("../models/Lesson");
const LessonImage = require("../models/LessonImage"); // if you're fetching images
// ✅ 1. Static prefix route — keep this FIRST
router.get("/module/:moduleId", async (req, res) => {
  try {
    const moduleId = parseInt(req.params.moduleId);
    const lessons = await Lesson.findAll({
      where: { module_id: moduleId },
    });

    console.log("📦 Lessons returned:", lessons);
    res.status(200).json(lessons);
  } catch (err) {
    console.error("❌ Error fetching lessons:", err);
    res.status(500).json({ message: "Failed to load lessons" });
  }
});

// ✅ 2. Dynamic route for single lesson — keep this AFTER
router.get("/:moduleId/:lessonId", async (req, res) => {
  const { moduleId, lessonId } = req.params;

  try {
    const lesson = await Lesson.findOne({
      where: {
        id: lessonId,
        module_id: moduleId,
      },
      include: [{ model: LessonImage, as: "images" }],
    });

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.status(200).json(lesson);
  } catch (error) {
    console.error("❌ Error fetching lesson:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
