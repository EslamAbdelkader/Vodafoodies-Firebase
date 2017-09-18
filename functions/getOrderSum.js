// The Firebase functions
const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Firebase Database Reference
const database = admin.database();

// Returns a list of the sum of each item in the order
exports.handler = function(req, res) {
    
  // Getting data from the request
  var userID = req.get("uid");
  var venueOrderID = req.query.venue_order_id
  console.log(venueOrderID)
  // Database Reference needed
  var orderSum = database.ref("venueOrders/" + venueOrderID + "/itemsSum")

  orderSum.once("value").then(function(snapShot){
    var data = snapShot.val();
    var itemsKeys = Object.keys(data);
    var result = {}
    // looping on items in the order
    for (var i = 0; i < itemsKeys.length; i++) {
      var item = {}
      // item[itemsKeys[i]] = {}
      item.sizes = {}

      // looping on the orders of each item
      var orders = Object.keys(data[itemsKeys[i]]);
      for (var j = 0; j < orders.length; j++) {
        var _index = orders[j].lastIndexOf("_");
        var size = orders[j].substr(_index + 1);

        // Checking if size exists already and appending data accordingly
        if (item.sizes[size] == undefined){
          item.sizes[size] = {}
          item.sizes[size].count = 1
          item.sizes[size].price = data[itemsKeys[i]][orders[j]].price
          item.name = data[itemsKeys[i]][orders[j]].name
          item.category = data[itemsKeys[i]][orders[j]].category
        }
        else{
          item.sizes[size].count += 1
        }
      }
      result[itemsKeys[i]] =item 
    }
    // Forming response object and sending it
    var resObj = {}
    resObj.status = "Successful request"
    resObj.result = result
    res.status(200).send(resObj);
  });
  
  };