const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  username:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }
});

const User = export.module = mongoose.model('User', UserSchema);
