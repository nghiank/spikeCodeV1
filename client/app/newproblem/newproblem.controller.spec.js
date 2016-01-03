'use strict';

describe('Controller: NewproblemCtrl', function () {

  // load the controller's module
  beforeEach(module('spikeCodeApp'));

  var NewproblemCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewproblemCtrl = $controller('NewproblemCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
