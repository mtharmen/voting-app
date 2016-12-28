var TwitterStrategy = require('passport-twitter').Strategy;
var LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();

const ip           = process.env.IP           || '127.0.0.1';
const port         = process.env.PORT         || 8080;
const callback_url = process.env.CALLBACK_URL || 'http://' + ip + ':' + port

var User = require('../config/models/user');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // LOCAL
  passport.use('local-login', new LocalStrategy({
      usernameField : 'username',
      passwordField : 'password',
      passReqToCallback : true,
      session : true
  },
  function(req, username, password, done) {

      var query = {};

      if (username.indexOf('@') < 0) {
          query = { username : username };
      } else {
          query = { 'local.email' : username.toLowerCase() };
      }

      process.nextTick(function() {
          User.findOne(query, function(err, user) {
              if (err) {
                  return done(err);
              }
              if (!user) {
                  if (query.username) {
                      return done(null, false, { message: ['Username not registered'] });
                  } else {
                      return done(null, false, { message: ['Email not registered'] });
                  }
              }
              if (!user.validPassword(password)) {
                  return done(null, false, { message: ['Wrong Password'] });
              }

              else {
                  return done(null, user);
              }
          });
      });

  }));

  passport.use('local-signup', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true,
        session: true
    },
    function(req, username, password, done) {

        var email = req.body.email.toLowerCase();
        // username = req.body.username;

        process.nextTick(function() {
            if (!req.user) {
                var emailSearch    = User.findOne({ 'local.email' : email }).exec();
                var usernameSearch = User.findOne({ username : username }).exec();

                Promise.all([emailSearch, usernameSearch])
                .then(function(data) {
                    var emailCheck = data[0];
                    var usernameCheck = data[1];
                    var message = dupeCheck(emailCheck, usernameCheck);
                    if (message.length) { // Checking if username or email is taken
                        return done(null, false, { message: message });
                    } else {
                        var newUser                 = new User();

                        newUser.local.email         = email;
                        newUser.username            = username;
                        newUser.local.password      = newUser.generateHash(password);

                        newUser.save(function(err) {
                            if (err) { return done(err); }
                            return done(null, newUser);
                        });
                    }
                })
                .catch(function(err) {
                    console.error(err);
                    return done(err);
                });
            } else {
                return done(null, req.user);
            }

        });

    }));

  // TWITTER
  passport.use(new TwitterStrategy({

    'consumerKey'     : process.env.consumerKey,
    'consumerSecret'  : process.env.consumerSecret,
    'callbackURL'     : callback + '/auth/twitter/callback',
    passReqToCallback : true

  },
  function(req, token, tokenSecret, profile, done) {

    // asynchronous
    process.nextTick(function() {

      if (!req.user) {

        User.findOne({ 'twitter.id' : profile.id }, function(err, user) {
            if (err) {
              return done(err);
            }
            if (user) {
              if (!user.twitter.token) {

                user.username            = '@' + profile.username;

                user.twitter.token       = token;
                user.twitter.username    = profile.username;
                user.twitter.displayName = profile.displayName;               

                user.save(function(err) {
                  if (err)
                    return done(err);

                  return done(null, user);
                });
              } else {
                return done(null, user);
              }
            } else {
              var newUser                 = new User();

              newUser.username            = '@' + profile.username;

              newUser.twitter.id          = profile.id;
              newUser.twitter.token       = token;
              newUser.twitter.username    = profile.username;
              newUser.twitter.displayName = profile.displayName;

              newUser.save(function(err) {
                if (err)
                  return done(err);

                return done(null, newUser);
              });
            }
        });

      } 

    });

  }));

};

var dupeCheck = function(email, username) {
    var message = [];

    if (email) {
        message.push('Email already taken');
    }
    if (username) {
        message.push('Username already taken');
    }
    return message;
};
