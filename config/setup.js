require('dotenv').config();
var path         = require('path');
var express      = require('express');
var passport     = require('passport');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose     = require('mongoose');
var session      = require('express-session');
var MongoStore   = require('connect-mongo')(session);

module.exports = function(app, base) {

	// Mongoose setup
	mongoose.Promise = global.Promise;
	var mongodbUrl = process.env.MONGODB_URL || 'mongodb://locahlhost:8080'
	
	mongoose.connect(mongodbUrl + '/mtharmen-voting-app');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
	    console.log('Connected to mtharmen-voting-app');
	});

	// Close MongoDB connection
	process.on('SIGINT', function() {  
	    db.close(function () { 
	        console.log('Closing connection to votingAppDB'); 
	        process.exit(0); 
	    }); 
	});

	// Error Handler
	app.use(function(err, req, res, next) {
	    console.error(err);
	    res.status(err.status || 500).send(err);
	});

	app.use(cookieParser());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	require('./passport')(passport);

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

	// all environments
	app.use(express.static(path.join(base, 'public')));
};
