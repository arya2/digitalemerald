(function(){
'use strict';

    var de = angular.module("de", [
        'firebase',
        'ngRoute'
    ]);
    
    function ri(page){
        return {
            templateUrl: "app/"+page+"/temp.html",
            controller: page+' as '+page
        };
    }

    de.config(['$routeProvider','$locationProvider',
      function($routeProvider,$locationProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');
        $routeProvider.
          when('/', ri("lp")).
          otherwise({
            redirectTo: '/404'
          });
      }]);
    
    de.factory("Auth", ["$firebaseAuth",
      function($firebaseAuth) {
        var authRef = new Firebase("https://digitalemerald.firebaseio.com");
        return $firebaseAuth(authRef);
      }
    ]);
    
    
    de.controller('MainController', ["$scope", "$firebaseObject", "Auth", function($scope, $firebaseObject, Auth){
        
        var main = this;
        main.client = {};
        var clientRef = "";

        main.auth = Auth;
        main.auth.$onAuth(function(authData) {
            clientRef = new Firebase("https://digitalemerald.firebaseio.com/" + authData.auth.uid);
            main.authData = authData;
            main.client = $firebaseObject(clientRef);
            main.client.name = authData.google.displayName;
            main.client.$save();
        });
        
        main.login = function(){
            main.auth.$authWithOAuthPopup("google").then(function(authData) {
                console.log("Logged in as:", authData.uid);
            }).catch(function(error) {
                console.error("Authentication failed:", error);
            });
        }
        
    }])
    
    
    
    de.controller('lp', ["$scope", function($scope){
        $scope.yolo = 'hollla';
    }])
})()