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
    var orderItems = JSON.parse(req.body.order_items)
  
    //The DB references needed
    var venueOrders = database.ref("venueOrders");
    var userOrders = database.ref("users/" + userID + "/userOrders");
    var userVenueNode = venueOrders.child(venueOrderID).child("userOrders").child(userID)
    var itemsSumNode = venueOrders.child(venueOrderID).child("itemsSum")
    // var venue = database.ref("venues/" + venueID);
  
    //appending venue order ID to userOrders in User node
    var obj = {}
    obj[venueOrderID] = true
    userOrders.update(obj);
  
    // Looping on items and appending them in user orders and order sum nodes
    for (var i = 0; i < orderItems.length; i++) {
      // appending user order to the userOrders node in the venueOrder 
      var itemKey = orderItems[i].item_id + "_" + orderItems[i].item_size
      var itemObj = {}
      itemObj[itemKey] = orderItems[i]
      userVenueNode.update(itemObj)

      //appending the order node to the order sum node
      var userKey = userID + "_" + orderItems[i].item_size
      var userObj = {}
      userObj[userKey] = orderItems[i]
      itemsSumNode.child(orderItems[i].item_id).update(userObj)
    }
    
    // responding with a success message 
    res.status(200).send({status : "Successful operation"});
  
  };
