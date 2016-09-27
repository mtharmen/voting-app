var mongoose = require('mongoose');

var chartSchema = mongoose.Schema({
    original: String,
    code: String
});
var chartDB = mongoose.model('urlDB', chartSchema);

module.exports = chartDB;