const express = require("express");
const router = express.Router();
const GymClass = require("../models/gymClass");
const auth = require("../middleware/auth");
const User = require("../models/user");

// Getting all
router.get("/", async (req, res) => {
  try {
    const classes = await GymClass.find()
      .populate("trainer", "first_name last_name email")
      .populate("clients", "first_name last_name email");
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id/image", async (req, res) => {
  try {
    const gymClass = await GymClass.findById(req.params.id);

    if (!gymClass || !gymClass.image) {
      throw new Error("Model Error");
    }
    res.set("Content-Type", "image/jpg");
    res.send(gymClass.image);
  } catch (e) {
    res.status(404).send();
  }
});

router.post("/:id/clients", getClass, auth, async (req, res) => {
  const client = await User.findById(res.user._id);
  if (!client) {
    throw new Error("Please authenticate!");
  }
  try {
    if (res.gymClass.capacity > 0) {
      res.gymClass.clients.push(client);
      res.gymClass.capacity = res.gymClass.capacity - 1;
    } else {
      throw new Error();
    }
  } catch {
    return res.status(404).json({ message: "No places available" });
  }
  try {
    const updatedClass = await res.gymClass.save();
    res.json(updatedClass);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/:id", getClass, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "price", "capacity", "date"];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    res.status(400).json({ error: "Invalid field in request body!" });
  }

  try {
    updates.forEach((update) => (res.gymClass[update] = req.body[update]));
    const updatedClass = await res.gymClass.save();
    res.json(updatedClass);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", getClass, async (req, res) => {
  try {
    await res.gymClass.remove();
    res.json({ message: "Deleted class" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getClass(req, res, next) {
  let gymClass;
  try {
    gymClass = await GymClass.findById(req.params.id);
    if (gymClass == null) {
      return res.status(404).json({ message: "Cannot find class" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.gymClass = gymClass;
  next();
}

module.exports = router;
