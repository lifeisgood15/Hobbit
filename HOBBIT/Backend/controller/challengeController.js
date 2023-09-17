const User = require("../models/userModel");
const Challenge = require("../models/challengeModel");

const getMyChallenges = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (userId) {
      const { search } = req.query;

      const findQuery = { user: userId };
      if (search?.trim().length > 0) {
        findQuery.name = { $regex: new RegExp(search, "i") };
      }
      const challenges = await Challenge.find(findQuery).sort({ latest: -1 });
      res.status(200);
      res.json(challenges);
    } else {
      res.status(400);
      res.json({ error: "Invalid request. User id is missing" });
    }
  } catch (error) {
    res.status(400);
    res.json({ error: "Something went wrong" });
  }
};

const createNewChallenge = async (req, res, next) => {
  const { name, motivation, target, userId } = req.body;
  if (name && motivation && target && userId) {
    const user = await User.findById(userId);
    if (user) {
      const newChallenge = new Challenge({
        name: String(name).trim().normalize(),
        motivation: String(motivation).trim().normalize(),
        target: String(target).trim().normalize(),
        createdDate: new Date(),
        restartDate: [],
        progress: "inProgress",
        logs: [],
        pastTries: [],
        user: userId,
      });
      const insertedChallenge = await Challenge.create(newChallenge);
      if (insertedChallenge) {
        res.status(201);
        res.json({ message: "Challenge inserted" });
      } else {
        res.status(400);
        res.json({
          error: "Something went wrong when trying to add new challenge.",
        });
      }
    } else {
      res.status(400);
      res.json({ error: "User ID is not valid" });
    }
  } else {
    res.status(400);
    res.json({ error: "Please fill all fields" });
  }
};

const addTodaysLog = async (req, res, next) => {
  const { challengeId } = req.params;
  if (challengeId) {
    const challenge = await Challenge.findById(challengeId);
    if (challenge) {
      const toUpdate = {};
      let logs = challenge.logs;
      let pastTries = challenge.pastTries;

      if (challenge.progress === "gaveUp") {
        toUpdate.progress = "inProgress";
      }
      if (logs?.length <= 0) {
        logs = [];
        logs.push(new Date());
        toUpdate.logs = logs;
      } else if (logs?.length > 0) {
        const latestEntry = logs[logs.length - 1];
        const todayMidnight = new Date().setHours(23, 59, 59);
        const daysInBetween =
          (todayMidnight - new Date(latestEntry)) / (1000 * 60 * 60 * 24);

        if (daysInBetween >= 1 && daysInBetween < 2) {
          logs.push(new Date());
          toUpdate.logs = logs;
          if (logs.length === 20) {
            toUpdate.progress = "completed";
          }
        } else {
          if (!pastTries) {
            pastTries = [];
          }
          pastTries.push(...logs);
          toUpdate.pastTries = pastTries;
          logs = [new Date()];
          toUpdate.logs = logs;
        }
        toUpdate.latest = new Date();
      }
      const updatedChallenge = await Challenge.findByIdAndUpdate(challengeId, {
        $set: toUpdate,
      });
      if (updatedChallenge) {
        res.status(200);
        res.json({
          message: `Good job, you're one day closer to your target: ${challenge.target}`,
        });
      }
    } else {
      res.status(400);
      res.json({ error: "Couldn't add today's entry" });
    }
  } else {
    res.status(400);
    res.json({ error: "Invalid request. Id is missing" });
  }
};

const updateChallenge = async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    const challenge = await Challenge.findById(id);
    if (challenge && challenge.progress === "inProgress") {
      const updateResult = await Challenge.findByIdAndUpdate(id, {
        $set: req.body,
      });
      if (updateResult) {
        res.status(200);
        res.json({ message: "Updated the challenge" });
      } else {
        res.status(400);
        res.json({ error: "Couldn't update the challenge" });
      }
    } else {
      res.status(400);
      res.json({ error: "Invalid request. Id is incorrect" });
    }
  } else {
    res.status(400);
    res.json({ error: "Invalid request. Id is missing" });
  }
};

const deleteChallenge = async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    const deletedChallenge = await Challenge.findByIdAndDelete(id);
    if (deletedChallenge) {
      res.status(200);
      res.json({ message: "Challenge deleted" });
    } else {
      res.status(400);
      res.json({
        error: "Something went wrong when trying to delete the challenge.",
      });
    }
  } else {
    res.status(400);
    res.json({ error: "Invalid request. Id is missing" });
  }
};
module.exports = {
  getMyChallenges,
  createNewChallenge,
  addTodaysLog,
  updateChallenge,
  deleteChallenge,
};
