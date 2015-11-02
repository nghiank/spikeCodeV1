'use strict';

var request = require('request');

// Creates a new Thing in the DB
exports.compileAndRun = function(req, res) {
  var code = req.body.code;
  var languageId = req.body.languageId;
  var languageAndCode = {
    language: languageId,
    code : req.body.code,
    stdin: 'nonsense'
  };

  var options = {
      url: 'http://localhost:2015/compile',
      method: 'POST',
      json: true,
      headers: {
        'content-type':'application/json',
      },
      body : languageAndCode
  };


  request(options, function(error,response, body){
    if (error) {
      console.log(error);
    } else {
      console.log(response.statusCode, body);
    }
  });


};
