const expect = require('chai').expect;
const request = require('request');
// let tripModel = require('./models/trip');

var baseURL = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA8MjE8GAbJYYoJl77bJckRqYvANrVt1D8&callback=initMap';

describe("API test", function () {
		request(baseURL, function (error, response, body) { 
			it("should receive a 200/OK HTTP status code", function () {
				expect(response.statusCode).to.equal(200);
			});
			done();
		});
});

describe("Server should be running", function() {
	request('http://localhost:3000/', function(error, response, body) {
		it('Should receive a 200/OK HTTP status code', function(){
			expect(response.statusCode).to.equal(200);
		});
	});
});

// describe("Testing models", function() {
// 	let trip = new Trip ({
// 		place: 'city',
// 		sights: 'cool sights',
// 		foods: 'yummy food',
// 		activities: 'doing something fun'
// 	});
// 	it("should yeild an object", function(error, response, body) {
// 		expect({body}).to.be.an('object');
// 	});

// });