const mongoose = require("mongoose");

const gymSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "GymClass" }],
  trainers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  image: {
    type: Buffer,
    required: true,
  },
});

gymSchema.methods.toJSON = function () {
  const gym = this;
  const gymObject = gym.toObject();
  delete gymObject.image;
  return gymObject;
};

module.exports = mongoose.model("Gym", gymSchema);
