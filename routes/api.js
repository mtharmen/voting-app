var Poll = require('../config/models/poll');

module.exports = function(app) {

  app.get('/api/poll/:id', function(req, res, next) {
    var id = req.params.id;

    Poll.findOne({_id: id}, function(err, doc) {
      if (err) { return next(err); }
      if (doc) {
        res.json(doc);
      } else {
        res.json({message: 'Nothing'});
      }
    });
  });

  app.get('/api/list/:user?', function(req, res, next) {
    var user = req.params.user;
    var term = user ? { owner: user } : {};
    
    Poll.find(term, '_id title owner', function(err, docs) {
      if (err) { return next(err); }

      res.json(docs);

    });
  });

  app.post('/api/new', function(req, res, next) {
    var poll = req.body;
    poll._id = generateID();
    var newPoll = new Poll(poll);

    newPoll.save(function(err, poll) {
      if (err) { return next(err); }

      res.send(poll._id);

    });
  });

  app.post('/api/update/:id', function(req, res, next) {
    var id = req.params.id;
    var poll = {};
    var update = {};

    if (req.body.index > -1) {
      poll['data.' + req.body.index] = 1;
      update.$inc = poll;
    } else if (req.body.data) {
      poll.data = req.body.data;
      poll.labels = req.body.labels;
      update.$set = poll;
    }

    Poll.findOneAndUpdate({ _id: id }, update, function(err, doc) {
      if (err || !doc) { return next(err); }

      res.json(doc);
    });

  });

  app.get('/api/remove/:id', function(req, res, next) {
    var id = req.params.id;

    Poll.remove({ _id: id }, function(err) {
      if (err) { return next(err); }

      res.send('Poll Deleted');
    });
  });  
};

var generateID = function(num) {
  var length = num || 4;
  var letter = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ0123456789";
  var id = '';

  while(id.length < length) {
    var i = Math.floor(Math.random()*letter.length);
    id += letter[i];
  }
  
  return id;
};