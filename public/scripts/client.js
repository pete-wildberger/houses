var app = angular.module('myApp', []);

app.controller('HouseController', HouseController);

function HouseController(HouseService) {
  console.log('NG YO');
  var vm = this;
  HouseService.hello();
}
