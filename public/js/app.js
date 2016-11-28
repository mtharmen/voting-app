'use strict';

var votingApp = angular.module('votingApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'chart.js']);

votingApp.config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts

    Chart.defaults.global.legend.display = true;
    Chart.defaults.global.legend.position = "top";
    
    ChartJsProvider.setOptions({
      chartColors: ['#5DA5DA', '#FAA43A', '#60BD68', '#F17CB0', '#DECF3F', '#B276B2', '#F15854'],
    });

}]);

// FACTORY ===============================================================
votingApp.factory('pollFactory', ['$http', function($http) {
  
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
      var url = '/api/update/' + id;
      return $http.post(url, newData);
    },
    
    delete: function(id) {
      var url = '/api/remove/' + id;
      return $http.get(url);
    }
  };
}]);

votingApp.factory('accountFactory', ['$http', '$window', function($http, $window) {

  return {    
    fetchUser: function() {
      return $http.get('/auth/user')
    },

    localSignUp: function(user) {
      return $http.post('/auth/local-signup', user)
    },

    localSignIn: function(user) {
      return $http.post('/auth/local-login', user)
    },

    twitterSignIn: function() {
      $window.location.href = '/auth/twitter'
      //return $http.post('/auth/twitter', user)
    },

    twitterUnlink: function(user) {
      return $http.get('/unlink/twitter')
    },
    
    logout: function() {
      $window.location.href = '/logout';      
    }
  }
}])

votingApp.factory('modalFactory', ['$uibModal', function($uibModal) {
  
  return {
    login: function(scope) {
      
      var modalOptions = {
        animation: true,
        templateUrl: 'partials/form-modal',
        controller: 'loginModalCtrl'
      }
      
      if (scope) {
        modalOptions.scope = scope
      }
      
      return $uibModal.open(modalOptions);
    },
    
    confirm: function(dialog, choose) {

      var choice = '';
      if (choose) {
        choice += '<button class="btn btn-primary col-xs-6" ng-click="confirm()">Okay</button>'
        choice += '<button class="btn btn-danger col-xs-6" ng-click="cancel()">Cancel</button>'
      } else {
        choice = '<button class="btn btn-primary col-xs-6 col-xs-offset-3" ng-click="confirm()">Okay</button>'
      }

      var modalOptions = {
        animation: true,
        template: '<div class="row" id="confirm-modal" style="padding-bottom: 30px">' +
                    '<div class="col-xs-10 col-xs-offset-1">' +
                      '<h3 style="text-align: center">' + dialog + '</h3>' +
                      '<br />' +
                    '</div>' +
                    '<div class="col-xs-10 col-xs-offset-1">' +
                      choice +
                    '</div>' +
                  '</div>',
        controller: ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
            $scope.confirm = function () {
              $uibModalInstance.close('yes');
            };

            $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };
        }]
      };
      
      return $uibModal.open(modalOptions);
    }
  }
}])

// ROUTING ===============================================================
votingApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider
    
    .when('/', {
      templateUrl: 'partials/home',
      controller: 'homeCtrl'
    })
    // .when('/profile', {
    //   templateUrl: 'partials/profile',
    //   controller: 'userCtrl'
    // })    
    .when('/new', {
      templateUrl: 'partials/new',
      controller: 'newPollCtrl'
    })    
    .when('/poll/:id', {
      templateUrl: 'partials/singlePoll',
      controller: 'pollCtrl'
    })
    .when('/error', {
      templateUrl: 'partials/error',
      controller: 'errorCtrl'
    })

    .otherwise({
      redirectTo: '/'
    });
    
    $locationProvider.html5Mode(true);
}]);

// CONTROLLERS ===========================================================
// NAV 
votingApp.controller('navCtrl', ['$scope', '$location', 'accountFactory', 'modalFactory', function($scope, $location, accountFactory, modalFactory) {
   
  accountFactory.fetchUser().then(
    function successCB (response) {
      $scope.user = response.data.user;
      $scope.loaded = true;
    },
    function errorCB (response) {
      console.error(response.status + ':' + response.statusText);
      window.location = '/error'
    });

  $scope.newUser = function () {
              
    var modalInstance = modalFactory.login($scope)

    modalInstance.result.then(
      function successCB (user) {
        $scope.user = user
        $location.url('/');
      }, 
      function errorCB () {
      }
    );
  };

  $scope.twitterUnlink = function() {
    var modalInstance = modalFactory.confirm('Unlink your Twitter account?', true)
    
    modalInstance.result.then(
      function successCB (user) {
        accountFactory.twitterUnlink().then(
          function successCB (response) {
            $scope.user = undefined;
            $location.url('/');
          },
          function errorCB (response) {
            console.error(response.status + ':' + response.statusText);
            window.location = '/error'
          });
        
      }, 
      function errorCB () {
      }
    );
  }

  $scope.logout = function() {
    var modalInstance = modalFactory.confirm('Logout?', true)
    
    modalInstance.result.then(
      function successCB (res) {
        accountFactory.logout();
      }, 
      function errorCB () {
      }
    );
     
  }
  
}]);

// LOGIN MODAL
votingApp.controller('loginModalCtrl', ['$scope', '$uibModalInstance', '$http', 'accountFactory', function ($scope, $uibModalInstance, $http, accountFactory) {
  
  $scope.signUp = function(user) {
    $scope.errMsg = ''
    accountFactory.localSignUp(user).then(
      function successCB (response) {
        if (response.data.message) {
          console.log(response.data.message)
          $scope.errMsg = response.data.message
        }
        if (response.data.username) {
          $uibModalInstance.close(response.data)          
        }
      },
      function errorCB (response) {
        console.error(response.status + ':' + response.statusText);
        window.location = '/error'
    });
  }
  
  $scope.signIn = function(user) {
    $scope.errMsg = ''
    accountFactory.localSignIn(user).then(
      function successCB (response) {
        if (response.data.message) {
          console.log(response.data.message)
          $scope.errMsg = response.data.message
        }
        if (response.data.username) {
          $uibModalInstance.close(response.data)
        }
      },
      function errorCB (response) {
        console.error(response.status + ':' + response.statusText);
        window.location = '/error'
    });  
  }
  
  $scope.twitterSignIn = function() {
    accountFactory.twitterSignIn()   
  }
  
  $scope.switch = function(newAccount) {
    $scope.local = {};
    $scope.loginForm.$setPristine();
    $scope.errMsg = '';
    $scope.newAccount = !newAccount
  }
  
  $scope.confirm = function() {
    $uibModalInstance.close('yes');
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
  
}]);

// HOME
votingApp.controller('homeCtrl', ['$scope', 'pollFactory', function($scope, pollFactory) {

  $scope.loading = true; //TODO: wonky loading solution, rework into resolve

  $scope.search = {};

  $scope.check = false;
  
  pollFactory.listOfPolls().then(
    function successCB (response) {
      $scope.polls = response.data
      $scope.loading = false;
    },
    function errorCB (response) {
      console.error(response.status + ':' + response.statusText);
      window.location = '/error'
    });
  
  $scope.onlyMyPolls = function(check) {
    $scope.check = !$scope.check
    $scope.search.owner = $scope.check ? $scope.user._id : undefined
  }

}]);

// // PROFILE
// votingApp.controller('userCtrl', ['$scope', 'pollFactory', function($scope, pollFactory) {
    
//   $scope.profile = true;
//   $scope.loading = true; //TODO: wonky loading solution, rework into resolve
  
//   // TODO: Maybe redo this so it filters the polls instead of getting the user polls
//   pollFactory.listOfPolls($scope.user._id).then(
//     function successCB (response) {
//       $scope.polls = response.data
//       $scope.loading = false;
//     },
//     function errorCB (response) {
//       console.error(response.status + ':' + response.statusText);
//     });
  
// }]);

// POLL                               
votingApp.controller('pollCtrl', ['$scope', '$routeParams', '$location', 'pollFactory', 'modalFactory', function($scope, $routeParams, $location, pollFactory, modalFactory) {
  
  var id = $routeParams.id;
  $scope.loaded = false;

  pollFactory.getPoll(id).then(
    function successCB (response) {
      if (response.data.title) {
        $scope.poll = response.data;
        $scope.total = $scope.poll.data.reduce(function(a,b) { return a+b; } );
        $scope.loaded = true;
      } else {
        // TODO: rework this to server side redirect
        $location.url('/');
      }
    },
    function errorCB (response) {
      console.error(response.status + ':' + response.statusText);
      window.location = '/error'
    });

  $scope.pickChoice = function(choice) {
    $scope.pick = !$scope.edit ? 'for ' + choice : ''
  }
  
  // TODO: Maybe fetch the data upon voting or pressing see results instead on page load

  $scope.addChoice = function() {
    // TODO: Add a maximum number of options
    $scope.edit = true;
    $scope.pick = '';
    $scope.newChoice = null;
  };
  
  $scope.remove = function() {
    $scope.edit = false;
    $scope.newChoice = null;
  }
  
  $scope.update = function(poll, newChoice) {
    // TODO: Add check if poll option already exists

    if (newChoice) {
      poll.labels.push(newChoice)
      poll.data.push(0)
      $scope.pick = 'for ' + newChoice
      pollFactory.update(id, {data: poll.data, labels: poll.labels}).then(
        function successCB (response) {
          console.log('Poll Updated');
        },
        function errorCB (response) {
        console.error(response.status + ':' + response.statusText);
        window.location = '/error'
      });
    }

    $scope.remove();    
  };

  $scope.delete = function() {
    var modalInstance = modalFactory.confirm('Permanently delete this poll?', true)
    
    modalInstance.result.then(
      function successCB (res) {
        pollFactory.delete(id).then(
        function successCB (response) {
          console.log('Poll Deleted');
          $location.url('/');
        },
        function errorCB (response) {
          console.error(response.status + ':' + response.statusText);
          window.location = '/error'
        });
      }, 
      function errorCB () {
        //console.log('Dialog rejected');
      }
    );
  };
  
  $scope.submit = function(pick) {

    var i = $scope.poll.labels.indexOf(pick.substr(4));

    pollFactory.update(id, { index: i }).then(
      function successCB (response) {
        console.log('Poll Updated');
        $scope.poll = response.data
        $scope.poll.data[i]++
        $scope.results = true;
        $scope.complete = true;
      },
      function errorCB (response) {
        console.error(response.status + ':' + response.statusText);
        window.location = '/error'
      });    
  };
    
}]);

// NEWPOLL
votingApp.controller('newPollCtrl', ['$scope', '$location', 'pollFactory', 'modalFactory', function($scope, $location, pollFactory, modalFactory) {
  
  $scope.newPoll = { title: '' };
  $scope.newPoll.owner = $scope.user._id;
  
  $scope.options = [{value: null}, {value: null}];

  $scope.clearEmpty = function() {

    var unique = uniq($scope.options);
    var len = unique.length
    for (var i=0; i < (2 - len); i++) {
      unique.push({ value: null })
    }
    $scope.options = unique;
  };
  
  $scope.add = function() {
    // TODO: Add a maximum number of options
    var newChoice = {value: null};
    $scope.options.push(newChoice);
  };
  
  $scope.remove = function(index) {
    $scope.options.splice(index,1);
  }

  // TODO: Move this to factory
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
    // TODO: dupe validation show up before submit
    var unique = uniq(options).length
    if (!poll.title || unique < 2) {
      modalFactory.confirm('You must have a valid title and at least two unique options')
    } else {
      
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

      pollFactory.save(poll).then(
        function successCB (response) {
          console.log('Poll Saved');
          $location.url('poll/' + response.data);        
        },
        function errorCB (response) {
          console.error(response.status + ':' + response.statusText);
          window.location = '/error'
        }
      )
    }
  };
    
}]);

votingApp.controller('errorCtrl', ['$scope', function($scope){
  $scope.message = "Error"
}])


// DIRECTIVES
votingApp.directive('pwCheck', [function() {

  return {
    require: 'ngModel',
    link: function(scope, elem, attrs, ctrl) {
      var password = attrs.pwCheck
      
      elem.on('keyup', function() {
        scope.$apply(function() {
          var valid = elem.val() === scope.local[password];
          ctrl.$setValidity('pwmatch', v);
        });
      });
    }
  }

}]);

votingApp.directive('dupeCheck', [function() {

  return {
    require: 'ngModel',
    link: function(scope, elem, attrs, ctrl) {     
      elem.on('keyup', function() {
        scope.$apply(function() {
          var valid = scope.poll.labels.indexOf(elem.val()) === -1
          ctrl.$setValidity('dupe', valid);
        });
      });
    }
  }

}]);