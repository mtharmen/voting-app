var routes = require('./routes');
var api = require('./routes/api');
var path = require('path');
var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var chartDB = require('./models/chartDB.js');

var exports = module.exports = {};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// mongoose.connect('mongodb://' + process.env.IP + '/chartDB');
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//     console.log('Connected to chartDB');
    
    
    
// });

app.get('/', routes.index);
app.get('/api/', api.test);


app.get('*', routes.index);

var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log('Listening on', port);
});

// process.on('SIGINT', function() {  
//   mongoose.connection.close(function () { 
//     console.log('Closing connection to mongoose database'); 
//     process.exit(0); 
//   }); 
// }); 


