// The Firebase functions
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const database = admin.database();

//changes the status of a venue order
exports.handler = function (req, res) {
  // Getting data from the request
  var venueOrderId = req.body.venue_order_id
  var newStatus = req.body.status

  // Changing the order status in the DB
  database.ref('venueOrders/' + venueOrderId + '/order_status').set(newStatus).then(
      function(){res.status(200).send({"status": "success"})}
  ).catch( 
      function(err){res.status(500).send({"status": err})}
    );

};