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
votingApp.factory('pollFactory', ['$http', '$location', function($http, $location) {
  
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
    }, 

    redirect: function(path) {
      $location.url(path);
    }
  };
}]);

votingApp.factory('accountFactory', ['$http', '$location', '$window', function($http, $location, $window) {

  var storedUser = { user: undefined };

  return {    
    fetchUser: function() {
      return $http.get('/auth/user');
    },

    getUser: storedUser,

    setUser: function(user) {
      storedUser.user = user;
    },

    localSignUp: function(user) {
      return $http.post('/auth/local-signup', user);
    },

    localSignIn: function(user) {
      return $http.post('/auth/local-login', user);
    },

    twitterSignIn: function() {
      $window.location.href = '/auth/twitter';
    },

    twitterUnlink: function(user) {
      return $http.get('/unlink/twitter')
    },
    
    redirect: function(path) {
      $location.url(path);
    },

    logout: function(){
      storedUser.user = undefined;
      $http.get('/auth/logout').then(function(response) {
        return response.data;
      });
      $location.url('/');
    }
  }
}])

votingApp.factory('modalFactory', ['$uibModal', function($uibModal) {
  
  return {
    login: function(scope) {
      
      var modalOptions = {
        animation: true,
        templateUrl: 'partials/login-form',
        controller: 'loginModalCtrl'
      };
      
      if (scope) {
        modalOptions.scope = scope;
      }
      
      return $uibModal.open(modalOptions);
    },

    confirm: function(dialog, choose) {

      var choice = '';
      if (choose) {
        choice += '<button class="btn btn-primary col-xs-6" ng-click="confirm()">Okay</button>';
        choice += '<button class="btn btn-danger col-xs-6" ng-click="cancel()">Cancel</button>';
      } else {
        choice = '<button class="btn btn-primary col-xs-6 col-xs-offset-3" ng-click="confirm()">Okay</button>';
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
  };
}]);

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
   
  $scope.current = accountFactory.getUser;
   
  accountFactory.fetchUser().then(
    function successCB (response) {
      $scope.current.user = response.data;
      $scope.loaded = true;
    },
    function errorCB (response) {
      console.error(response.status + ':' + response.statusText);
      accountFactory.redirect('/error');
    });

  $scope.userLogin = function() {
              
    var modalInstance = modalFactory.login($scope)

    modalInstance.result.then(
      function successCB (user) {

        $scope.current.user = user
        $location.url('/');
      }, 
      function cancelCB () {
      }
    );
  };

  $scope.twitterUnlink = function() {
    var modalInstance = modalFactory.confirm('Unlink your Twitter account?', true)
    
    modalInstance.result.then(
      function successCB (user) {
        accountFactory.twitterUnlink().then(
          function successCB (response) {
            $scope.current.user = undefined;
            $location.url('/');
          },
          function errorCB (response) {
            console.error(response.status + ':' + response.statusText);
            accountFactory.redirect('/error');
          });
        
      }, 
      function cancelCB () {
      }
    );
  }

  $scope.logout = function() {
    var modalInstance = modalFactory.confirm('Logout?', true)
    
    modalInstance.result.then(
      function successCB (res) {
        accountFactory.logout();
      }, 
      function cancelCB () {
      }
    );
     
  }
  
}]);

// LOGIN MODAL
votingApp.controller('loginModalCtrl', ['$scope', '$uibModalInstance', '$http', 'accountFactory', function ($scope, $uibModalInstance, $http, accountFactory) {
  
  $scope.newUser = {};
  $scope.atSymbol = '^[^@]*$';
  $scope.validEmail = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
  $scope.validCharacters = "^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$";

  $scope.signUp = function(user) {
    $scope.errMsg = ''
    accountFactory.localSignUp(user).then(
      function successCB (response) {
        if (response.data.message) {
          $scope.errMsg = response.data.message
        }
        if (response.data.username) {
          $uibModalInstance.close(response.data)          
        }
      },
      function errorCB (response) {
        console.error(response.status + ':' + response.statusText);
        accountFactory.redirect('/error');
    });
  }
  
  $scope.signIn = function(user) {
    $scope.errMsg = ''
    accountFactory.localSignIn(user).then(
      function successCB (response) {
        if (response.data.message) {
          $scope.errMsg = response.data.message
        }
        if (response.data.username) {
          $uibModalInstance.close(response.data)
        }
      },
      function errorCB (response) {
        console.error(response.status + ':' + response.statusText);
        accountFactory.redirect('/error');
    });  
  }
  
  $scope.twitterSignIn = function() {
    accountFactory.twitterSignIn()   
  }
  
  $scope.switch = function(newAccount) {
    $scope.newUser = {};
    $scope.loginForm.$setPristine();
    $scope.errMsg = '';
    $scope.newAccount = !newAccount;
  };
  
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
      pollFactory.redirect('/error');
    });
  
  $scope.onlyMyPolls = function(check) {
    $scope.check = !$scope.check
    $scope.search.owner = $scope.check ? $scope.current.user._id : undefined
  }

}]);

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
        $location.url('/');
      }
    },
    function errorCB (response) {
      console.error(response.status + ':' + response.statusText);
      pollFactory.redirect('/error');
    });

  $scope.pickChoice = function(choice) {
    $scope.pick = !$scope.edit ? 'for ' + choice : ''
  }
  
  $scope.addChoice = function() {
    $scope.edit = true;
    $scope.pick = '';
    $scope.newChoice = null;
  };
  
  $scope.remove = function() {
    $scope.edit = false;
    $scope.newChoice = null;
  }
  
  $scope.update = function(poll, newChoice) {

    if (newChoice) {
      poll.labels.push(newChoice)
      poll.data.push(0)
      $scope.pick = 'for ' + newChoice
      pollFactory.update(id, {data: poll.data, labels: poll.labels}).then(
        function successCB (response) {

        },
        function errorCB (response) {
        console.error(response.status + ':' + response.statusText);
        pollFactory.redirect('/error');
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

          $location.url('/');
        },
        function errorCB (response) {
          console.error(response.status + ':' + response.statusText);
          pollFactory.redirect('/error');
        });
      }, 
      function cancelCB () {
        //console.log('Dialog rejected');
      }
    );
  };
  
  $scope.submit = function(pick) {

    var i = $scope.poll.labels.indexOf(pick.substr(4));

    pollFactory.update(id, { index: i }).then(
      function successCB (response) {
        $scope.poll = response.data
        $scope.poll.data[i]++
        $scope.results = true;
        $scope.complete = true;
      },
      function errorCB (response) {
        console.error(response.status + ':' + response.statusText);
        pollFactory.redirect('/error');
      });    
  };
    
}]);

// NEWPOLL
votingApp.controller('newPollCtrl', ['$scope', '$location', 'pollFactory', 'modalFactory', function($scope, $location, pollFactory, modalFactory) {
  
  $scope.newPoll = { title: '' };
  $scope.newPoll.owner = $scope.current.user._id;
  
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
    var newChoice = {value: null};
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
          $location.url('poll/' + response.data);        
        },
        function errorCB (response) {
          console.error(response.status + ':' + response.statusText);
          pollFactory.redirect('/error');
        }
      )
    }
  };
    
}]);

votingApp.controller('errorCtrl', ['$scope', function($scope){
  $scope.message = "Error"
}])


// DIRECTIVES
votingApp.directive("pwMatch", function() {
  //http://odetocode.com/blogs/scott/archive/2014/10/13/confirm-password-validation-in-angularjs.aspx
  return {
    require: "ngModel",
    scope: {
      password: "=pwMatch"
    },
    link: function(scope, element, attributes, ngModel) {

      ngModel.$validators.pwMatch = function(modelValue) {
        return modelValue == scope.password;
      };

      scope.$watch("password", function() {
        ngModel.$validate();
      });
    }
  };
});

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