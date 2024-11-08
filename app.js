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

// Importing routes
const user = require("./routes/user");
const match = require("./routes/matchRoutes"); // Import the match routes

// Mounting routes
app.use("/api/v1", user);
app.use("/api/v1/match", match); // Add this line to enable match routes

// Error handling middleware (optional, add your custom error handler if available)
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Server Error",
    });
});

// Export the app
module.exports = app;
