const {
    createToken,
    verifyToken,
} = require("../utils/token");

const {
    createMovie,
    queryAllMovies,
    queryMoviesById
} = require('../models/movie');

const getAllMovies = async (req, res) => {
    const movies = await queryAllMovies();
    const { status, data } = movies;
    console.log({ movies });
    res.status(status).json({ data });
};
const getMoviesById = async (req, res, next) => {
    try {
        const movie = await queryMoviesById(req.params.id);
        const { status, data } = movie;
        return res.status(status).json({ data })

        // todo verify the token
    } catch (e) {
        console.log(e);
        return res.status(401).json({ error: 'Invalid token provided.' })
    }

}

const setMovie = async (req, res, next) => {

    const { title, description, runtimeMins } = req.body;
    console.log('reggg', req.user);

    if (!title || !description || runtimeMins === undefined || null) {
        return res.status(400).json({ error: "Missing fields in request body" });
    }

    try {
        if (req.user.role === 'ADMIN') {
            const movie = await createMovie(req.body, req.user.id);
            const { status, data } = movie;
            return res.status(status).json({ data })
        }

        return res.status(400).json({ error: 'Permission Denied.' })
        // todo verify the token
    } catch (e) {
        console.log(e);
        return res.status(401).json({ error: 'Invalid token provided.' })
    }

};

module.exports = {
    getAllMovies,
    getMoviesById,
    setMovie
};