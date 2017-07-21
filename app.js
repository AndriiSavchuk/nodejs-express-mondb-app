const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Connection to MongoDB
mongoose.connect('mongodb://localhost/nodexpsdb', {
  useMongoClient: true,
});
let db = mongoose.connection;

//Check DB errors
db.on('error', console.error.bind(console, 'connection error'));

//Check connection
db.once('open', () => {
  console.log('Connected to MongoDB');
});

//Init App
const app = express();

//Bring in Models
let Article = require('./models/article');

//Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* Body Parser Middleware */

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Setup Static Folder
app.use(express.static(path.join(__dirname, 'static')));


// Parse application/json
app.use(bodyParser.json())

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
  res.render('add_article', {
    title: 'Add Articles'
  });
});

// Add Submit POST Route
app.post('/articles/add', (req, res) => {
  let article = new Article();
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  article.save((err) => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect('/');
    }
  });
});

//Start Server Function
app.listen(3000, () => {
  console.log('Server started on port 3000...')
});
