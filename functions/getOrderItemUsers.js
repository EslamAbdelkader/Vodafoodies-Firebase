// The Firebase functions
const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Firebase Database Reference
const database = admin.database();

// Returns a list of all the users who ordered a certain item in a certain venue order
exports.handler = function(req, res) {
    
  // Getting data from the request
  var userID = req.get("uid");
  var venueOrderID = req.body.venue_order_id
  var orderedItemID = req.body.item_id

  // DB nodes needed
  var venueOrderItem = database.ref("venueOrders/" + venueOrderID + "/itemsSum/" + orderedItemID);
  var users = database.ref("users");

  venueOrderItem.once("value").then(function(snapShot){
    var data = snapShot.val();
    var usersIDsWithSize = Object.keys(data);
    return usersIDsWithSize;
  }).then(function(data){

    users.once("value").then(function(snapShot){
      var users = snapShot.val();
      var resultItems = []
      for (var i = 0; i < data.length; i++) {
        var item = {}
        var _index = data[i].lastIndexOf("_");
        var uID = data[i].substring(0, _index)
        var size = data[i].substr(_index + 1)
        item.size = size
        item.user = {}
        item.user.id = uID
        item.user.name = users[uID].name
        item.user.phone = users[uID].phone
        item.user.image = users[uID].img
        item.user.email = users[uID].email

        resultItems.push(item)
      }

      var resObject = {}
      resObject.status = "Successfull Request"
      resObject.result = resultItems
      res.status(200).send(resObject);
    });


    
  });
  };