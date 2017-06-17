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



app.controller('HouseController', HouseController);

function HouseController(HouseService, $location) {
  console.log('NG YO');
  var vm = this;
  vm.forRent = [];
  vm.forSale = [];

  vm.onReady = function() {
    HouseService.getHouses().then(function(res) {
      console.log(res);

      vm.allListings = res;

      for (var i = 0; i < vm.allListings.length; i++) {
        if (vm.allListings[i].cost === undefined) {
          console.log('rent');
          vm.forRent.push(vm.allListings[i]);
        } else if (vm.allListings[i].rent === undefined) {
          console.log('sale');
          vm.forSale.push(vm.allListings[i]);
        }
      }
    });
  };

  vm.go = function(path) {
    console.log('go click');
    $location.path(path);
  };
}
