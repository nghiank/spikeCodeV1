'use strict';
(function() {

function MainController($scope, $http) {
  var self = this;

  $scope.languageId = 7;

  $scope.submitCode = function() {
    console.log('LangaugeId=' + $scope.languageId);
    $http.post('/api/code/compile',
      {
        languageId: $scope.languageId,
        code: $scope.code
      }
    ).then(function(response){
      $scope.status = response.data.message;
      console.log(response);
      console.log(response.data);
    });
  };
}

angular.module('spikeCodeApp')
  .controller('MainController', MainController);

})();
