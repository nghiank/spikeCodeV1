'use strict';
var config = browser.params;
var ProblemModel = require(config.serverConfig.root + '/server/api/problem/problem.model');

describe('New Problem View', function() {
  var page;

  var loadPage = function() {
    browser.get(config.baseUrl + '/newproblem');
    page = require('./newproblem.po');
  };

  beforeEach(function(done) {
    ProblemModel.removeAsync()
      .then(loadPage)
      .finally(done);      
  });

  it('should be able to submit the new problem', function() {
    var problem = {
      name: 'sum2',
      desc: 'find sum of 2'
    }
    page.submitNewProblem(problem);    
  });
});
