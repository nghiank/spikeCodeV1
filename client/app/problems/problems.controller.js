'use strict';

angular.module('spikeCodeApp')
  .controller('ProblemsCtrl', function ($scope, $http) {
    $scope.problems = [];    
    $http.get('/api/problems').success(function(problems) {      
      $scope.problems = problems;      
    });
  });
