const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");
const formidable = require("formidable");
const { saveUploadedFile, removeFile } = require("../utils/util");

router.get("/movies/test1", async (req, res) => {
  try {
    res.send("ok");
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Get movies with search parameter
router.get("/movies", async (req, res) => {
  try {
    const q = req.query.q;
    let result;

    if (q) {
      result = await Movie.find({ title: { $regex: q, $options: "i" } });
    } else {
      result = await Movie.find();
    }

    // Response status 200
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Get a movie by Id
router.get("/movies/:id", async (req, res) => {
  try {
    const result = await Movie.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ success: false, error: "Movie not found" });
    }

    // Response status 200
    res.json({ success: true, data: movie });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Create movie
router.post("/movies", async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        // Handle error
        return res.status(500).json({ success: false, error: err });
      }

      // fields data type text.
      // files data type file.
      const file = files.posterPath;
      const newImageName = await saveUploadedFile(file);

      const newMovie = new Movie({
        ...fields,
        posterPath: newImageName,
      });
      await newMovie.save();

      // Response status 200
      res.json({ success: true, data: newMovie });
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Update a movie by Id
router.put("/movies/:id", async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        // Handle error
        return res.status(500).json({ success: false, error: err });
      }

      const getMovie = await Movie.findById(req.params.id);
      if (!getMovie) {
        return res.status(404).json({ success: false, error: "Movie not found" });
      }

      const currentPosterPath = getMovie.posterPath;

      // fields data type text.
      // files data type file.
      const file = files.posterPath;
      let newImageName = "";

      // Check file is not exists.
      if (file) {
        newImageName = await saveUploadedFile(file);
        await removeFile(currentPosterPath);
      }

      const newMovie = {
        ...fields,
        posterPath: newImageName || currentPosterPath,
      };

      const result = await Movie.findByIdAndUpdate(req.params.id, newMovie, { new: true });

      // Response status 200
      res.json({ success: true, data: result });
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Remove a movie by Id
router.delete("/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie) {
      return res.status(404).json({ success: false, error: "Movie not found" });
    }

    // Response status 200
    res.json({ success: true, data: movie });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
