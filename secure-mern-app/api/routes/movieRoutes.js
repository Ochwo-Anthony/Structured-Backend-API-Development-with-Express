const express = require('express'); 
const router = express.Router(); 

const { 
    getAllMovies,
    getMovieById,
    createMovie 
} = require('../controllers/movieController'); 

const validateGadgetInput =
require('../middleware/validateMovieInput'); 
const validateMovieInput = require('../middleware/validateMovieInput');

// GET all movies
router.get("/", getAllMovies);

// GET movie by ID
router.get("/:id", getMovieById);

// POST new movie
router.post("/", validateMovieInput, createMovie);

module.exports = router; 