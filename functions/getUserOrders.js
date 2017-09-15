// The Firebase functions
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const database = admin.database();

// Returns a list of all the user orders of this user with related data
exports.handler = function(req, res) {
    
  // Getting data from the request
  var userID = req.get("uid");
  var venueOrderID = req.query.venue_order_id

  database.ref().once("value").then(function(snapShot){
    var db = snapShot.val();
    // Getting the Venue Orders
    var venueOrders = []
    if (venueOrderID != undefined) {
      venueOrders = [venueOrderID]
    } else {
      venueOrders = Object.keys(db.users[userID].userOrders);
    }

    // Getting each order's data
    var ordersDetails = []
    for (var i = 0; i < venueOrders.length; i++) {
      var order = {}
      //Loop on each venue order to get the follwoing data
      // Venue Id, owner data, user order details (item details and count of each size)
      // Veneu Order Data
      var vOrder = db.venueOrders[venueOrders[i]];
      order.venue_order_id = venueOrders[i];
      order.order_time = vOrder.order_time
      order.order_status = vOrder.order_status
      order.venue_id = vOrder.venue_id
      order.venue_name = db.venues[vOrder.venue_id].venue_name
      order.venue_image = db.venues[vOrder.venue_id].venue_image

      // Venue order admin data
      order.owner = {}
      order.owner.id = vOrder.user_id
      order.owner.name = db.users[vOrder.user_id].name
      order.owner.phone = db.users[vOrder.user_id].phone
      order.owner.image = db.users[vOrder.user_id].img
      order.owner.email = db.users[vOrder.user_id].email
      
      // User ordered items data
      // order.items = Object.values(vOrder.userOrders[userID])
      order.items = Object.keys(vOrder.userOrders[userID]).map(function(key) {
        return vOrder.userOrders[userID][key];
    });
      ordersDetails.push(order);
    }

    var resObject = {}
    resObject.status = "Successfull Request"
    resObject.result = ordersDetails
    res.status(200).send(resObject)
  }).catch(function(error){

    res.status(501).send(error)
  });
  
  };