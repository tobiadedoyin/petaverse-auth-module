const mongoose = require("mongoose");
const config = require("../config");

const uri = config.MONGODB_URI;

async function dbConnection() {
  try {
    mongoose.connect(config.MONGODB_URI);

    mongoose.connection.on("connected", () => {
      console.log("database connected successfully");
    });

    mongoose.connection.on("error", (error) => {
      console.log("Error connecting to database", error);
    });
  } catch (error) {
    console.error("Initial database connection error", error);

    process.exit(1);
  }
}

module.exports = dbConnection;
