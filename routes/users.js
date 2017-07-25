const express = require('express');
const router = express.Router();

// Bring in User Model
let User = require('../models/user');

// Registration Form
router.get('/registration', (req, res) => {
  res.render('registration')
});

module.exports = router;
