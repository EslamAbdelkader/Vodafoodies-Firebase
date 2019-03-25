// The Firebase functions
const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Firebase Database Reference
const database = admin.database();

// Deletes the item with the id and size provided 
// from the venue order id provided
exports.handler = function(req, res) {
    
  // Getting data from the request
  var userID = req.get("uid");
  var venueOrderID = req.query.venue_order_id
  var itemId = req.query.item_id
  var itemSize = req.query.item_size

  console.log(req.query);

  // forming nodes keys
  var userID_size = userID + "_" + itemSize
  var itemID_size = itemId + "_" + itemSize


  //Deleting the nodes from the database
  database.ref("venueOrders/" + venueOrderID + "/itemsSum/" + itemId + "/" + userID_size).remove();
  database.ref("venueOrders/" + venueOrderID + "/userOrders/" + userID + "/" + itemID_size).remove();
  
  
  // responding with success message
  res.status(200).send("Successfull Operation");
  };