// Authenticating
module.exports = function(app, passport) {
// TODO: Get Server side login check working  
//  app.get('/profile', isLoggedIn);
  
  // twitter
    // send to twitter to do the authentication
    app.get('/auth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
      passport.authenticate('twitter', {
        successRedirect : '/profile',
        failureRedirect : '/login'
      }));

// Removing Account information from DB
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

//app.get('/profile', isLoggedIn, function(req, res) {
//  console.log(req.user)
//    res.render('profile.ejs', {
//        user : req.user
//    });
//});