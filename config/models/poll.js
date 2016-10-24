var mongoose = require('mongoose');

var pollSchema = new mongoose.Schema({
  code   : String, 
  owner  : String, 
  title  : String, 
  data   : [Number], 
  labels : [String]
});

module.exports = mongoose.model('Poll', pollSchema);