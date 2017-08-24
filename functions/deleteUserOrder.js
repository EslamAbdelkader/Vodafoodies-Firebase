// The Firebase functions
const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Firebase Database Reference
const database = admin.database();

// Deletes the complete user order from the Venue order ID provided
exports.handler = function(req, res) {
    
    // Getting data from the request
  var userID = req.get("uid");
  var venueOrderID = req.body.venue_order_id

  // Deleting the venue order from the user node
  database.ref("users/" + userID + "/userOrders/" + venueOrderID).remove()

  // Deleting the user order from the venueOrders node
  var userOrder = database.ref("venueOrders/" + venueOrderID + "/userOrders/" + userID)
  userOrder.once("value").then(function(snapShot){
    var data = snapShot.val();

    var itemsKeys = Object.keys(data);
    for (var i = 0; i < itemsKeys.length; i++) {
      // removing the user order from the OrderSum node
      var _index = itemsKeys[i].lastIndexOf("_");
      var itemID = itemsKeys[i].substring(0, _index);
      var size = itemsKeys[i].substr(_index + 1);
      database.ref("venueOrders/" + venueOrderID + "/itemsSum/" + itemID + "/" + userID + "_" + size).remove()
    }
  }).then(function(){
    // removing the user order node from the venueOrder
    database.ref("venueOrders/" + venueOrderID + "/userOrders/" + userID).remove()

    res.status(200).send("User Order deleted Successfully");
  }).catch(function(error){
    console.log(error);
    res.status(410).send("User order already deleted from this Venue order");
  });

  };