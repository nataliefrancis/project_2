

var express = require('express');
var router = express.Router();
// Parses information from POST
var bodyParser = require('body-parser');
// Used to manipulate POST methods
var methodOverride = require('method-override');
var passport = require("passport");
var usersController = require('../controllers/users');
var staticsController = require('../controllers/statics');
var db = require('../models');

/////////////// ROUTES ////////////////

	// Root route //
router.route('/')
  .get(staticsController.home);

router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup)

router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin)

router.route("/logout")
  .get(usersController.getLogout)

/////////// DB CRUD ROUTES /////////////////////

// define the root route
// router.get('/', function(req, res) {
// 	res.render('./views/index.ejs', { root : __dirname});
// });

// get all trips
router.get('/trips', function (req, res) {
	db.Trip.find({}, function(err, trips) {
		if (err) console.log(err);
		else res.json(trips);
	});
});

//get one trip
router.get('/trips/:id', function (req, res) {
	db.Trip.findOne({_id: req.params.id}, function(err, trip) {
		if (err) console.log(err);
		res.json(trip);
	});
});

//create a new trip
router.post('/trips', function(req, res) {
	let newTrip = new db.Trip({
		place: req.body.place,
		sights: req.body.sights,
		foods: req.body.foods,
		activities: req.body.activities,
	});
	newTrip.save(function(err, trip) {
		if (err) console.log(err);
		res.json(trip);
	});
});

// update a trip
// app.put('/trips/:id', function (req, res) {
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