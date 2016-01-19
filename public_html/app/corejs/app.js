(function(){
'use strict';

    var rr = angular.module("rr", [
        'firebase',
        'ngRoute'
    ]);
    
    function ri(page){
        return {
            templateUrl: "app/"+page+"/temp.html"
        };
    }

    rr.config(['$routeProvider','$locationProvider',
      function($routeProvider,$locationProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');
        $routeProvider.
            when('/', ri("dashboard")).
            when('/courses', ri("courses")).
            when('/grades', ri("grades")).
            when('/shoppingcart', ri("shoppingcart")).
            when('/404', ri("404")).
            otherwise({
                redirectTo: '/404'
            });
        }]);
    
    rr.factory("Auth", ["$firebaseAuth",
      function($firebaseAuth) {
        var authRef = new Firebase("https://digitalemerald.firebaseio.com");
        return $firebaseAuth(authRef);
      }
    ]);
    
    
    rr.controller('MainController', ["$scope", "$firebaseObject","$firebaseArray", "Auth","$filter", function($scope, $firebaseObject, $firebaseArray, Auth, $filter){
        
        function isinlist (arr, id){
            var len = arr.length;
            for (var i = 0; i<len; i++){
                if (arr[i].$id == id) return true;
            }
            return false;
        }
        
        
        var main = this;
        main.client = {};
        var clientRef = "";
        var newcourses = [];
        
        main.auth = Auth;
        main.auth.$onAuth(function(authData) {
            if(authData){
                clientRef = new Firebase("https://digitalemerald.firebaseio.com/users/" + authData.auth.uid);
                main.client = $firebaseObject(clientRef);
                main.client.name = authData.google.displayName;
                main.client.$loaded(function(){main.client.$save()});
            }
            main.authData = authData;

        });
        
        main.login = function(){
            main.auth.$authWithOAuthPopup("google").then(function(authData) {
                console.log("Logged in as:", authData.uid);
            }).catch(function(error) {
                console.error("Authentication failed:", error);
            });
        }
        
        main.logout = function(){
            main.auth.$unauth(); 
        }
        
        var allref = new Firebase("https://digitalemerald.firebaseio.com/all");
                
        main.addtoclient = function($id){
            console.log(main.searchResults)
            if (!main.client.shoppingcart){
                main.client.shoppingcart = [];
            }
            var len = main.searchResults.length;
            for (var i = 0; i<len; i++){
                if((main.searchResults[i].$id === $id)){
                    main.client.shoppingcart.push(main.searchResults[i]);
                    main.client.$save();
                }
            }
        }
        
        main.checkout = function (){
            main.client.courses = main.client.courses.concat(main.client.shoppingcart);
            console.log(main.client.courses);
            main.client.$save();
        }
        
        main.searchResults = $firebaseArray(allref);
        
    }]) 
    

})()