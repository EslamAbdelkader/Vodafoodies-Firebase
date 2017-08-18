// The Firebase functions
const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Firebase Database Reference
const database = admin.database();

// putVenueOrder method to insert a venue order in the database
// then redirects to the putUserOrder functions
exports.handler = function(req, res){
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
  // req.body.venue_order_id = venueOrderID
  // console.log(req.body);
  res.redirect(307, 'putUserOrder?venue_order_id=' + venueOrderID);
};
