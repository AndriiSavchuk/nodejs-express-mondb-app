const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

//Connection to MongoDB
mongoose.connect('mongodb://localhost/nodexpsdb', {
  useMongoClient: true,
});
let db = mongoose.connection;

//Check connection
db.once('open', () => {
  console.log('Connected to MongoDB');
});

//Check DB errors
db.on('error', (err) => {
  console.log
});

//Init App
const app = express();

//Bring in Models
let Article = require('./models/article');

//Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Index Route
app.get('/', (req, res) => {
  Article.find({}, (err, articles) => {
    if (err) {
      consol.log(err);
    } else {
      res.render('index', {
        title: 'Articles',
        articles: articles
      });
    }
  });
});

//Add Route
app.get('/articles/add', (req, res) => {
  res.render('article', {
    title: 'Articles'
  });
});

//Start Server Function
app.listen(3000, () => {
  console.log('Server started on port 3000...')
});
