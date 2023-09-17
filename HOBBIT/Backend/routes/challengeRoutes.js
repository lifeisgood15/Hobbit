const express = require("express");
const router = express.Router();
const Challenge = require("../models/challengeModel");
const { protect } = require("../middleware/auth");
const {
  getMyChallenges,
  createNewChallenge,
  addTodaysLog,
  updateChallenge,
  deleteChallenge,
} = require("../controller/challengeController");
router.get("/my-challenges/:userId", protect, async (req, res, next) => {
  getMyChallenges(req, res, next);
});

router.post("/add-challenge", protect, async (req, res, next) => {
  createNewChallenge(req, res, next);
});

router.post("/add-log/:challengeId", protect, async (req, res, next) => {
  addTodaysLog(req, res, next);
});

router.put("/update-challenge/:id", protect, async (req, res, next) => {
  updateChallenge(req, res, next);
});

router.delete("/delete-challenge/:id", protect, async (req, res, next) => {
  deleteChallenge(req, res, next);
});
module.exports = router;
