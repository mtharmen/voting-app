module.exports = function(app, passport) {
  
  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/partials/:name', function(req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
  })

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};