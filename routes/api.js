var Poll = require('../config/models/poll');

module.exports = function(app, jsonParser) {

  app.get('/api/poll/:id', function(req,res) {
    var id = req.params.id;

    var query = Poll.findOne({_id: id}, function(err, doc) {
      if (err) { 
        console.error(err);
        res.send(err);
      } else {
        if (doc) {
          //console.log('Poll ' + id + ' Found');
          res.json(doc);
        } else {
          res.json({})
        }
      }
    });
  });

  app.get('/api/list/:user?', function(req,res) {
    var user = req.params.user;
    var term = user ? { owner: user } : {};
    
    Poll.find(term, '_id title', function(err, docs) {
      if (err) { 
        console.error(err);
        res.send(err);
      } else {
        //console.log(docs.length + ' polls found.')
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
        //console.log('Poll ' + newPoll._id + ' saved');
        res.send('Poll Saved');
      }
    });
  });

  app.post('/api/update/:id', jsonParser, function(req,res) {
    var id = req.params.id;
    var poll = req.body;
    Poll.findOneAndUpdate({ _id: id }, { $set: poll }, function(err) {
      if (err) {
        console.err(err);
        res.send(err);
      } else {
        //console.log('Poll ' + id + ' updated');
        res.send('Poll Updated');
      }
    });

  });

  app.get('/api/remove/:id', function(req,res) {
    var id = req.params.id;

    Poll.remove({ _id: id }, function(err) {
      if (err) {
        console.err(err);
        res.send(err);
      } else {
        //console.log('Poll ' + id + ' deleted');
        res.send('Poll Deleted');
      }

    });
  });
  
  app.get('/api/user', function(req, res) {
    if (req.user) {
      //console.log('User ' + req.user.twitter.username + ' Found');
      res.json({
        user: req.user.twitter
      })
    } 
    else {
      //console.log('No User Found');
      res.json({})
    }

  });
};