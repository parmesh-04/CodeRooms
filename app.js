const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const app = express();

// Configure environment variables
dotenv.config({ path: "config/config.env" });

// Using middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Importing routes (commented out, uncomment when routes are ready)
const user = require("./routes/user");
app.use("/api/v1", user);


// Using error middleware (you should add this middleware when implemented)

// Export the app
module.exports = app;
