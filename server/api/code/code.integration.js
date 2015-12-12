var app = require('../..');
var request = require('supertest');

describe('Code run and compile API:', function() {
	it('should compile and run a simple program', function(){
		request(app).
		post('/api/code/compile').
		send({
			
		})
		.expect(200);
		
	});
})