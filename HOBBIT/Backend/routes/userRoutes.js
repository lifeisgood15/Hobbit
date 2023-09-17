const express = require("express");
const router = express.Router();
const { addUser, loginUser } = require("../controller/userController");

router.post("/register-user", (req, res, next) => {
  addUser(req, res, next);
});

router.post("/login-user", (req, res, next) => {
  loginUser(req, res, next);
});

module.exports = router;
