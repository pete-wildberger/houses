var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/partials/rentorbuy.html',
    controller: 'HouseController as hc'
  }).when('/rent', {
    templateUrl: 'views/partials/rent.html',
    controller: 'HouseController as hc'
  }).when('/buy', {
    templateUrl: 'views/partials/buy.html',
    controller: 'HouseController as hc'
  });
});

app.config(['$qProvider', function($qProvider) {
  $qProvider.errorOnUnhandledRejections(false);
}]);

app.controller('HouseController', HouseController);

function HouseController(HouseService, $location, $window) {
  console.log('NG YO');
  var vm = this;

  vm.postIt = function() {

    console.log('in postIt');
    var listingToAdd = {
      cost: vm.costIn,
      rent: vm.rentIn,
      sqft: vm.sqftIn,
      city: vm.cityIn
    }; //end listingToAdd
    HouseService.postHouses(listingToAdd);
    HouseService.getHouses().then(function(res) {
      console.log('display', res);
        vm.listings = res;
        $window.location.reload();
    });
    console.log(listingToAdd);
    vm.go('/');


  }; //end postIt

  vm.go = function(path) {
    console.log('go click');
    $location.path(path);
  };


  vm.displayHouses = function() {
    HouseService.getHouses().then(function(res) {
      console.log('display', res);
      vm.listings = res;
    });
  };


}
