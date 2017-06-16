app.service('HouseService', function($http) {
  var sv = this;
  sv.hello = function(){
    console.log('HouseService');
  };
});
