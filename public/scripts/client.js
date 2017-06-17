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
    getHouses();
  };
  vm.postIt = function() {
    console.log('in postIt');
    var listingToAdd = {
      cost: vm.costIn,
      rent: vm.rentIn,
      sqft: vm.sqftIn,
      city: vm.cityIn
    }; //end listingToAdd
    console.log(listingToAdd);
    HouseService.postHouses(listingToAdd);
    HouseService.getHouses().then(function(res) {
      console.log(res);
      vm.go('/');
      getSorted(res);
    });
  }; //end postIt

  vm.go = function(path) {
    console.log('go click');
    $location.path(path);
  };

  function getSorted(Arr) {
    for (var i = 0; i < Arr.length; i++) {
      if (Arr[i].cost === undefined) {
        console.log('rent');
        vm.forRent.push(Arr[i]);
      } else if (Arr[i].rent === undefined) {
        console.log('sale');
        vm.forSale.push(Arr[i]);
      }
    }
  }

  function getHouses(){
    HouseService.getHouses().then(function(res) {
      console.log(res);
      getSorted(res);
    });
  }


}
