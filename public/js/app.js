'use strict';

var votingApp = angular.module('votingApp', ['ngRoute', 'chart.js']);

// Factory
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
    
    fetchUser: function() {
      return $http.get('/api/user')
    },
    
    getUser: storedUser,
    
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
    
    logout: function() {
      storedUser.user = undefined;
      window.location.href = '/logout';      
    }
    
  };
});

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
        templateUrl: 'partials/singlePoll',
        controller: 'pollCtrl'
    })    
    .otherwise({
      redirectTo: '/'
    });
    
    $locationProvider.html5Mode(true);
});

// Controllers
votingApp.controller('navCtrl', ['$scope', 'pollData', function($scope, pollData) {
  
  var status = pollData.getUser;
  
  pollData.fetchUser()
    .success(function(data) {
      $scope.user = data.user ? data.user.username : undefined;
      status.user = $scope.user;
    })
    .error(function(status, statusText) {
      console.error(status + ':' + statusText);
    });
  
}]);


votingApp.controller('homeCtrl', ['$scope', 'pollData', function($scope, pollData) {
  
  pollData.listOfPolls()
    .success(function(data) {
      $scope.polls = data;
    })
    .error(function(status, statusText) {
      console.error(status + ':' + statusText);
    });
  
}]);

votingApp.controller('loginCtrl', ['$scope', 'pollData', function($scope, pollData) {
  
  $scope.login = function() {
    window.location.href = '/auth/twitter/';    
  };
  
}]);

votingApp.controller('userCtrl', ['$scope', 'pollData', function($scope, pollData) {
    
  $scope.profile = true;
  
  pollData.listOfPolls($scope.user)
    .success(function(data) {
      $scope.polls = data;
    })
    .error(function(status, statusText) {
      console.error(status + ':' + statusText);
    });
  
  $scope.logout = function() {
    pollData.logout(); 
  }
}]);
                                    
votingApp.controller('pollCtrl', ['$scope', '$routeParams', '$location', 'pollData', function($scope, $routeParams, $location, pollData) {
  
  var id = $routeParams.id;

  pollData.getPoll(id)
    .success(function(data) {
      if (data) {
        $scope.poll = data;
        $scope.total = $scope.poll.data.reduce(function(a,b) { return a+b; } );
      } else {
        // TODO: Kinda sloppy, rework this to server side redirect
        $location.url('/');
      }
    })
    .error(function(status, statusText) {
      console.error(status + ':' + statusText);
    });
    
  $scope.newOptions = [];
  
  $scope.addOption = function() {
    $scope.edit = true;
    $scope.newOptions.push({ value: '' });
  };
  
  $scope.remove = function(index) {
    $scope.newOptions.splice(index,1);
  }
  
  $scope.clear = function() {
    $scope.newOptions = [];
    $scope.edit = false;
  };
  
  $scope.update = function(poll, options) {
    // TODO: Add check if poll option already exists
    
    for (var i=0; i < options.length; i++) {
      var choice = options[i].value;
      if (choice) {
        poll.labels.push(choice);
        poll.data.push(0);
      }      
    }
    
    pollData.update(id, {data: poll.data, labels: poll.labels})
      .success(function(data) {
        console.log('Poll Updated');
      })
      .error(function(status, statusText) {
        console.error(status + ':' + statusText);
      });
    
    $scope.clear();
  };
  
  $scope.delete = function() {
    var res = confirm('Are you sure you want to permanently delete this poll?');
    if (res) {
      pollData.delete(id)
        .success(function(data) {
          console.log('Poll Deleted');
          alert('Your poll was deleted');
          $location.url('/');
        })
        .error(function(status, statusText) {
          console.error(status + ':' + statusText);
        });
    }   
  };
  
  $scope.submit = function() {
        
    var i = $scope.poll.labels.indexOf($scope.pick);
    $scope.poll.data[i]++;
    pollData.update(id, {data: $scope.poll.data})
      .success(function(data) {
        console.log('Poll Updated');
        $scope.results = true;
        $scope.complete = true;
      })
      .error(function(status, statusText) {
        console.error(status + ':' + statusText);
      });
    
  };
    
}]);

votingApp.controller('newPollCtrl', ['$scope', '$location', 'pollData', function($scope, $location, pollData) {
  
  $scope.newPoll = { title: '' };
  $scope.newPoll._id = pollData.generateID();
  $scope.newPoll.owner = $scope.user;
  
  $scope.options = [{value: ''}, {value: ''}];

  $scope.reset = function() {
    $scope.user = {};
    $scope.options = [{value: ''}, {value: ''}];
  };
  
  $scope.add = function() {
    var newChoice = {value: ''};
    $scope.options.push(newChoice);
  };
  
  $scope.remove = function(index) {
    $scope.options.splice(index,1);
  }
  
  $scope.update = function(poll, options) {
    // TODO: Add check if poll option already exists
    if (!poll.title || !options[0].value || !options[1].value) {
      alert('Please fill out the required fields');
    } else {
    
      var labels = [];
      var data = [];

      for (var i=0; i < options.length; i++) {
        var choice = options[i].value;
        if (choice) {
          labels.push(choice);
          data.push(0);
        }      
      }

      poll.data = data;
      poll.labels = labels;
      
      // Check incase the _id is already taken
      (function loop () {
        pollData.save(poll)
        .success(function(data) {
          if (data.code == 11000) {
            // dupiclate _id error, making new ID and resaving
            console.log('Duplicate _id, making new _id and resaving')
            poll._id = pollData.generateID()
            loop()
          } else if (data === 'Poll Saved') {
            console.log('Poll Saved');
            $location.url('poll/' + poll._id);    
          }    
        })
        .error(function(status, statusText) {
          console.error(status + ':' + statusText);
        });
      });
      
      
    }
  };

  $scope.reset();
    
}]);