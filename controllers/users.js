var passport = require("passport");

// GET user - sending user info to the front end
function getUser(request, response) {
	if (request.user) { response.send(request.user._id); }
	else { response.send(""); }
}

// GET /signup
function getSignup(request, response, next) {
	response.render('signup', {message : request.flash('signupMessage')});
}

// POST /signup
function postSignup(request, response, next) {
	let signupStrategy = passport.authenticate('local-signup', {
		successRedirect: '/userpage',
		failureRedirect: '/signup',
		failureFlash: true
	});

	return signupStrategy(request, response, next);
}

// GET /login
function getLogin(request, response, next) { 
	response.render('login', {message: request.flash('loginMessage')});

}

// POST /login 
function postLogin(request, response, next) {
	let loginStrategy = passport.authenticate('local-login', {
		successRedirect: '/userpage',
		failureRedirect: '/login',
		failureFlash: true
	});
	return loginStrategy(request, response, next);
}

// GET /logout
function getLogout(request, response, next) {
	request.logout();
	response.redirect('/');
}

// Restricted page
function secret(request, response){
}

module.exports = {
	getUser: getUser,
	getLogin: getLogin,
	postLogin: postLogin ,
	getSignup: getSignup,
	postSignup: postSignup,
	getLogout: getLogout,
};