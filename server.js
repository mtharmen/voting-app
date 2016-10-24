require('dotenv').config();
var path         = require('path');
var express      = require('express');
var passport     = require('passport');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose     = require('mongoose');
var session      = require('express-session');
var MongoStore   = require('connect-mongo')(session);

var app = module.exports = express();

// Config
var ip           = process.env.IP || '127.0.0.1' ;
var port         = process.env.PORT || 8080;
mongoose.Promise = global.Promise;

// Mongoose setup
mongoose.connect('mongodb://' + ip + '/votingAppDB');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to votingAppDB');
  // Check if there are polls, save the defaults if not there
  require('./config/database').checkDefaults();
});



require('./config/passport')(passport, ip, port);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.sessionSecret,
  resave: true,
  store : new MongoStore({
    mongooseConnection: mongoose.connection
  }),
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

//require('./config/passport')(passport, ip, port);

// all environments
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Routes
require('./routes/index')(app);
require('./routes/auth')(app, passport);
require('./routes/api')(app, bodyParser.json());

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