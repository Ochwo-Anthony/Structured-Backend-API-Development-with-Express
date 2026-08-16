// Temporary in-memory movie data
const movies = [
  {
    id: 'm1',
    title: 'Inception',
    director: 'Christopher Nolan',
    genre: 'Science Fiction',
    year: 2010,
    rating: 8.8
  },
  {
    id: 'm2',
    title: 'The Dark Knight',
    director: 'Christopher Nolan',
    genre: 'Action',
    year: 2008,
    rating: 9.0
  }
];

// Get all movies
const getAllMovies = (req, res) => {
  const safeMovies = movies.map(
    ({ id, title, director, genre, year, rating }) => ({
      id,
      title,
      director,
      genre,
      year,
      rating
    })
  );

  res.status(200).json({
    count: safeMovies.length,
    data: safeMovies
  });
};

// Get a movie by ID
const getMovieById = (req, res) => {
  const { id } = req.params;

  // Validate movie ID format
  if (!/^[a-zA-Z0-9-]+$/.test(id)) {
    return res.status(400).json({
      error: 'Invalid movie ID format'
    });
  }

  const movie = movies.find((item) => item.id === id);

  if (!movie) {
    return res.status(404).json({
      error: 'Movie not found'
    });
  }

  res.status(200).json({
    data: movie
  });
};

// Create a new movie
const createMovie = (req, res) => {
  const {
    title,
    director,
    genre,
    year,
    rating
  } = req.body;

  const newMovie = {
    id: `m${movies.length + 1}`,
    title,
    director,
    genre,
    year,
    rating
  };

  movies.push(newMovie);

  res.status(201).json({
    message: 'Movie created',
    data: newMovie
  });
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie
};