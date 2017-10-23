

var express = require('express');
var router = express.Router();
// Parses information from POST
var bodyParser = require('body-parser');
// Used to manipulate POST methods
var methodOverride = require('method-override');
var passport = require("passport");
var usersController = require('../controllers/users');
var staticsController = require('../controllers/statics');
var pageController = require('../controllers/mainPage');
var db = require('../models');

function authenticatedUser(req, res, next) {
  // If user is authenticated then continue execution
  if (req.isAuthenticated()) return next();
  // Otherwise direct request back to the homepage
  res.redirect('/');
}

/////////////// ROUTES ////////////////

	// Root route //
router.route('/')
  .get(staticsController.home);

router.route('/user')
	.get(usersController.getUser)

router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup)

router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin)

router.route("/logout")
  .get(usersController.getLogout)

router.route('/userpage')
	.get(pageController.mainPage)

// router.get('/userpage', function(req, res) {
// 	res.render('../views/userPage');
// });

		/////////// DB CRUD ROUTES /////////////////////

// get all trips
router.get('/userpage/trips', function (req, res) {
	db.Trip.find({}, function(err, trips) {
		if (err) console.log(err);
		else res.json(trips);
	});
});

//get one trip
router.get('/userpage/trips/:id', function (req, res) {
	db.Trip.findOne({_id: req.params.id}, function(err, trip) {
		if (err) console.log(err);
		res.json(trip);
	});
});

//create a new trip
router.post('/userpage/trips', function(req, res) {
	let newTrip = new db.Trip({
		place: req.body.place,
		sights: req.body.sights,
		foods: req.body.foods,
		activities: req.body.activities,
		// user: res.locals.currentUser._id
	});
	newTrip.save(function(err, trip) {
		if (err) console.log(err);
		res.json(trip);
	});
});

// Delete a trip
router.delete('/userpage/trips/:id', function(req, res) {
	let tripId = req.params.id;
	db.Trip.findOneAndRemove({_id: tripId}, function(err, deletedTrip) {
		res.json(deletedTrip);
	});
});

// update a trip
// app.put('/userpage/trips/:id', function (req, res) {
// 	db.Trip.findOne({_id: req.params.id}, function(err, trip) {
// 		if (err) console.log(err);
// 		trip.place = req.body.city;
// 		trip.sights = req.body.sights;
// 		trip.foods = req.body.foods;
// 		trip.activities = req.body.activities;
// 		trip.save();
// 		res.json(trip);
// 	});
// });

module.exports = router