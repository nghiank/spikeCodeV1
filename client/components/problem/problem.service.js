'use strict';

angular.module('spikeCodeApp')
  .factory('Problem', function ($resource) {
    return $resource('/api/problems/:id', {
      id:'@_id'   //_id column in mongodb   
    },
    {      
    });
  });
