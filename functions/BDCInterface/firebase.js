var firebase = require("firebase/app");

require("firebase/database");

const config = {
    apiKey: "AIzaSyCEHNKVgOOucgeRGvhBw6FR7DuZcUCdc1U",
    authDomain: "bdc-hackrice-hrkohb.firebaseapp.com",
    databaseURL: "https://bdc-hackrice-hrkohb.firebaseio.com",
    projectId: "bdc-hackrice-hrkohb",
    storageBucket: "bdc-hackrice-hrkohb.appspot.com",
    messagingSenderId: "7340638164",
    appId: "1:7340638164:web:b2288265ee1f16cd706041"
};

firebase.initializeApp(config);



function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture : imageUrl
    });
}
var database = firebase.database();
var starCountRef = database.ref('users/');
starCountRef.on('value', function(snapshot) {
    console.log(snapshot.val());
});

//writeUserData("alovelace", "Ada Lovelace", "czhao028@gmail.com", "google.com");
