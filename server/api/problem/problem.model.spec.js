'use strict';

import app from '../..'
import Problem from './problem.model'

var problem;
var genProblem = function() {
	problem = new Problem({
		 problemName: "Sum2",
  		 desc: "Find two sum",
  		 funcSignature : {
    		funcName: "sum2",
    		returnType: "int",
    		params: ["int", "int"]  
  		 }, 
  		 active: true
	});
	return problem;
}

describe('Problem model', function(){
	before(function(){
		//clear all problems before testing
		return Problem.removeAsync();
	});
	
	beforeEach(function(){
		genProblem();
	});
	
	it('should begin with no problem', function(){
		return Problem.findAsync({}).should.eventually.have.length(0);
	});
	
	it('should fail when saving duplicate problem name', function(){
		return problem
				.saveAsync()
				.then(function(){
					var problemDup = genProblem();					
					return problemDup.saveAsync();
				}).should.be.rejected;						
	});
	
	describe('#problemName', function(){
		it('should fail when no problem name is provided', function(){
			problem.problemName = '';
			problem.saveAsync().should.be.rejected;
		});
	});
	
	describe('#desc', function(){
		it('should fail when no desc is provided', function(){
			problem.desc = '';
			problem.saveAsync().should.be.rejected;
		});
	});
	
	describe('#funcSignature', function(){
		it('should fail when no funcName', function(){
			problem.funcSignature.funcName = '';
			problem.saveAsync().should.be.rejected;
		});
		it('should fail when no returnType', function(){
			problem.funcSignature.returnType = '';
			problem.saveAsync().should.be.rejected;
		});
		it('should fail when no params', function(){
			problem.funcSignature.params = [];
			problem.saveAsync().should.be.rejected;
		});
	});
})