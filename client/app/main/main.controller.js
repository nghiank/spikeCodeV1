'use strict';
(function() {

function MainController($scope, $http) {
  var self = this;
  this.awesomeThings = [];

  $http.get('/api/things').then(function(response) {
    self.awesomeThings = response.data;
  });
  $scope.submitCode = function() {
    $http.post('/api/code/compile',
      {
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
