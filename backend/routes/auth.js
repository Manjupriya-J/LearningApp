const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models");

// ✅ Register Route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Register Request:", name, email);

  try {
    const existingUser = await User.findOne({ where: { email } });
    console.log("Existing user:", existingUser);

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });
    console.log("User created:", newUser.id);

    res.status(201).json({ message: "User registered successfully", userId: newUser.id });
  } catch (err) {
    console.error("🔥 Registration failed:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

// ✅ Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login Request:", email);

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // ✅ Login success
    console.log("User logged in:", user.name);
    res.status(200).json({
      message: "Login successful",
      userId: user.id,
      name: user.name,
    });
  } catch (err) {
    console.error("🔥 Login failed:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

module.exports = router;
