const express = require("express");
const auth = require("../middleware/auth");
const GymClass = require("../models/gymClass");
const User = require("../models/user");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const trainers = await User.find({ role: "CLIENT" });
    res.json(trainers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/classes", auth, async (req, res) => {
  try {
    const classes = await GymClass.find({ clients: res.user._id })
      .populate("trainer", "first_name last_name email")
      .populate("clients", "first_name last_name email");
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/availableClasses", auth, async (req, res) => {
  try {
    const classes = await GymClass.find({ clients: { $ne: res.user._id } }).populate(
      "trainer",
      "first_name last_name email"
    );
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
