var mongoose = require('mongoose');

var pollSchema = new mongoose.Schema({ 
  title  : String,
  _id    : String, 
  owner  : String,
  labels : [String],
  data   : [Number]  
});

module.exports = mongoose.model('Poll', pollSchema);