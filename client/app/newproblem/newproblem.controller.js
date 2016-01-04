'use strict';

angular.module('spikeCodeApp')    
  .controller('NewproblemCtrl', function ($scope, $http, Problem, $location) {
        
    $scope.defaultProblem = {
       problemName: '',
       desc: '',
       funcSignature: {
          funcName : "solve",
          returnType : "int",
          params : []
        }
    };
    $scope.problem = angular.copy($scope.defaultProblem);    
    
    $scope.submitForm = function(form) {
      $scope.submitted = true;      
      if (form.$valid) {
        Problem.save($scope.problem, 
        function(data){
              $scope.problem = angular.copy($scope.defaultProblem);                               
              $scope.submitted = false;
                         
        },              
        function(err) {
              $scope.errors = {};              
              angular.forEach(err.data.errors, function(error, field){                
                  form[field].$setValidity('mongoose', false);
                  $scope.errors[field] = error.message;                  
              });
        });
      }
    }; //end of submit form
  });
