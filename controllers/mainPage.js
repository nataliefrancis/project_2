function mainPage(req, res, next) {
 	console.log(req.user);
	res.render('../views/userPage', req.user);
}

module.exports = {
	mainPage: mainPage
};