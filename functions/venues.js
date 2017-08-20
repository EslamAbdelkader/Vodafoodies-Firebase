// The Firebase functions
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const database = admin.database();

// listedVenues to return a list of all listed venues and their IDs
exports.listedVenues = function(req, res){
    //The DB references needed
    var venues = database.ref("venues");
  
    venues.once("value").then(function(data){
      var listedVenues = data.val()
      console.log(listedVenues);
      var keys = Object.keys(listedVenues);
      console.log(keys);
      var obj = {}
  
      for (var i = 0; i < keys.length; i++) {
        obj[keys[i]] = listedVenues[keys[i]].venue_name
      }
  
      res.send(obj)
    }).catch(function(error){
      console.log(error);
      res.status(500).send({error : "couldn't retrieve data from the database"});
    });
  };

  // addVenue to add the venues data to the venues node in firebase
exports.addVenue = function(req, res){
    //The DB references needed
    var venues = database.ref("venues");
  
    // Getting data from the request
    var venueData = req.body.venue_data
  
    //Pushing Venue Node to Database
    venues.push(venueData);
  
    //Responding with Success Message
    res.send("Venue Added successfully to database");
  
  };