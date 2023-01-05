const CONSTANTS = require('./consts');
const express = require('express');
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const session = require('express-session')
app.use(session({
  secret: 'keyboard cat',
  cookie: {},
  resave: true,
  saveUninitialized: true
}));

const mongoose = require('mongoose');
mongoose.connect(CONSTANTS.MONGODB_URL);

require('./users/user-controller')(app);
require('./movies/movie-controller')(app);
require('./interactions/interaction-controller')(app);

app.listen(process.env.PORT || 4000);