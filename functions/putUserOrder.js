// The Firebase functions
const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Firebase Database Reference
const database = admin.database();

// putVenueOrder method to insert a venue order in the database
// then redirects to the putUserOrder functions
exports.handler = function(req, res) {
    // Getting data from the request
    var userID = req.get("uid"); 
    var venueID = req.body.venue_id
    var venueOrderID = req.body.venue_order_id
    if (venueOrderID == undefined){
      venueOrderID = req.query.venue_order_id
    }
  
    res.send(venueOrderID)
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
  
  };
