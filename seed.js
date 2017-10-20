var db = require('./models');

var vacation_list = [
	{
	place: "Paris, France",
	sights: "Visited the Louvre, Musee D'Orsay, Eiffel Tower, and Montmontre",
	foods: "bannana",
	activities: "blah"
	},
	{
	place: "London, England",
	sights: "Visited the Tower of London, Stonehenge (outside of London), and Abbey Road",
	foods: "bannana",
	activities: "blah"
	},
	{
	place: "Amsterdam, Netherlands",
	sights: "Visited Anne Frank's house, ate space cakes",
	foods: "bannana",
	activities: "blah"
	},
	{
	place: "Sydney, Australia",
	sights: "Want to snorkel the Great Barrier Reef",
	foods: "bannana",
	activities: "blah"
	}
];

// db.Vacation.remove({}, function (err, vacations) {
// 	console.log("removed all vacations");
// 	db.Vacation.create(vacation_list, function (err, vacations) {
// 		if (err) {
// 			console.log(err);
// 			return;
// 		}
// 		console.log("created ", +vacation.legth+ " vacations");
// 		process.exit(); // we're all done! Exit the program.
// 	});
// });



db.Trip.create(vacation_list, function(err, vacations){
  if (err){
    return console.log("Error:", err);
  }

  console.log("Created new vacations!");
  process.exit(); // we're all done! Exit the program.
})