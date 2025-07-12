const sequelize = require("./config/db");
const { Quiz, Question, Lesson, Module } = require("./models");

const syncTables = async () => {
  try {
    await sequelize.sync({ alter: true }); // 🛡️ Safe sync
    console.log("✅ Tables synced without dropping existing data.");
    process.exit();
  } catch (error) {
    console.error("❌ Error syncing tables:", error);
    process.exit(1);
  }
};

syncTables();
