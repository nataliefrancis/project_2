# Wanderlist

## About my app
Wanderlist is like a digital bucket list. Users can input details of trips and save them to future reference. It also populates
their places on a map, sort of like a cork board, so that they can view their wish list as a map of places.

## Installation
Node modules: express, body-parser, method-override, passport, mongoose, bcrypt-nodejs, connect-flash, morgan, cookie-parser, express-session

## Approach taken
I admit I had to redo this app. I originally started in the backend, getting my database running, then jumped to the front end
so that I could get some pages going to start working on the login features. I quickly ran into issues that didn't seem normal,
issues that made me think there was a typo somewhere. After trying to trouble shoot it for about 2 hours, I finally decided 
that I should just start over with clean code. So when I started the second time, I started with the database and 2 ejs front
end files. Once going, I then worked on the login with passport. Upon completion of that I started working on the front end 
visuals and getting the AJAX working. Lastly I worked on interacting with the API google map to save the user data. Final styling
will be done last after full functionality is reached.

## Unresolved issues
As of right now, the database works and the CRUD routes work but the user can't interact with them much.

## Trello
[Link to my Trello](https://trello.com/b/fKfXjHlF/project-2)

## Wireframes
[Link to my wireframes](./wireframes)

## Prototype (just index page)
[Link to my Index prototype](./wireframes/prototypes)

## Heroku deployment
[Link to my Heroku](https://shrouded-refuge-49977.herokuapp.com/)
