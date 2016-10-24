var Poll = require('../config/models/poll');

module.exports = function(app, jsonParser) {

  app.get('/api/poll/:code?', function(req,res) {
    var code = req.params.code;

    if (code) {
      var query = Poll.findOne({code: code}, '-_id title owner labels data', function(err, doc) {
        if (err) { 
          console.error(err);
          res.send(err);
        } else {
          //console.log(doc);
          res.json(doc);
        }
      });
    } else {
      res.json({ error: 'No ID specified' });
    }

  });

  app.get('/api/list/:user?', function(req,res) {
    var user = req.params.user;
    var term = user ? { owner: user } : {};
    
    Poll.find(term, '-_id code title', function(err, docs) {
      if (err) { 
        console.error(err);
        res.send(err);
      } else {
        //console.log(docs)
        res.json(docs);
      }
    });
  });

  app.post('/api/new', jsonParser, function(req,res) {
    var newPoll = new Poll(req.body);
    newPoll.save(function(err, newEntry) {
      if (err) {
        console.error(err);
        res.send(err);
      } else {
        console.log('Poll saved')
      }

    });
    res.send('new poll saved');
  });

  app.post('/api/update/:code', jsonParser, function(req,res) {
    var code = req.params.code;
    var poll = req.body;
    Poll.update({ code: code }, { $set: poll }, function(err) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log('Poll updated');
        res.send('Poll updated');
      }
    });

  });

  app.get('/api/remove/:code', function(req,res) {
    var code = req.params.code;

    Poll.remove({ code: code }, function(err) {
      if (err) {
        console.err(err);
        res.send(err);
      } else {
        console.log('Poll deleted')
        res.send('Poll deleted');
      }

    });
  });
  
  app.get('/api/user', function(req, res) {
    if (req.user) {
      res.json({
        user: req.user.twitter
      })
    } 
    else {
      res.json({})
    }

  });
};