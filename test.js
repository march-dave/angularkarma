'use strict';

beforeEach(module('testApp'));

var $controller, $httpBackend, requestHandler;

beforeEach(inject(function($injector) {
  $controller = $injector.get('$controller');
  $httpBackend = $injector.get('$httpBackend');

  requestHandler = $httpBackend.when('GET', 'http://pokeapi.co/api/v2/pokemon/1')
                               .respond({name: 'Bulbasaur'});
}));

afterEach(function() {
  $httpBackend.verifyNoOutstandingExpectation();
  $httpBackend.verifyNoOutstandingRequest();
});

describe('mainCtrl', function() {
  describe('$scope.count', function() {
    it('should begin at 10.', function() {
      var $scope = {};
      $controller('mainCtrl', { $scope: $scope });

      expect($scope.count).to.equal(10);
      $scope.click();
      expect($scope.count).to.equal(9);
      
    });
  });

  describe('$scope.getBulbasaur', function() {
    it('should get Bulbasaur!', function() {
      $httpBackend.expectGET('http://pokeapi.co/api/v2/pokemon/1');

      var $scope = {};
      $controller('mainCtrl', { $scope: $scope });
      
      $scope.getBulbasaur();

      $httpBackend.flush();

      expect($scope.pokemon.name).to.equal('Bulbasaur');

    });
  });
});


