// The Firebase functions
const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Firebase Database Reference
const database = admin.database();

// Returns a list of all the open orders and the necessary related data
exports.handler = function (req, res) {

  // Getting data from the request
  var userID = req.get("uid");

  var responseObj = {}

  //The DB references needed
  
  database.ref().once("value").then(function(snapShot){
    var db = snapShot.val();
    var ordersKeys = []
    // if there's data, get its keys
    if (db.venueOrders){
      ordersKeys = db.venueOrders;
    }

    responseObj.result = []
    for (var i = 0; i < ordersKeys.length; i++) {
      var resultItem = {}
      resultItem.venue_order_id = ordersKeys[i]
      resultItem.order_time = db.venueOrders[ordersKeys[i]].order_time
      resultItem.order_status = db.venueOrders[ordersKeys[i]].order_status

      // Filling in venue data
      var venueID = db.venueOrders[ordersKeys[i]].venue_id
      resultItem.venue_id = venueID
      resultItem.venue_name = db.venues[venueID].venue_name
      resultItem.venue_image = db.venues[venueID].venue_image
      resultItem.venue_phones = db.venues[venueID].venue_phones

      // Filling in Ownser data
      var ownerID = db.venueOrders[ordersKeys[i]].user_id
      resultItem.owner = {}
      resultItem.owner.id = ownerID
      resultItem.owner.name = db.users[ownerID].name
      resultItem.owner.phone = db.users[ownerID].phone
      resultItem.owner.image = db.users[ownerID].img
      resultItem.owner.email = db.users[ownerID].email
      resultItem.owner.profile = db.users[ownerID].fb_profile

      //Appending result item
      responseObj.result.push(resultItem);
    }

  }).then(function(){

    responseObj.status = "Successful Request"
    res.status(200).send(responseObj);

  })
  // .catch(function(error){
  //   console.log(JSON.stringify(error));
  //   res.status(500).send({error : JSON.stringify(error)});
  // });
}
