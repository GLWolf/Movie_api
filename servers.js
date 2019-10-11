require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const MOVIES = require('./movies-data-small.json');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

 app.use((req, res) => {
 res.send('Hello, world!')
 })
function handleGetMovies(req, res) {
    res.send('Hello, Movies!');
}
app.get('/movies', function handleGetMovies(req, res) {
    let response = MOVIES;

   
    if (req.query.genre) {
        response = MOVIES.filter(movie => movie.genre.toLowerCase().includes(req.query.genre.toLowerCase()));
    }

    if (req.query.country) {
        response = MOVIES.filter(movie => movie.country.toLowerCase().includes(req.query.country.toLowerCase()));
    }

    if (req.query.avg_vote) {
        response = MOVIES.filter(movie => movie.avg_vote >= req.query.avg_vote);
    }

    res.json(response);
});


const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});