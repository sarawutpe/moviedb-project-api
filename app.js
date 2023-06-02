const express = require("express");
const connectToDatabase = require("./database");
const app = express();
const cors = require("cors");

// Connect to mongodb
connectToDatabase();

// Enable CORS
app.use(cors());
// Middleware to parse JSON requests
app.use(express.json());
// Config x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// Config static folder
app.use("/uploads", express.static("uploads"));

// Api routes
app.get("/api/test", async (req, res) => {
  // Response string
  res.send("api is ok!");
});

// Api groups
app.use("/api/", require("./services/movieService"));

// Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
