'use strict';

var app = require('../..');
var request = require('supertest');

var newproblem;

describe('problem API:', function() {

  describe('GET /api/problems', function() {
    var problems;

    beforeEach(function(done) {
      request(app)
        .get('/api/problems')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          problems = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      problems.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/problems', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/problems')
        .send({
          	 problemName: "Sum2",
  		       desc: "Find two sum",
  		       funcSignature : {
    		        funcName: "sum2",
    		        returnType: "int",
    		        params: ["int", "int"]  
  		       }, 
  		       active: true
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newproblem = res.body;
          done();
        });
    });

    it('should respond with the newly created problem', function() {
      newproblem.problemName.should.equal('Sum2');
      newproblem.desc.should.equal('Find two sum');
      newproblem.funcSignature.funcName.should.equal('sum2');
    });

  });

  describe('GET /api/problems/:id', function() {
    var problem;

    beforeEach(function(done) {
      request(app)
        .get('/api/problems/' + newproblem._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          problem = res.body;
          done();
        });
    });

    afterEach(function() {
      problem = {};
    });

    it('should respond with the requested problem', function() {
      problem.name.should.equal('New problem');
      problem.info.should.equal('This is the brand new problem!!!');
    });

  });

  describe('PUT /api/problems/:id', function() {
    var updatedproblem

    beforeEach(function(done) {
      request(app)
        .put('/api/problems/' + newproblem._id)
        .send({
          name: 'Updated problem',
          info: 'This is the updated problem!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedproblem = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedproblem = {};
    });

    it('should respond with the updated problem', function() {
      updatedproblem.name.should.equal('Updated problem');
      updatedproblem.info.should.equal('This is the updated problem!!!');
    });

  });

  describe('DELETE /api/problems/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/problems/' + newproblem._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when problem does not exist', function(done) {
      request(app)
        .delete('/api/problems/' + newproblem._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
