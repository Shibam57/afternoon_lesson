require("dotenv").config();
const { connectDB, closeDB } = require("./db/mongoDB.js");
const app = require("./app.js");

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    const server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
    server.on("error", (error) => console.error("Server error:", error));
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exitCode = 1;
    closeDB().catch(() => {});
  });
