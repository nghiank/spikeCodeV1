'use strict';

angular.module('spikeCodeApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/newproblem', {
        templateUrl: 'app/newproblem/newproblem.html',
        controller: 'NewproblemCtrl'
      });
  });
