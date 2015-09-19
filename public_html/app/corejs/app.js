(function(){
'use strict';

    var de = angular.module("de", [
        'ngRoute'
    ]);

    de.config(['$routeProvider','$locationProvider',
      function($routeProvider,$locationProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');
        $routeProvider.
          when('/', {
            templateUrl: 'app/landingpage/landingpage.html',
            controller: 'LandingPageController as lpCtrl'
          }).
          otherwise({
            redirectTo: '/404'
          });
      }]);
})()