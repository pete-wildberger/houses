app.service('HouseService', function($http) {
  var sv = this;

  sv.getHouses = function() {
    console.log('in getHoouses');
    return $http.get('/houses').then(function(res) {
      console.log(res.data);
      return res.data;
    });
  };

  sv.postHouses = function(data) {
    console.log('in postHousess:', data);
    $http.post('/houses', data).then(function(res) {
      console.log('back from server with:', res);
    });
  };

});
