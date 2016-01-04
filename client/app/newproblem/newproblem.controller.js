'use strict';

angular.module('spikeCodeApp')
  .controller('NewproblemCtrl', function ($scope, $http) {
    $scope.problem = {};
    $scope.problem.problemName = '';
    $scope.problem.desc = '';
    $scope.problem.funcSignature = {
        funcName : "solve",
        returnType : "int",
        params : []
    };
    
    $scope.submitForm = function(form) {
      $scope.submitted = true;      
      if (form.$valid) {
        $http({
          method: 'POST',
          url: '/api/problems',
          data: $scope.problem,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'} 
        }).catch(function(err){              
              $scope.errors = {};
              console.log(JSON.stringify(err));
              angular.forEach(err.data.errors, function(error, field){
                console.log(field);
                  form[field].$setValidity('mongoose', false);
                  $scope.errors[field] = error.message;
              });             
        }); //end of http
      }
    }; //end of submit form
  });
