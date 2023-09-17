const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectToDB = require("./db/db");
connectToDB();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOpts = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Access-Control-Allow-Headers",
  ],
  exposedHeaders: ["Content-Type"],
};
app.use(cors(corsOpts));
app.use("/challenge", require("./routes/challengeRoutes.js"));
app.use("/user", require("./routes/userRoutes.js"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
