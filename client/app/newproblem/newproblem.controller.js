'use strict';

angular.module('spikeCodeApp')
  .controller('NewproblemCtrl', function ($scope, $http) {
    $scope.problem = {};
    $scope.problem.name = '';
    $scope.problem.desc = '';
    $scope.submitForm = function() {
      $http({
        method: 'POST',
        url: '/api/problems',
        data: $scope.problem,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'} 
      }).success(function(data){
        
            console.log(JSON.stringify(data.errors));
            if (data.errors) {
              // Showing errors.
              $scope.errorName = data.errors.name;
              
              //$scope.errorUserName = data.errors.username;
              //$scope.errorEmail = data.errors.email;
            } else {
              $scope.message = data.message;
            }
      }); //end of http
    }; //end of submit form
  });
