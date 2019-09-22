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

function writeNewPost(uid, username, picture, title, body) {
    // A post entry.
    var postData = {
        author: username,
        uid: uid,
        body: body,
        title: title,
        starCount: 0,
        authorPic: picture
    };

    // Get a key for a new Post.
    var newPostKey = "1234556789";

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    return firebase.database().ref().update(updates);
}
var database = firebase.database();
var starCountRef = database.ref('/users');
starCountRef.on('value', function(snapshot) {
    console.log("this is it"+JSON.stringify(snapshot.val())+"updated");
});


writeNewPost("random_uid", "czhao028", "google.com/image/mariah", "Mariah Carey", {date: "today"});
console.log("just created");
//writeUserData("alovelace", "Ada Lovelace", "czhao028@gmail.com", "google.com");

writeNewPost("random_uid", "christineyz1", "google.com/image/mariah", "Mariah Carey", {date: "today"});
console.log("second");
writeNewPost("random_uid", "czhao028", "google.com/image/mariah", "Mariah Carey", {date: "today"});
console.log("third");
//writeUserData("alovelace", "Ada", "czhao028@gmail.com", "google.com");
//writeUserData("alove", "Ada", "czhao028@gmail.com", "google.com");
//writeUserData("alove", "Ada", "czhao028@gmail.com", "tjhsst.edu");
