var Poll = require('../config/models/poll');

module.exports = function(app, jsonParser) {

  app.get('/api/poll/:id', function(req,res) {
    var id = req.params.id;

    var query = Poll.findOne({_id: id}, function(err, doc) {
      if (err) { 
        console.error(err);
        res.status(400).send(err);
      } else {
        if (doc) {
          res.json(doc);
        } else {
          res.json({message: 'Nothing'})
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
        res.status(400).send(err);
      } else {
        res.json(docs);
      }
    });
  });

  app.post('/api/new', jsonParser, function(req,res) {
    var poll = req.body;
    poll._id = generateID();
    var newPoll = new Poll(poll);

    newPoll.save(function(err, poll) {
      if (err) {
        console.error(err);
        res.status(400).send(err);
      } else {
        res.send(poll._id);
      }
    });
  });

  app.post('/api/update/:id', jsonParser, function(req,res) {
    var id = req.params.id;
    var poll = req.body;
    Poll.findOneAndUpdate({ _id: id }, { $set: poll }, function(err) {
      if (err) {
        console.err(err);
        res.status(400).send(err);
      } else {
        res.send('Poll Updated');
      }
    });

  });

  app.get('/api/remove/:id', function(req,res) {
    var id = req.params.id;

    Poll.remove({ _id: id }, function(err) {
      if (err) {
        console.error(err);
        res.status(400).send(err);
      } else {
        res.send('Poll Deleted');
      }

    });
  });  
};

var generateID = function(num) {
  var length = num || 4;
  var letter = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ0123456789"
  var id = '';

  while(id.length < length) {
    var i = Math.floor(Math.random()*letter.length);
    id += letter[i];
  }
  
  return id;
}