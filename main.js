'use strict';

var app = angular.module('testApp', []);

app.controller('mainCtrl', function($scope, Pokemon) {

  $scope.count = 10;

  $scope.click = () => {
    if($scope.count > 0) {
      $scope.count--;
    }
  };

  $scope.getBulbasaur = () => {
    Pokemon.getBulbasaur()
      .then(res => {
        console.log(res.data);
        $scope.pokemon = res.data;
      })
      .catch(res => {
        console.log('err:', res);
      })
  }

});

app.service('Pokemon', function($http) {
  this.getBulbasaur = () => {
    return $http.get('http://pokeapi.co/api/v2/pokemon/1');
  };
});
