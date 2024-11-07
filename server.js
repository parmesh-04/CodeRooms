const app = require("./app");
const connectDatabase = require("./config/database");

// Connect to the database and start the server after connection
const startServer = async () => {
  try {
    await connectDatabase(process.env.LOCAL_URI); // Make sure your environment variable is named correctly
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server due to DB connection issue:", error);
  }
};

startServer();
