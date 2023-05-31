const express = require("express");
const connectToDatabase = require("./database");
const Movie = require("./models/movie");
const app = express();

// Connect to mongodb
connectToDatabase();

// Enable CORS
// app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());
// Config static folder
app.use(express.static(__dirname + "/uploads"));

// Api routes
app.get("/api/test", async (req, res) => {
  // Response string
  res.send("api is ok!");
});

app.use("/api/", require("./services/movieService"));

// app.post("/api/movies", async (req, res) => {
//   try {
//     // Create a new movie instance
//     const newMovie = new Movie({
//       title: "Example Movie",
//       language: "English",
//       overview: "This is an example movie.",
//       posterPath: "example-poster.jpg",
//       releaseDate: "2023-01-01",
//       popularity: 8.5,
//       isReleased: true,
//     });

//     await newMovie.save();

//     // Save the movie to the database
//     res.send("ok");
//   } catch (error) {
//     res.send(error);
//   }
// });

// Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
