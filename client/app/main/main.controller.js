'use strict';
(function() {

function MainController($scope, $http) {  

  $scope.languageId = '7';

  $scope.submitCode = function() {
    console.log('LangaugeId=' + $scope.languageId);
    $http.post('/api/code/compile',
      {
        languageId: $scope.languageId,
        code: $scope.code
      }
    ).then(function(response){
        var out = response.data;
        $scope.build = {};
        if (out.errors) {
          $scope.build.error = true;
          $scope.build.output = out.output;
          $scope.build.detailError = out.errors;
        }

      $scope.status = response.data.message;
      console.log(response);
      console.log(response.data);
    });
  };
}

angular.module('spikeCodeApp')
  .controller('MainController', MainController);
})();
