// 📁 seed.js — Full Seeding Script for Modules, Lessons & Quizzes

const sequelize = require("./config/db");
const { Module, Lesson, Quiz, Question } = require("./models");

const seed = async () => {
  await sequelize.drop();       // ✅ Drops all tables respecting foreign key constraints
  await sequelize.sync();       // ✅ Recreates all tables
  console.log("🔁 Tables dropped and recreated");

  const modules = [
    { title: "Introduction to ISL", description: "Learn the basics and importance of Indian Sign Language" },
    { title: "Basic Signs", description: "Start practicing foundational hand gestures used in ISL" },
    { title: "Common Phrases", description: "Practice useful day‑to‑day ISL phrases." },
    { title: "Family & Relations", description: "Signs for family members and relationships." },
    { title: "Daily Activities", description: "Signs you use every day, like eating or sleeping." },
    { title: "Numbers & Counting", description: "Learn how to count and sign numbers in ISL." },
    { title: "Colors & Shapes", description: "Identify colors and shapes through signs." },
    { title: "Emotions & Feelings", description: "Express feelings like happy, sad, angry." },
    { title: "Food & Drinks", description: "Signs for your favorite foods and drinks." },
    { title: "Emergency Signs", description: "Important signs for urgent situations." },
  ];

  for (let i = 0; i < modules.length; i++) {
    const mod = await Module.create(modules[i]);

    // Seed 2 lessons for each module
    const lesson1 = await Lesson.create({
      module_id: mod.id,
      title: `${mod.title} - Lesson 1`,
      description: `Basic understanding of ${mod.title}`,
      thumbnail: "https://via.placeholder.com/150",
      video_url: "https://www.youtube.com/embed/sample1",
    });

    const lesson2 = await Lesson.create({
      module_id: mod.id,
      title: `${mod.title} - Lesson 2`,
      description: `Practice and more on ${mod.title}`,
      thumbnail: "https://via.placeholder.com/150",
      video_url: "https://www.youtube.com/embed/sample2",
    });

    // Seed quiz
    const quiz = await Quiz.create({
      module_id: mod.id,
      title: `${mod.title} Quiz`,
    });

    await Question.bulkCreate([
      {
        quiz_id: quiz.id,
        question: `What is ${mod.title}?`,
        option_a: "Option A",
        option_b: "Option B",
        option_c: "Option C",
        option_d: "Option D",
        correct_option: "A",
      },
      {
        quiz_id: quiz.id,
        question: `Why is ${mod.title} important?`,
        option_a: "Option A",
        option_b: "Option B",
        option_c: "Option C",
        option_d: "Option D",
        correct_option: "B",
      },
      {
        quiz_id: quiz.id,
        question: `Where can we use ${mod.title}?`,
        option_a: "Option A",
        option_b: "Option B",
        option_c: "Option C",
        option_d: "Option D",
        correct_option: "C",
      },
    ]);
  }

  console.log("✅ All modules, lessons, quizzes, and questions seeded!");
  process.exit();
};

seed().catch((err) => {
  console.error("❌ Seeding error:", err);
  process.exit(1);
});
