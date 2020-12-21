const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');

// import all the express routes we will be using
const usersRouter = require('./routes/users');
const sessionRouter = require('./routes/session');
const followsRouter = require('./routes/follows');
const freetRouter = require('./routes/freets');

require('dotenv').config(); // This allows us to use variables in .env file through process.env
const isProduction = process.env.NODE_ENV === 'production';


// create our app
const app = express();

// set up user session
app.use(session({
  secret: 'fritter-secret',
  resave: true,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, isProduction ? 'dist' : 'public'))); // in Heroku we want dist but for dev we want public so we don't have to rebuild everytime we change something
// allows us to make requests from POSTMAN
app.use(cors());

// set up the app to use dev logger
app.use(logger('dev'));

// accept json
app.use(express.json());

// https://stackoverflow.com/questions/29960764/what-does-extended-mean-in-express-4-0
// allows object nesting in POST
app.use(express.urlencoded({ extended: false }));

// cookies for sessions
app.use(cookieParser());

// server html+css+js frontend
app.use(express.static(path.join(__dirname, 'public')));

// connect url hierarchies to our routers
app.use('/api/users', usersRouter);
app.use('/api/follows', followsRouter);
app.use('/api/users/session', sessionRouter);
app.use('/api', freetRouter);


app.use('*', function (req, res) {
  res.redirect('/').end();
});

console.log("Running on localhost:3000...");

module.exports = app;
