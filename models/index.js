var mongoose = require("mongoose");
// connecting with mongo database
mongoose.connect(process.env.MONODB_URI || 'mongodb://localhost/wanderlist');

module.exports.User = require('./user.js');
module.exports.Trip = require('./trip.js');