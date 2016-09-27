// Module
var weatherApp =  angular.module('weatherApp', ['ngRoute', 'ngResource']);

// Services
weatherApp.service('cityService', function() {
    
    this.city = 'Toronto, CA';
    
});

// Routes
weatherApp.config(function ($routeProvider, $locationProvider) {
    
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    })
    
    .when('/forecast', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })

    .when('/forecast/:days', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    });
    
    $locationProvider.html5Mode(true);
});

// Controllers
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {

    $scope.city = cityService.city;
    
    $scope.$watch('city', function () {
        cityService.city = $scope.city;
    });
    
}]);
                                    
weatherApp.controller('forecastController', ['$http', '$scope', '$resource', '$routeParams', 'cityService', function($http, $scope, $resource, $routeParams, cityService) {

    $scope.city = cityService.city;
    
    $scope.days = $routeParams.days || '2';
    
    //$scope.message = 'Testing';
    
    // $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?", {callback : "JSON_CALLBACK"}, {get: {method : "JSONP"}});
    
    // $scope.weatherResult = $scope.weatherAPI.get({ 
    //     q: $scope.city, 
    //     cnt: $scope.days,
    //     APPID: "1754d125271bbb04c4fdb7b9500d4e37"
    // });
    
    //$scope.weatherResult = {"city":{"id":6167865,"name":"Toronto","coord":{"lon":-79.416298,"lat":43.700111},"country":"CA","population":0},"cod":"200","message":0.2675,"cnt":2,"list":[{"dt":1474995600,"temp":{"day":292.87,"min":285.09,"max":292.87,"night":285.09,"eve":289.96,"morn":292.87},"pressure":1003.27,"humidity":66,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"speed":6.61,"deg":221,"clouds":0},{"dt":1475082000,"temp":{"day":293.66,"min":288.18,"max":294.04,"night":289.79,"eve":292.25,"morn":288.18},"pressure":1011.99,"humidity":66,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":4.77,"deg":108,"clouds":56,"rain":0.45}]}
    
    console.log('Before API Call');
    $http.get('/api').then(function(res) {
        $scope.weatherResult = res.data;
        console.log(res.data);
    }); 
    console.log('After API Call');
    
    $scope.convertToCelsius = function (degK) {
        return Math.round((degK - 273.15)*10)/10;
    };
    $scope.dateConvert = function (dt) {
        return new Date(dt  * 1000);
    };
}]);

// Directives
weatherApp.directive("weatherReport", function() {
    return {
        restrict: 'E',
        templateUrl: './pages/directives/weatherReport.html',
        replace: true,
        scope: {
            weatherDay: "=",
            tempConvert: "&",  
            dateConvert: "&",
            dateFormat: "@"            
        }
    };
});
