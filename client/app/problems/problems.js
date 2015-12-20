'use strict';

angular.module('spikeCodeApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/problems', {
        templateUrl: 'app/problems/problems.html',
        controller: 'ProblemsCtrl'
      });
  });
