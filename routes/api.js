var Poll = require('../config/models/poll');

module.exports = function(app, jsonParser) {

  app.get('/api/poll/:id?', function(req,res) {
    var id = req.params.id;

    if (id) {
      var query = Poll.findOne({_id: id}, '-__v');
      
      query.exec(function(err, doc) {
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
    var term = {};
    if (user) {
      term.owner = user;
    }
    var query = Poll.find(term, '_id title');

    query.exec(function(err, docs) {
      if (err) { 
        console.error(err);
        res.send(err);
      } else {
        res.json(docs);
      }
    });
  });

  app.post('/api/new', jsonParser, function(req,res) {
    //console.log(req.body);
    var newPoll = new Poll(req.body);
    newPoll.save(function(err, newEntry) {
      if (err) {
        console.error(err);
        res.send(err);
      } else {
        //console.log('Poll saved')
      }

    });
    res.send('new poll saved');
  });

  app.post('/api/update/:id', jsonParser, function(req,res) {
    var id = req.params.id;
    var poll = req.body;
    Poll.update({ _id: id }, { $set: poll }, function(err) {
      if (err) {
        //console.log(err);
        res.send(err);
      } else {
        //console.log('Poll updated');
        res.send('Poll updated');
      }
    });

  });

  app.get('/api/remove/:id', function(req,res) {
    //console.log('Deleting Poll ID #', req.params.id)

    Poll.findByIdAndRemove(req.params.id, function(err) {
      if (err) {
        console.err(err);
        res.send(err);
      } else {
        //console.log('Poll deleted')
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