var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  twitter          : {
    id           : String,
    token        : String,
    displayName  : String,
    username     : String
  } 
});

module.exports = mongoose.model('User', userSchema);