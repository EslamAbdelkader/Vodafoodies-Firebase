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
        obj[keys[i]] ={}
        obj[keys[i]].name = listedVenues[keys[i]].venue_name
        obj[keys[i]].img = listedVenues[keys[i]].venue_image
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
    var vName = req.body.venue_name
    var key = ""

    venues.once("value").then(function(snapShot){
      var listedVenues = snapShot.val()
      var keys = Object.keys(listedVenues);
      var exists = false
      var respObj = {}
      for (var i = 0; i < keys.length; i++) {
        if(vName == listedVenues[keys[i]].venue_name){
          exists = true;
          key = keys[i];
        }
      }

      if (!exists){
         key = venues.push(req.body);
         respObj.result = "Added successfully with key" + key
      }else{
         respObj.result = "Already Exists with key" + key
      }

      //Responding with Success Message
    res.setHeader('Access-Control-Allow-Origin', 'https://www.elmenus.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.send(respObj);

    });
  };