'use strict';

var votingApp = angular.module('votingApp', ['ngRoute', 'chart.js']);

// FACTORY ===============================================================
votingApp.factory('pollData', function($http){
  
  Chart.defaults.global.legend.display = true;
  Chart.defaults.global.legend.position = "right";
  
  var storedUser = { user: undefined };

  return {
    
    listOfPolls: function(user) {
      var url = user ? '/api/list/' + user : '/api/list';
      return $http.get(url);        
    },
    
    getPoll: function(id) {
      var url = '/api/poll/' + id;
      return $http.get(url);
    },
    
    generateID: function(num) {
      var length = num || 4;
      var letter = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ0123456789"
      var id = '';

      while(id.length < length) {
        var i = Math.floor(Math.random()*letter.length);
        id += letter[i];
      }
      
      return id;
    },
    
    save: function(poll) {
      return $http.post('/api/new', poll);
    },
    
    update: function(id, newData) {
      // TODO: Figure out why there is no error if there is no poll associated to the id
      var url = '/api/update/' + id;
      return $http.post(url, newData);
    },
    
    delete: function(id) {
      var url = '/api/remove/' + id;
      return $http.get(url);
    },
    
    dupeCheck: function(options) {
      // Using http://jsfiddle.net/luislee818/nzd87f1s/
      var sorted, i, isDuplicate
      var dupe = 0;
      sorted = options.concat().sort(function (a, b) {
        if (a.value > b.value) return 1;
        if (a.value < b.value) return -1;
        return 0;
      });
      for(i = 0; i < options.length; i++) {
        var left = (sorted[i-1] && sorted[i-1].value == sorted[i].value)
        var right = (sorted[i+1] && sorted[i+1].value == sorted[i].value)
        isDuplicate = ( left || right );
        sorted[i].dupe = isDuplicate
        dupe = isDuplicate ? dupe + 1 : dupe;
      }
      console.log(dupe)
      return dupe
    },
        
    getUser: storedUser,
    
    fetchUser: function() {
      return $http.get('/auth/user')
    },
    
    logout: function() {
      storedUser.user = undefined;
      window.location.href = '/logout';      
    }
  };
});

// ROUTING ===============================================================
votingApp.config(function($routeProvider, $locationProvider) {
  // TODO: Figure out how to hide page until the $http requests are done
  $routeProvider
    
    .when('/', {
      templateUrl: 'partials/pollGrid',
      controller: 'homeCtrl'
    })
    .when('/login', {
      templateUrl: 'partials/login',
      controller: 'loginCtrl'
    })
    .when('/profile', {
      templateUrl: 'partials/pollGrid',
      controller: 'userCtrl'
    })    
    .when('/new', {
      templateUrl: 'partials/new',
      controller: 'newPollCtrl'
    })    
    .when('/poll/:id', {
      templateUrl: 'partials/singlePoll2',
      controller: 'pollCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
    
    $locationProvider.html5Mode(true);
});

// CONTROLLERS ===========================================================
// NAV 
votingApp.controller('navCtrl', ['$scope', 'pollData', function($scope, pollData) {
  
  var status = pollData.getUser;
  
  pollData.fetchUser().then(
    function successCB (response) {
      $scope.user = response.data.user ? response.data.user.username : undefined;
      status.user = $scope.user;
      $scope.loaded = true;
    },
    function errorCB (response) {
      console.error(response.status + ':' + response.statusText);
    });
  
}]);

// HOME
votingApp.controller('homeCtrl', ['$scope', 'pollData', function($scope, pollData) {
  
  pollData.listOfPolls().then(
    function successCB (response) {
      $scope.polls = response.data
    },
    function errorCB (response) {
      console.error(response.status + ':' + response.statusText);
    });
  
}]);

// LOGIN
votingApp.controller('loginCtrl', ['$scope', '$http', 'pollData', function($scope, $http, pollData) {
  
  $scope.login = function() {
    window.location.href = '/auth/twitter/';    
  };
  
}]);

votingApp.controller('userCtrl', ['$scope', 'pollData', function($scope, pollData) {
    
  $scope.profile = true;
  
  pollData.listOfPolls($scope.user).then(
    function successCB (response) {
      $scope.polls = response.data
    },
    function errorCB (response) {
      console.error(response.status + ':' + response.statusText);
    });
  
  $scope.logout = function() {
    pollData.logout(); 
  }
}]);

// POLL                               
votingApp.controller('pollCtrl', ['$scope', '$routeParams', '$location', 'pollData', function($scope, $routeParams, $location, pollData) {
  
  var id = $routeParams.id;

  pollData.getPoll(id).then(
    function successCB (response) {
      if (response.data) {
        $scope.poll = response.data;
        $scope.total = $scope.poll.data.reduce(function(a,b) { return a+b; } );
      } else {
        // TODO: Kinda sloppy, rework this to server side redirect
        $location.url('/');
      }
    },
    function errorCB (response) {
      console.error(response.status + ':' + response.statusText);
    });

  $scope.pick;

  $scope.pickChoice = function(choice) {
    $scope.pick = 'for ' + choice
  }
  
  // TODO: Maybe fetch the data upon voting or pressing see results instead on page load

  $scope.addChoice = function() {
    // TODO: Add a maximum number of options
    $scope.edit = true;
    $scope.pick = '';
    $scope.newChoice = '';
  };
  
  $scope.remove = function() {
    $scope.edit = false;
    $scope.newChoice = undefined;
  }
  
  $scope.update = function(poll, newChoice) {
    // TODO: Add check if poll option already exists

    if (newChoice) {
      poll.labels.push(newChoice)
      poll.data.push(0)
      $scope.pick = 'for ' + newChoice
      pollData.update(id, {data: poll.data, labels: poll.labels}).then(
        function successCB (response) {
          console.log('Poll Updated');
        },
        function errorCB (response) {
        console.error(response.status + ':' + response.statusText);
      });
    }

    $scope.remove();    
  };

  // $scope.dupeCheck = function(choice) {
  //   $scope.dupe = $scope.poll.labels.indexOf(choice) < 0
  // }
  
  $scope.delete = function() {
    var res = confirm('Are you sure you want to permanently delete this poll?');
    if (res) {
      pollData.delete(id).then(
        function successCB (response) {
          console.log('Poll Deleted');
          $location.url('/');
        },
        function errorCB (response) {
          console.error(response.status + ':' + response.statusText);
        });
    }   
  };
  
  $scope.submit = function(pick) {

    var i = $scope.poll.labels.indexOf(pick.substr(4));
    $scope.poll.data[i]++;
    pollData.update(id, {data: $scope.poll.data}).then(
      function successCB (response) {
        console.log('Poll Updated');
        $scope.results = true;
        $scope.complete = true;
      },
      function errorCB (response) {
        console.error(response.status + ':' + response.statusText);
      });    
  };
    
}]);

// NEWPOLL
votingApp.controller('newPollCtrl', ['$scope', '$location', 'pollData', function($scope, $location, pollData) {
  
  $scope.newPoll = { title: '' };
  $scope.newPoll._id = pollData.generateID();
  $scope.newPoll.owner = $scope.user;
  
  $scope.options = [{value: ''}, {value: ''}];

  $scope.clearEmpty = function() {

    var unique = uniq($scope.options);
    var len = unique.length
    for (var i=0; i < (2 - len); i++) {
      unique.push({ value: '' })
    }
    $scope.options = unique;
  };
  
  $scope.add = function() {
    // TODO: Add a maximum number of options
    var newChoice = {value: ''};
    $scope.options.push(newChoice);
  };
  
  $scope.remove = function(index) {
    $scope.options.splice(index,1);
  }

  function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
      if (!item.value) {
        return false
      }
      return seen.hasOwnProperty(item.value) ? false : (seen[item.value] = true)
    });
  }

  $scope.update = function(poll, options) {
    // TODO: Make title and dupe validation show up before submit
    var unique = uniq(options).length
    if (!poll.title || unique < 2) {
      alert('You must have a valid title and at least two unique options');
    } else {
      
      // TODO: Move this to factory later
      var labels = [];
      var data = [];

      for (var i=0; i < options.length; i++) {
        var choice = options[i].value;
        // Filter out empty and duplicate options
        if (choice && labels.indexOf(choice) < 0) {
          labels.push(choice);
          data.push(0);
        }      
      }

      poll.data = data;
      poll.labels = labels;
      
      // Recursive check incase the _id is already taken
      (function loop () {
        pollData.save(poll).then(
          function successCB (response) {
            if (response.data.code == 11000) {
              // dupiclate _id error, making new ID and resaving
              console.log('Duplicate _id, making new _id and resaving')
              poll._id = pollData.generateID()
              loop()
            } else if (response.data === 'Poll Saved') {
              console.log('Poll Saved');
              $location.url('poll/' + poll._id);    
            }    
          },
          function errorCB (response) {
            console.error(response.status + ':' + response.statusText);
          });
      })();
    }
  };
    
}]);