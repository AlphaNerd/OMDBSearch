angular.module('starter.services', [])



//////////////////////////////////////
///////// PORTAL SERVICE   ///////////
//////////////////////////////////////
.factory('$omdbservice', ['$http','$q','$rootScope', function($http,$q,$rootScope) {
    return {
        searchOMDB: function(params) {
            var deferred = $q.defer(); //create promise to handle async data
            console.log("PARAMS: ",params)

            var searchtype = params.id ? "i" : "s"; /// What type of search is this, ID or TITLE?
            var search = params.id ? params.id : params.title; /// Which param to use ID or STRING?

            $http.get("http://www.omdbapi.com/?"+searchtype+"="+search+"&y="+params.year+"&plot="+$rootScope.userSettings.plot+"&tomatoes=true&r="+$rootScope.userSettings.feedType)
            .success(function(data) {
                console.log(data)
                deferred.resolve(data); // resolve promise with data
            })
            .error(function(msg, code) {
                deferred.reject(msg); // reject promise with message
            });

            return deferred.promise; // return promise to requesting controller to wait for asyn response from this service
        }
    }
}])