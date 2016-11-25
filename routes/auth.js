// Authenticating
module.exports = function(app, jsonParser, passport) {

  // Checking if user is logged in and redirecting to appropriate page
  app.get('/profile', isLoggedIn);
  app.get('/new', isLoggedIn);

  app.get('/login', function (req, res, next) {
    if (!req.isAuthenticated())
      return next();
    res.redirect('/profile');
  });
  
  app.get('/auth/user', function(req, res) {
    if (req.user) {
      res.json({
        user: req.user
      })
    } 
    else {
      res.json({})
    }
  });

  // LOCAL
  app.post('/auth/local-signup', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
      if (err) { 
        return res.status(400).send(err)
      }
      if (!user) {
        return res.json(info)
      }
      req.login(user, function(err) {
        if (err) {
          return res.status(400).send(err)
        } else {
          return res.json(user)
        }
      })
    })(req, res, next)
  })

  app.post('/auth/local-login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
      if (err) { 
        return res.status(400).send(err)
      }
      if (!user) {
        return res.json(info)
      }
      req.login(user, function(err) {
        if (err) {
          return res.status(400).send(err)
        } else {
          return res.json(user)
        }
      })
    })(req, res, next)
  });

  // app.post('/auth/local-login2', passport.authenticate('local-login', { failWithError: true }), 
  //   function(req, res, next) {
  //     console.log('logged in')
  //   },
  //   function(err, req, res, next) {
  //     console.log(req.body.errMsg)
  //   }
  // )

  // app.post('/auth/local-signup2', passport.authenticate('local-signup', { failWithError: true }), 
  //   function(req, res, next) {
  //     console.log('signed up')

  //   },
  //   function(err, req, res, next) {
  //     console.log(req.body.errMsg)
  //   }
  // )
  
  // TWITTER
  app.get('/auth/twitter', passport.authenticate('twitter'));

  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
      successRedirect : '/profile',
      failureRedirect : '/'
    }));

// Removing Account information from DB | currently unused since there is only twitter login
  // twitter
  app.get('/unlink/twitter', isLoggedIn, function(req, res) {
    var user           = req.user;
    user.twitter.token = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/');
}