const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Bring in User Model
let User = require('../models/user');

// Registration Form
router.get('/registration', (req, res) => {
  res.render('registration')
});

// Registration Functionality
router.post('/registration', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.email;
  const password = req.body.password;
  const password_cnf = req.body.password_cnf;

  req.checkBody('Name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Name is required').notEmpty();
  req.checkBody('password_cnf', 'Password do not match').equals(req.body.password);

  let errors = req.validationErrors();

  if (errors) {
    res.render('registration', {errors})
  } else {
    let newUser = new User({name, email, username, password}); // use ES6 destructuring syntax
  }

  // Encrypting User Password. Redirect to Login page
  bcrypt.getSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (error) {
        console.log(err);
      }
      newUser.password = hash;

      newUser.save(err => {
        if (error) {
          console.log(err);
          return;
        } else {
          req.flash('success', 'You are now registered. Please, log in');
          req.redirect('/user/login');
        }
      });
    });
  });
});

module.exports = router;
