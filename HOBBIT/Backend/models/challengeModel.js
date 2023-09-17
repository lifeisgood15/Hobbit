const mongoose = require("mongoose");
challengeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a challenge name"],
    },
    motivation: {
      type: String,
      required: [true, "Please add a challenge motivation"],
    },
    target: {
      type: String,
      required: [true, "Please add a challenge target"],
    },
    createdDate: {
      type: Date,
      required: [true, "Created date is missing"],
    },
    progress: {
      type: String,
      enum: ["inProgress", "completed", "gaveUp", "newGoal"],
    },
    logs: {
      type: [Date],
    },
    pastTries: {
      type: [Date],
    },
    latest: {
      type: Date,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Challenge", challengeSchema);
