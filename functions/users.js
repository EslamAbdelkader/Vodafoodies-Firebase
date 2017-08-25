// The Firebase functions
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const database = admin.database();

// Adds or updates the user data to the database
exports.updateUser = function(req, res) {

    var userData = req.body.user_data;
    var userID = Object.keys(userData)[0]
    database.ref("users/" + userID).update(userData[userID]);
    res.status(200).send("Successfull request");
  };