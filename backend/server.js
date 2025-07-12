const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const authRoutes = require('./routes/auth');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
const quizRoutes = require('./routes/quiz');
const lessonRoutes = require('./routes/lessons');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonRoutes);

app.use('/api/quizzes', quizRoutes);

// Test DB & Start server
sequelize.sync()
  .then(() => {
    console.log("✅ Connected to MySQL & models synced");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection error:", err);
  });
