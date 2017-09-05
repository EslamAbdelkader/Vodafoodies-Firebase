// The Firebase functions
const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Firebase Database Reference
const database = admin.database();

// Returns full data of venue using its id
exports.handler = functions.https.onRequest((req,res) =>{
  //The DB references needed
  var venues = database.ref("venues");

  //Getting data from the request
  var venue_id = req.query.venue_id;

  //Gettind data from the database
  venues.child(venue_id).once("value").then(function(data){
    var venue = data.val();
    // venue.id = venue_id;
    // res.send(venue);
    res.status(200).send(venue.menu);
  }).catch(function(error){
    console.log(error);
    res.status(500).send("Couldn't Retrieve Venue Data");
  });
});
