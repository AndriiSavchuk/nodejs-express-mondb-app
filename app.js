const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');

// Connection to MongoDB
mongoose.connect('mongodb://localhost/nodexpsdb', {
  useMongoClient: true,
});
let db = mongoose.connection;

// Check DB errors
db.on('error', console.error.bind(console, 'connection error'));

// Check connection
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Init App
const app = express();

// Bring in Models
let Article = require('./models/article');

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* Body Parser Middleware */

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Setup Static Folder
app.use(express.static(path.join(__dirname, 'static')));

// Parse application/json
app.use(bodyParser.json())

// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

// Express Messages Middleware
app.use(require('connect-flash')());
app.use((req, res, next) => {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

/* Application Routes */

// Homepage Route
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

// Route Files
let articles = require('./routes/articles');
app.use('/articles', articles);

//Start Server Function
app.listen(3000, () => {
  console.log('Server started on port 3000...')
});
