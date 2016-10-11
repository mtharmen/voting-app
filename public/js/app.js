// Module
var votingApp = angular.module('votingApp', ['ngRoute', 'ngResource', 'chart.js']);

// Factory
votingApp.factory('pollData', function(){
  
  Chart.defaults.global.legend.display = true;
  Chart.defaults.global.legend.position = "right";

  var status = { user: '' }
  
  var mockData = [
    {id: '1', owner: 'default' , title: 'First', data: [3,7,2], labels: ['Option One', 'Option Two', 'Option Three']}
                 ]
  return {
    
    getAllPolls: function(user) {
      if (user) {
        var userPolls = []
        for (var i=0; i < mockData.length; i++) {
          if (mockData[i].owner == user) {
            userPolls.push(mockData[i])
          }
        }
        return userPolls;
      }
      return mockData;
    },
    
    getPoll: function(id) {
      for (var i=0; i < mockData.length; i++) {
        if (mockData[i].id == id) {
          return mockData[i];
        }
      }
      return {};
    },
    
    addPoll: function(poll) {
      mockData.push(poll)
    },
    
    generatePoll: function() {
      
      var newest = mockData.length;
      var inputs = Math.floor(Math.random() * (5 - 2)) + 2;
      var data = []
      var labels = []
      for (var i=0; i < inputs; i++) {
        var lbl = 'Option ' + ['One', 'Two', 'Three', 'Four', 'Five'][i]
        labels.push(lbl)
        data.push(Math.floor(Math.random() * (10 - 1)) + 1)
      }
      
      var poll = {};
      poll.owner = ['Me', 'NotMe'][Math.floor(Math.random() * (2))];
      poll.labels = labels;
      poll.data = data;
      poll.id = newest+1;
      poll.title = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth'][newest];
      
      mockData.push(poll)
    },
    
    delete: function(id) {
      for (var i=0; i < mockData.length; i++) {
        if (mockData[i].id == id) {
          mockData.splice(i,1);
          break;
        }
      }
    },
    
    getStatus: function() {
      return status
    },
    
    login: function() {
      status.user = 'Me';
    },
    
    logout: function() {
      status.user = '';
    }
  }
});

// Routes
votingApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/pollGrid.html',
        controller: 'homeCtrl'
    })
    
    .when('/login', {
        templateUrl: 'pages/login.html',
        controller: 'homeCtrl'
    })
    
    .when('/user/:id', {
        templateUrl: 'pages/pollGrid.html',
        controller: 'userCtrl'
    })
    
    .when('/new', {
        templateUrl: 'pages/new.html',
        controller: 'newPollCtrl'
    })
    
    .when('/poll', {
        templateUrl: 'pages/singlePoll.html',
        controller: 'pollCtrl'
    })
    
    .when('/poll/:pollid', {
        templateUrl: 'pages/singlePoll.html',
        controller: 'pollCtrl'
    })
    
    .when('/test', {
        templateUrl: 'pages/test.html',
        controller: 'testCtrl'
    })

    
    $locationProvider.html5Mode(true);
}]);

// Controllers
votingApp.controller('testCtrl', ['$scope', '$http', 'pollData', function($scope, $http, pollData) {
  
  $scope.testChart;
  
  $http.get('/api/poll')
    .then(function successCallback(response) {
    
      console.log('Data Recieved');
      $scope.testChart = response.data;
      
    }, function errorCallback(response) {
    
      console.error(response)
    });
  
  var chartData = JSON.stringify({
    id: '88', 
    owner: 'client', 
    title: 'TestSave', 
    data: [6,2,3], 
    labels: ['One', 'Two', 'Three']
  })
  
  $http.post('/api/save', chartData)
    .then(function sucessCB(response) {
      console.log('Data Sent');
    }, function errorCB(response) {
      console.error(response);
  })
  
}]);

votingApp.controller('navCtrl', ['$scope', 'pollData', function($scope, pollData) {
  
  $scope.status = pollData.getStatus();
  
  $scope.testChart = pollData.getPoll('1');
  
  $scope.logout = function() {
    pollData.logout()
  }
  
  $scope.login = function() {
    pollData.login()
  }
  
}]);


votingApp.controller('homeCtrl', ['$scope', 'pollData', function($scope, pollData) {

  $scope.polls = pollData.getAllPolls()
  $scope.title = 'Pick a poll'
  
  $scope.status = pollData.getStatus();
  
  $scope.generatePoll = function() {
    pollData.generatePoll();
  }
  
  $scope.login = function() {
    pollData.login()
  }
  
  //console.log(Chart.defaults.global)
  
}]);

votingApp.controller('userCtrl', ['$scope', '$routeParams', '$location', 'pollData', function($scope, $routeParams, $location, pollData) {
    
  $scope.status = pollData.getStatus();
  $scope.id = $routeParams.id
  
  if ($scope.id != $scope.status.user) {
    $location.url('/')
  }
  
  $scope.polls = pollData.getAllPolls($scope.status.user)
  
}]);
                                    
votingApp.controller('pollCtrl', ['$scope', '$routeParams', '$window', 'pollData', function($scope, $routeParams, $window, pollData) {
  
  var id = $routeParams.pollid;
  
  $scope.complete = false;
    
  $scope.status = pollData.getStatus()
  $scope.chart = pollData.getPoll(id)
  
  $scope.newOptions = [];
  
  $scope.total = $scope.chart.data.reduce(function(a,b) { return a+b })
  console.log($scope.total==true)
  
  $scope.addOption = function() {
    $scope.edit = true;
    $scope.newOptions.push({ value: '' })
  }
  
  $scope.cancel = function() {
    $scope.newOptions = [];
    $scope.edit = false;
  }
  
  $scope.update = function(chart, options) {
    $scope.edit = false;
    
    for (var i=0; i < options.length; i++) {
        var choice = options[i].value
        if (choice) {
          chart.labels.push(choice);
          chart.data.push(0)
        }      
    }
    $scope.newOptions = [];
  }
  
  $scope.delete = function(id) {
    var res = confirm('Are you sure you want to delete this poll?');
    if (res) {
      pollData.delete(id);
      alert('Poll Deleted')
      $window.history.back();
    }
    
  }
  
  $scope.submit = function() {
        
    var i = $scope.chart.labels.indexOf($scope.pick)
    $scope.chart.data[i]++
    $scope.complete = true;
  }
  
}]);

votingApp.controller('newPollCtrl', ['$scope', '$location', 'pollData', function($scope, $location, pollData) {
  
  $scope.status = pollData.getStatus();

  $scope.user = { title: '' }
  
  $scope.options = [{value: ''}, {value: ''}]

  $scope.update = function(user, options) {
    
    if (!user.title || !options[0].value || !options[1].value) {
      alert('Please fill out the required fields')
    } else {
    
      var labels = []
      var data = []

      for (var i=0; i < options.length; i++) {
        var choice = options[i].value
        if (choice) {
          labels.push(choice);
          data.push(0)
        }      
      }

      user.id = Math.floor(Math.random()*1000 + 1);
      user.owner = $scope.status.user;
      user.data = data;
      user.labels = labels;
      
      pollData.addPoll($scope.user);
      $location.url('poll/' + $scope.user.id)
    }
  };

  $scope.reset = function() {
    $scope.user = {};
    $scope.options = [{value: ''}, {value: ''}];
  };
  
  $scope.add = function() {
    var newChoice = {value: ''};
    $scope.options.push(newChoice);
  }

  $scope.reset();
  
}]);

// Directives
votingApp.directive("pieChart", function() {
    return {
        restrict: 'E',
        templateUrl: './pages/directives/pieChart.html',
        replace: true,
        scope: {
            chart: "=",         
        }
    };
});
