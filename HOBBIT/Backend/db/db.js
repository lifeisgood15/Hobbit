const mongoose = require("mongoose");
require("dotenv").config();
const connectToDB = async () => {
  try {
    const uri =
      "mongodb://USERNAME:PWD@MORE...";
    const connection = await mongoose.connect(uri);
    console.log("Mongo DB connected", connection.connection.host);
  } catch (err) {
    console.error(`Error in mongo db connection: ${err.message}`);
  }
};

module.exports = connectToDB;
