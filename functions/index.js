
// The Firebase functions
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Firebase Database Reference
const database = admin.database();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

// putVenueOrder method to insert a venue order in the database
// then redirects to the putUserOrder functions
exports.putVenueOrder = functions.https.onRequest((req, res) => {
  //The DB references needed
  var venueOrders = database.ref("venueOrders");
  var users = database.ref("users");

  // Getting data from the request
  var userID = req.get("uid");  // user ID from the header
  var venueID = req.body.venue_id

  // Pushing the venueOrder and getting back the key generated
  var venueOrderID = venueOrders.push({
    "venue_id" : venueID,
    "user_id" : userID
  }).key

  // Adding the VenueOrder id to the user's venueOrders node
  var userVenueOrders = users.child(userID + "/venueOrders");
  var obj = {}
  obj[venueOrderID] = true;
  userVenueOrders.update(obj);

  // Adding the venueOrderID to the request and forwarding to the putUserOrder function
  //TODO: The middleware routing
  req.body.venue_order_id = venueOrderID
  console.log(req.body);
  res.redirect(307, 'putUserOrder');
});

// putVenueOrder method to insert a venue order in the database
// then redirects to the putUserOrder functions
exports.putUserOrder = functions.https.onRequest((req, res) => {
  // Getting data from the request
  var userID = req.get("uid");  // user ID from the header
  var venueID = req.body.venue_id
  var venueOrderID = req.body.venue_order_id

  //The DB references needed
  var venueOrders = database.ref("venueOrders");
  var userOrders = database.ref("users/" + userID + "/userOrders");
  var venues = database.ref("venues/" + venueID);

  //appending venue order ID to userOrders in User node
  var obj = {}
  obj[venueOrderID] = true
  userOrders.update(obj);

  //Getting items data from Venue
  //TODO: Get all items data from venue node
  //TODO: create userOrder node and append it to the user orders array
  //      with the user's ID as key as in the example
  //TODO: create and append the object as in example to the item sum node

  //TODO: respond with a success message

});

// listedVenues to return a list of all listed venues and their IDs
exports.listedVenues = functions.https.onRequest((req, res) => {
  //The DB references needed
  var venues = database.ref("venues");

  venues.once("value").then(function(data){
    var listedVenues = data.val()
    console.log(listedVenues);
    var keys = Object.keys(listedVenues);
    console.log(keys);
    var obj = {}

    for (var i = 0; i < keys.length; i++) {
      obj[keys[i]] = listedVenues[keys[i]].venue_name
    }

    res.send(obj)
  }).catch(function(error){
    console.log(error);
  });
});

// addVenue to add the venues data to the venues node in firebase
exports.addVenue = functions.https.onRequest((req, res) => {
  //The DB references needed
  var venues = database.ref("venues");

  // Getting data from the request
  var venueData = req.body.venue_data

  //Pushing Venue Node to Database
  venues.push(venueData);

  //Responding with Success Message
  res.send("Venue Added successfully to database");

});
