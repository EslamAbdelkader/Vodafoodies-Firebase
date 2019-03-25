// The Firebase functions
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const database = admin.database();

// Adds or updates the user data to the database
exports.updateUser = function(req, res) {

    var userData = req.body;
    console.log("User Added with data: " + userData);
    var userID = Object.keys(userData);
    database.ref("users/" + userID).update(userData[userID]);
    var resObj = {}
    resObj.status = "Success"
    resObj.result = "User Added Successfully"
    res.status(200).send(resObj);
  };