const jwt = require('jsonwebtoken');
// Load our .env file
require('dotenv').config();
// Import express and cors
const express = require('express');
require('express-async-errors');

const cors = require('cors');
const {auth} = require('./middleware/auth');
// Set up express
const app = express();
app.disable('x-powered-by');
app.use(cors());
// Tell express to use a JSON parser middleware
app.use(express.json());
// Tell express to use a URL Encoding middleware
app.use(express.urlencoded({ extended: true }));


const userRouter = require('./routers/user');
app.use('/user', userRouter);

const movieRouter = require('./routers/movie');
app.use('/movie',auth, movieRouter);

app.use((error, req, res, next) => {
    if (error instanceof jwt.JsonWebTokenError) {
        return res.status(400).json({ error: 'Invalid Token' });
    }
    res.status(500).json({ error: 'Internal Server Error' });
});


// Set up a default "catch all" route to use when someone visits a route
// that we haven't built
app.get('*', (req, res) => {
    res.json({ ok: true });
});

// Start our API server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`\n Server is running on http://localhost:${port}\n`);
});