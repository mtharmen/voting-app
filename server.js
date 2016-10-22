var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var cookieParser = require('cookie-parser');
var session      = require('express-session');

var path = require('path');

var app = module.exports = express();


// Config
var ip = process.env.IP || '127.0.0.1' ;
var port = process.env.PORT || 8080;

// Mongoose setup
mongoose.connect('mongodb://' + ip + '/votingAppDB');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to votingAppDB');
});

require('./config/passport')(passport, ip, port);

app.use(cookieParser());
app.use(jsonParser);
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'dontellanyone', // session secret
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// all environments
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));



// Routes
require('./routes/index')(app);
require('./routes/auth')(app, passport);
require('./routes/api')(app, jsonParser);

// Catch all for AngularJS html5mode
app.get('*', function(req, res) {
  res.render('index')
});


// Server Start
app.listen(port, function() {
    console.log('Listening on port', port);
});

// Close MongoDB connection
process.on('SIGINT', function() {  
  db.close(function () { 
    console.log('Closing connection to votingAppDB'); 
    process.exit(0); 
  }); 
});
