const mongoose = require("mongoose");

const connectDatabase = async (url) => {
  try {
    console.log("Trying to connect to the database...");
    await mongoose.connect(url);
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error; // Re-throw the error to catch it in the server initialization.
  }
};

module.exports = connectDatabase;
