const express = require('express');
const {
    getAllMovies,
    setMovie,
    getMoviesById
} = require('../controllers/movie');

const router = express.Router();
router.get('/:id',getMoviesById)
router.get('/', getAllMovies);
router.post('/',setMovie);

module.exports = router;