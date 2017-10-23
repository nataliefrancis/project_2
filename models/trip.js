var mongoose = require('mongoose');
	Schema = mongoose.Schema;
	User = require('./user.js');

var TripSchema = new Schema({
	place: String,
	sights: String,
	foods: String,
	activities: String,
	// user: Number
});

var Trip = mongoose.model('Trip', TripSchema);

module.exports = Trip;