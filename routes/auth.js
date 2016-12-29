var passport = require('passport');

var User = require('../config/models/user');

// Authenticating
module.exports = function(app) {


  // SERVER SIDE REDIRECTS
  app.get('/new', isLoggedIn);
  
  // app.get('/profile', isLoggedIn);
  // app.get('/login', function (req, res, next) {
  //   if (!req.isAuthenticated())
  //     return next();
  //   res.redirect('/profile');
  // });

  app.get('/auth/user', function(req, res) {
    res.json(req.user);
  });

  // LOCAL SIGNUP
  app.post('/auth/local-signup', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) {
        return res.json(info);
      }
      req.login(user, function(err) {
        if (err) { return next(err); }

        return res.json(user);
      });
    })(req, res, next);
  });

  // LOCAL LOGIN
  app.post('/auth/local-login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
      if (err) { return next(err); }

      if (!user) {
        return res.json(info);
      }
      req.login(user, function(err) {
        if (err) { return next(err); }

        return res.json(user);
      });
    })(req, res, next);
  });
  
  // TWITTER LOGIN
  app.get('/auth/twitter', passport.authenticate('twitter'));

  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
      successRedirect : '/',
      failureRedirect : '/'
    }));


  // UNLINK TWITTER
  app.get('/unlink/twitter', isLoggedIn, function(req, res, next) {
    var user           = req.user;
    user.twitter.token = undefined;
    req.logout();
   
    user.save(function(err) {
      if (err) { return next(err); }
      
      res.send('Account Unlinked');
    });
  });

  // LOGOUT
  app.get('/auth/logout', function(req, res) {
      req.logout();
      res.send('logged out');
  });

};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/');
}
