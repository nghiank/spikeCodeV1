'use strict';
var app = require('../..');
var request = require('supertest');

describe('Code run and compile API:', function() {
	it('should compile a simple program', function(done){
		request(app).
		post('/api/code/compile').
		send({
			code: "int sortBall(int a) {return 0;}",
			languageId:"7"			
		})
		.expect(200)
		.expect('Content-Type', /json/)
		.end(function(err,res) {
			if (err) {
				return done(err);
			}
			var result = res.body;
			result.output.should.have.length(0);
			done();
		});
	});
	
	it('should have compile error for mistmatch function signature', function(done) {
		request(app).
		post('/api/code/compile').
		send({
			code: "void sortBall(int a) {return 0;}",
			languageId:"7"			
		})
		.expect(200)
		.expect('Content-Type', /json/)
		.end(function(err,res) {
			if (err) {
				return done(err);
			}
			var result = res.body;
			result.output.should.equal('Compilation Failed\n');
			done();
		});
	});
})