const bcryptJs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const addUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  // validate name
  if (name && email && password) {
    User.findOne({ email })
      .then((data) => {
        if (data) {
          res.status(400);
          res.json({ error: "We already have an account with that email" });
        } else {
          bcryptJs.genSalt(10, (err, salt) => {
            bcryptJs.hash(password, salt, function (err, hashedPassword) {
              if (hashedPassword) {
                const user = new User({
                  name,
                  email,
                  password: hashedPassword,
                });

                User.create(user)
                  .then((user) => {
                    if (user) {
                      res.status(201);

                      res.json({
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        jwt: generateWebToken(user._id),
                      });
                    }
                  })
                  .catch((error) => {
                    if (error) {
                      res.status(400);
                      res.json({ error: "Something went wrong" + error });
                    }
                  });
              }
            });
          });
        }
      })
      .catch((error) => {
        if (error) {
          res.status(400);
          res.json({ error: "Something went wrong" });
        }
      });
  } else {
    res.status(400);
    res.json({ error: "Please fill all fields" });
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    User.findOne({ email })
      .then((user) => {
        if (user) {
          bcryptJs.compare(password, user.password, function (err, result) {
            console.log("Result comparison", result);
            if (err) {
              console.log("in error if");
              res.status(400);
              res.json({
                error:
                  "Something went wrong when we were trying to compare passwords",
              });
            } else if (result) {
              res.status(200);
              res.json({
                id: user._id,
                name: user.name,
                email: user.email,
                jwt: generateWebToken(user._id),
              });
            } else {
              res.status(400);
              res.json({
                error: "Passwords dont match bro",
              });
            }
          });
        }
      })
      .catch((err) => {
        if (err) {
          res.status(400);
          res.json({
            error: "Invalid credentials",
          });
        }
      });
  } else {
    res.status(400);
    res.json({ error: "Please fill all fields" });
  }
};

const generateWebToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30h" });
};

module.exports = { addUser, loginUser };
