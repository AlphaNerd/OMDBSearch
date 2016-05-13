angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope,$omdbservice,$state, $rootScope, $ionicPopup, $ionicSideMenuDelegate, $ionicLoading, $timeout) {
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  ////////// SEARCH CONTROLLER BELOW ////////////
  $scope.mySearch = {}; // create empty object for search params
  $rootScope.userSettings = {}; // store global user settings

  /// Core Search Function
  $scope.doSearch = function(mySearch){
    if(mySearch.id){ // check if search is by imdbID or Title
      $state.go("app.details",mySearch); // if search by ID, send user to details page
    }else{
      $ionicLoading.show({
          template: "Loading data..."
      })
      $omdbservice.searchOMDB(mySearch).then(function(res){ //retrieve data from OMDB
        $ionicLoading.hide();
        if(res.Response == "True"){ /// check for valid return
          $scope.OMDB_RESULTS = res.Search; /// assign response to $scope
          $state.go("app.results",mySearch) /// 
        }else{
          var alertPopup = $ionicPopup.alert({
          title: 'Error!',
            template: 'It doesn\'t look like that search worked. Try again'
          });
          $state.go("app.results")
          $ionicSideMenuDelegate.toggleLeft()
        }
      })
    }
    $ionicSideMenuDelegate.isOpen() ? $ionicSideMenuDelegate.toggleLeft() : null; /// close side menu
  }

  /// clear list view or results and delete from scope
  $scope.clearSearch = function(){
    delete $scope.OMDB_RESULTS;    /// dump search result list
    $scope.clearForm();
  }

  /// clear side menu search form
  $scope.clearForm = function(){
    $scope.mySearch = {};
  }

  $scope.toggleLeft = function() {   /// menu toggle: waiting for timer
    $ionicSideMenuDelegate.toggleLeft();
  }
  $timeout(function() {  /// short delay then open side menu to grab user's attention
    $scope.toggleLeft();
  }, 500);

})


/////// List Results Child Controller
.controller('ResultsCtrl', function($scope) {
/// specific to results page if needed. Everything being handled in parent controller above.
})


.controller('DetailsCtrl', function($scope, $stateParams, $omdbservice, $ionicLoading, $ionicPopup, $state, $ionicSideMenuDelegate) {
  ///// search omdb via $stateParams
  $ionicLoading.show({
      template: "Loading data..."
  })
  $omdbservice.searchOMDB($stateParams).then(function(res){
      $ionicLoading.hide()
      console.log(res);
      if(res.Response == "True"){ /// check for valid return
        $scope.data = res; /// single record detail data
          $scope.imdbStatConfig = {  /// chart configuration
            options: {
                chart: {
                    type: 'column'
                }
            },
            xAxis: {
              title: '',
              labels: {
                enabled: false
              },
            },
            yAxis: {
              title: ''
            },
            series: [{
              name: 'IMDB',
              data: [parseFloat($scope.data.imdbRating)]  /// compare two source ratings
            },
            {
              name: 'Rotten Tomatoes',
              data: [parseFloat($scope.data.tomatoUserRating)]  /// compare two source ratings
            }],
            title: {
                text: ''
            },
            loading: false
        }
      }else{
        var alertPopup = $ionicPopup.alert({
          title: 'Error!',
          template: 'It doesn\'t look like that search worked. Try again'
        });
        $state.go("app.results")
        $ionicSideMenuDelegate.toggleLeft()
      }
      
  });


});
