const {findRestaurants} = require('./server/controllers/restaurants');
const {findMeals} = require('./server/controllers/meals');
const {findUserDestinations, findUser, saveUserDestination, deleteUserDestination, saveUser, findTokens} = require('./server/controllers/user');
const {findCities} = require('./server/controllers/cities');
const { sendOrder } = require('./server/controllers/order');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const serverApp = express();
var router = express.Router();
serverApp.use(express.static('./dist/Otherwise'));
serverApp.use(bodyParser.json());
serverApp.use(bodyParser.urlencoded({ extended: false }));

serverApp.get('/node/cities', function (request, response) {
  findCities(request, response);
});

serverApp.get('/node/restaurants', function (request, response) {
  findRestaurants(request, response);
});
serverApp.get('/node/goodluck', function (request, response) {
  findTokens(request, response);
});

serverApp.get('/node/meals/:restaurantId', function (request, response) {
  findMeals(request, response);
});

serverApp.get('/node/user/destinations/:email', function (request, response) {
  findUserDestinations(request, response);
});
serverApp.get('/node/user/:email', function (request, response) {
  findUser(request, response);
});

serverApp.post('/node/user/destination/:email', function (request, response) {
  saveUserDestination(request, response);
});
serverApp.post('/node/user/save', function (request, response) {
  saveUser(request, response);
});

serverApp.delete('/node/user/deleteUserDestination/:destinationId', function (request, response) {
  deleteUserDestination(request, response);
});

serverApp.post('/node/order', function (request, response) {
  sendOrder(request, response);
});


serverApp.get('/*', function (request, response) {
    response.sendFile(path.join(__dirname, '/dist/Otherwise/index.html'));
});

module.exports = router;

serverApp.listen(process.env.PORT || 8080);
