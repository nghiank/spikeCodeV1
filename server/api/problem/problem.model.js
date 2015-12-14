'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ProblemSchema = new Schema({  	
  problemName: {type:String, required:"Problem name cannot be blank"},
  desc: {type:String, required:"Problem description cannot be blank"},
  funcSignature: {
    funcName: {type:String, required: "Function name cannot be blank"},
    returnType: {type:String, required: "Function name cannot be blank"},
    params: [{type:String, required: "Function name cannot be blank"}]  
  }, 
  active: Boolean
});

/**
 * Validations
 */

//validate dup problemName
ProblemSchema
  .path('problemName')
  .validate(function(value, respond){
    var self = this;
    return this.constructor.findOneAsync({problemName: value})
              .then(function(problem){
                if (problem) {
                    if (problem.id === self.id) {
                      return respond(true);
                    } 
                    return respond(false);
                }  
                return respond(true);
              })
              .catch(function(err){
                  throw err;
              });
  }, 'The problem name is already taken');
  
 
      
module.exports = mongoose.model('Problem', ProblemSchema);