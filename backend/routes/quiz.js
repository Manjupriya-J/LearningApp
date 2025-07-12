const express = require("express");
const router = express.Router();
const { Quiz, Question } = require("../models");

router.get("/:moduleId", async (req, res) => {
  try {
    // 1. Find quiz for the module
    const quiz = await Quiz.findOne({
      where: { module_id: req.params.moduleId },
    });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found for this module" });
    }

    // 2. Find questions for that quiz
    const questions = await Question.findAll({
      where: { quiz_id: quiz.id },
    });

    res.json(questions);
  } catch (err) {
    console.error("🔥 Error fetching quiz:", err);
    res.status(500).json({ message: "Error fetching quiz", error: err.message });
  }
});

module.exports = router;
