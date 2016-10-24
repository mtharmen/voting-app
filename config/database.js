var Poll = require('../config/models/poll');

exports.checkDefaults  = function() {
  var query = Poll.find({}, 'code');

  query.exec(function(err, docs) {
    if (err) { 
      console.error(err);
    } else {
      if (!docs.length) {
        console.log('No Polls Found, saving defaults')
        generateDefaults(defaults);
      }
    }
  });
}

var generateDefaults = function(defaults) {
  for (i=0; i < defaults.length; i++){
    var newPoll = new Poll(defaults[i]);
    newPoll.save(function(err, newEntry) {
      if (err) {
        console.error(err);
      } else {
        console.log('Poll saved');
      }
    })
  }
} 


var defaults = [
  { 
    "title"  : "Apples or Oranges?", 
    "code"   : 'UMNA',
    "owner"  : "default", 
    "labels" : [ "Apples", "Oranges" ], 
    "data"   : [ 3, 3 ] 
  },
  { 
    "title"  : "Who would win in a fight?",
    "code"   : 'OQWT',
    "owner"  : "default", 
    "labels" : [ "Goku", "Superman" ], 
    "data"   : [ 4, 2 ] 
  },
  { 
    "title"  : "Rock, Paper, Scissors", 
    "code"   : 'ZzY0',
    "owner"  : "default", 
    "labels" : [ "Rock", "Paper", "Scissors" ], 
    "data"   : [ 1, 1, 1 ] 
  }
]
