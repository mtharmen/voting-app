var TwitterStrategy = require('passport-twitter').Strategy;
var LocalStrategy = require('passport-local').Strategy;
require('dotenv').config()

var User = require('../config/models/user');

module.exports = function(passport, ip, port) {

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
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true,
      session : true
  },
  function(req, email, password, done) {

      var email = email ? email.toLowerCase() : undefined

      // asynchronous
      process.nextTick(function() {
          User.findOne({ 'local.email' : email }, function(err, user) {
              if (err) {
                  return done(err);
              }
              if (!user) {
                  return done(null, false, { message: 'No matching email found' });
              }
              if (!user.validPassword(password)) {
                  return done(null, false, { message: 'Wrong Password' });
              }

              else {
                  return done(null, user);
              }
          });
      });

  }));

  passport.use('local-signup', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true,
      session: true
  },
  function(req, email, password, done) {
      var email = email ? email.toLowerCase() : undefined;

      // asynchronous
      process.nextTick(function() {
          if (!req.user) {
            // TODO: Add check for unique username as well, maybe promise group and resolve/reject?
              User.findOne({ 'local.email' :  email }, function(err, user) {
                  if (err)
                      return done(err);

                  if (user) {
                      return done(null, false, { message: 'Email already in use.'});
                  } else {
                      var newUser            = new User();

                      newUser.username       = req.body.username;

                      newUser.local.email    = email;
                      newUser.local.password = newUser.generateHash(password);

                      newUser.save(function(err) {
                          if (err)
                              return done(err);
                          return done(null, newUser);
                      });
                  }

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
    'callbackURL'     : 'http://' + ip + ':' + port + '/auth/twitter/callback',
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

  

}