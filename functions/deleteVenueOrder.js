// The Firebase functions
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const database = admin.database();

// Deletes the complete user order from the Venue order ID provided
exports.handler = function(req, res) {
    
  // Getting data from the request
  var adminID = req.get("uid");
  var venueOrderID = req.query.venue_order_id

  //Delete the venue order from the admin's data
  database.ref("users/" + adminID + "/venueOrders/" + venueOrderID).remove();

  //Deleting order ID from User's ordered
  database.ref().once("value").then(function(snapShot){
    var db = snapShot.val();
    var users = Object.keys(db.venueOrders[venueOrderID].userOrders);
    for (var i = 0; i < users.length; i++) {
      var userID = users[i];
      database.ref("users/" + userID + "/userOrders/" + venueOrderID).remove();
    }

    // Then delete the venue order itself
  }).then(function(){
    database.ref("venueOrders/" + venueOrderID).remove();
    res.status(200).send("Order Removed Successfully");
  }).catch(function(error){
    console.log(error);
    res.status(501).send("Something went wrong");
  });

  };