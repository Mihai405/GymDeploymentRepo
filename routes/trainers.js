const express = require("express");
const auth = require("../middleware/auth");
const Gym = require("../models/gym");
const GymClass = require("../models/gymClass");
const router = express.Router();
const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const trainers = await User.find({ role: "TRAINER" });
    res.json(trainers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/classes", auth, async (req, res) => {
  try {
    const classes = await GymClass.find({ trainer: res.user._id })
      .populate("trainer", "first_name last_name email")
      .populate("clients", "first_name last_name email");
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/gyms", auth, async (req, res) => {
  try {
    const gyms = await Gym.find({ trainers: res.user._id });
    res.json(gyms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/availableGyms", auth, async (req, res) => {
  try {
    const gyms = await Gym.find({ trainers: { $ne: res.user._id } });
    res.json(gyms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
