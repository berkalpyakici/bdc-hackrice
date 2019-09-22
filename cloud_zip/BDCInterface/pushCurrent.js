'use strict';
process.env.FIREBASE_CONFIG = JSON.stringify({
    apiKey: "AIzaSyCEHNKVgOOucgeRGvhBw6FR7DuZcUCdc1U",
    authDomain: "bdc-hackrice-hrkohb.firebaseapp.com",
    databaseURL: "https://bdc-hackrice-hrkohb.firebaseio.com",
    projectId: "bdc-hackrice-hrkohb",
    storageBucket: "bdc-hackrice-hrkohb.appspot.com",
    messagingSenderId: "7340638164",
    appId: "1:7340638164:web:b2288265ee1f16cd706041"
});

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
var db = admin.database();


var firstRef = db.ref('currentUpdate/');
function writeUserData(userId, JSON_payload) {
    if(userId == null){
        var newPostRef = firebase.database().ref.push().toString();
    }
    else{
        var newPostRef = userId;
    }
    var payLoad = {};
    payLoad[newPostRef] = JSON_payload;
    firstRef.set(payLoad);
}

var second_ref = db.ref('allData/{userId}');
exports.makeUppercase = db.ref('allData/' + userId).on((change) => {
        // Grab the current value of what was written to the Realtime Database.
        const child_vals = change.val();
        writeUserData(userId, child_vals);
        //console.log('Uppercasing', original, context.params.userId);
        console.log(JSON.stringify(child_vals.ref.parent));

        //const uppercase = original.toUpperCase();
        // You must return a Promise when performing asynchronous tasks inside a Functions such as
        // writing to the Firebase Realtime Database.
        // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
        //return change.after.ref.parent.child('uppercase').set(uppercase);
    });
