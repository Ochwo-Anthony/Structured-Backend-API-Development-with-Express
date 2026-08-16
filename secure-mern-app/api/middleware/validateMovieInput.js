// Allowed movie genres
const allowedGenres = [
  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Crime',
  'Drama',
  'Horror',
  'Romance',
  'Science Fiction',
  'Thriller'
];

// Validate movie input
const validateMovieInput = (req, res, next) => {
  const {
    title,
    director,
    genre,
    year,
    rating
  } = req.body;

  // Check that all required fields are provided
  if (
    !title ||
    !director ||
    !genre ||
    year === undefined ||
    rating === undefined
  ) {
    return res.status(400).json({
      error: 'All fields are required'
    });
  }

  // Check text fields
  if (
    typeof title !== 'string' ||
    typeof director !== 'string' ||
    typeof genre !== 'string'
  ) {
    return res.status(400).json({
      error: 'Title, director, and genre must be text values'
    });
  }

  // Check year and rating types
  if (
    typeof year !== 'number' ||
    typeof rating !== 'number'
  ) {
    return res.status(400).json({
      error: 'Year and rating must be numeric values'
    });
  }

  // Remove unnecessary spaces
  const trimmedTitle = title.trim();
  const trimmedDirector = director.trim();
  const trimmedGenre = genre.trim();

  // Validate title
  if (trimmedTitle.length < 2 || trimmedTitle.length > 100) {
    return res.status(400).json({
      error: 'Title must be between 2 and 100 characters'
    });
  }

  // Validate director
  if (trimmedDirector.length < 2 || trimmedDirector.length > 60) {
    return res.status(400).json({
      error: 'Director must be between 2 and 60 characters'
    });
  }

  // Validate genre
  if (!allowedGenres.includes(trimmedGenre)) {
    return res.status(400).json({
      error: `Genre must be one of: ${allowedGenres.join(', ')}`
    });
  }

  // Validate year
  if (year < 1888 || year > new Date().getFullYear()) {
    return res.status(400).json({
      error: 'Year must be a valid movie release year'
    });
  }

  // Validate rating
  if (rating < 0 || rating > 10) {
    return res.status(400).json({
      error: 'Rating must be between 0 and 10'
    });
  }

  // Store cleaned values back in the request body
  req.body = {
    title: trimmedTitle,
    director: trimmedDirector,
    genre: trimmedGenre,
    year,
    rating
  };

  next();
};

module.exports = validateMovieInput;