'use strict';

describe('Controller: ProblemsCtrl', function () {

  // load the controller's module
  beforeEach(module('spikeCodeApp'));

  var ProblemsCtrl, scope;
  var $httpBackend;
  
  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    
    var problem1 = {
      name: 'Two sum'
    };
    var problem2 = {
      name: 'Three sum'
    };
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/problems').
      respond([problem1, problem2]);
      
    scope = $rootScope.$new();
    ProblemsCtrl = $controller('ProblemsCtrl', {
      $scope: scope
    });    
  }));

  it('should list problems', function () {
    $httpBackend.flush();    
    expect(scope.problems.length).toBe(2);
  });
});
