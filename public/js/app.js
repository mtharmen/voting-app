'use strict';

var votingApp = angular.module('votingApp', ['ngRoute', 'chart.js']);

// Factory
votingApp.factory('factApp', function($http){
  return {
    getName: function() {
      return $http.get('/api/name')
    },
    
    getUser: function() {
      return $http.get('/api/user')
    },
    
    test: function() {
      return $http.get('/api/test')
    }
  }
});

votingApp.factory('pollData', function($http){
  
  Chart.defaults.global.legend.display = true;
  Chart.defaults.global.legend.position = "right";
  
  var storedUser = { user: undefined };

  return {
    
    listOfPolls: function(user) {
      var url = '/api/list/';
      if (user) {
        url += user;
      }
      
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
    
    login: function() {
      window.location.href = '/auth/twitter/'
    },
    
    logout: function() {
      var user = undefined;
      window.location.href = '/logout'
    },
    
    unlink: function() {
      var user = undefined;
    }
  };
});

votingApp.config(function($routeProvider, $locationProvider) {
  
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
    .when('/poll/:pollid', {
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

votingApp.controller('userCtrl', ['$scope', '$location', 'pollData', function($scope, $location, pollData) {
    
  $scope.profile = true;
    
  if (!$scope.user) {
    $location.url('/');
  }
  
  pollData.listOfPolls($scope.user)
    .success(function(data) {
      $scope.polls = data;
    })
    .error(function(status, statusText) {
      console.error(status + ':' + statusText);
    });
  
  $scope.logout = function() {
    status.user = undefined;
    window.location.href = '/logout';
  }; 
  
}]);
                                    
votingApp.controller('pollCtrl', ['$scope', '$routeParams', '$location', 'pollData', function($scope, $routeParams, $location, pollData) {
  
  var id = $routeParams.pollid;

  pollData.getPoll(id)
    .success(function(data) {
      if (data) {
        $scope.poll = data;
        $scope.total = $scope.poll.data.reduce(function(a,b) { return a+b; } );
      } else {
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
    
    for (var i=0; i < options.length; i++) {
      var choice = options[i].value;
      if (choice) {
        poll.labels.push(choice);
        poll.data.push(0);
      }      
    }
    
    pollData.update(id, {data: poll.data, labels: poll.labels})
      .success(function(data) {
        console.log('Data Sent');
      })
      .error(function(status, statusText) {
        console.error(status + ':' + statusText);
      });
    
    $scope.clear();
  };
  
  $scope.delete = function(id) {
    var res = confirm('Are you sure you want to delete this poll?');
    if (res) {
      pollData.delete(id)
        .success(function(data) {
          console.log('Request Sent');
        })
        .error(function(status, statusText) {
          console.error(status + ':' + statusText);
        });
      
      alert('Poll Deleted');
      $location.url('/');
    }   
  };
  
  $scope.submit = function() {
        
    var i = $scope.poll.labels.indexOf($scope.pick);
    $scope.poll.data[i]++;
    pollData.update(id, {data: $scope.poll.data})
      .success(function(data) {
        console.log('Data Sent');
      })
      .error(function(status, statusText) {
        console.error(status + ':' + statusText);
      });
    $scope.complete = true;
  };
    
}]);

votingApp.controller('newPollCtrl', ['$scope', '$location', 'pollData', function($scope, $location, pollData) {

  if (!$scope.user) {
    $location.url('/');
  }
  
  $scope.newPoll = { title: '' };
  $scope.newPoll._id = Math.floor(Math.random()*100000 + 1);
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
      
      pollData.save(poll)
        .success(function(data) {
          console.log('Data Sent');
        })
        .error(function(status, statusText) {
          console.error(status + ':' + statusText);
        });
      
      $location.url('poll/' + poll._id);
    }
  };

  $scope.reset();
    
}]);