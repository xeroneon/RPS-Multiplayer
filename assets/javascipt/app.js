
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAVq_eX-wS_RN8O8dpyC-a-cSQ_TZBXn64",
    authDomain: "rps-mujltiplayer.firebaseapp.com",
    databaseURL: "https://rps-mujltiplayer.firebaseio.com",
    projectId: "rps-mujltiplayer",
    storageBucket: "",
    messagingSenderId: "5114991892"
};
firebase.initializeApp(config);

var database = firebase.database();

var player1Name = "";

var player2Name = "";

var player1Choice = "";

var player2Choice = "";

var playersCon = 0;



// connectionsRef references a specific location in our database.
// All of our connections will be stored in this directory.
var connectionsRef = database.ref("/connections");

// '.info/connected' is a special location provided by Firebase that is updated
// every time the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");

// console.log(connectedRef);

connectedRef.on("value", function (snap) {

    // If they are connected..
    if (snap.val()) {
        // console.log(snap.name());
        // Add user to the connections list.
        var con = connectionsRef.push(true)
        // .then((snap) => {
        //     var key = snap.key;
        //     console.log(key);
        //  });
        // Remove user from the connection list when they disconnect.

        con.update({
            player1Connected: true
        })

        con.onDisconnect().remove().update({
            player1Connected: false
        });

        // if (snap.numChildren() === 0) {
        //     player1Name = prompt("What is your name?");
        // }

    }



});

connectionsRef.on("value", function (snap) {
    console.log("connected", snap.numChildren())


    if (snap.numChildren() === 1) {
        // player1Name = prompt("What is your name?");

        // database.ref("/players").set({
        //     player1Name: player1Name
        // });

        playersCon = 1;

        database.ref().update({
            playersCon: playersCon
        })
    }
    if (snap.numChildren() === 2) {
        // player2Name = prompt("What is your name?");

        // database.ref("/players").set({
        //     player2Name: player2Name
        // });
        // if (sessionStorage.getItem("isPlayer") === "1") {
        //     $("#player1-choice").text("Rock");
        // }

        playersCon = 2;

        database.ref().update({
            playersCon: playersCon
        })
    }
    // connectionsRef.update({
    //     player1Connected: false
    // })
    if (con.val().player1Connected === false) {
        con.update({
            player1Connected: true
        })
    }

})

$("#player1-submit").on("click", function () {
    player1Name = $("#player1-input").val();
    player2Name = $("#player2-input").val();

    var player1Ready = true;

    database.ref("/players").update({
        player1Name: player1Name,
        player1Ready: player1Ready
    });

    sessionStorage.setItem("isPlayer", "1");
})

$("#player2-submit").on("click", function () {
    player1Name = $("#player1-input").val();
    player2Name = $("#player2-input").val();

    var player2Ready = true;

    database.ref("/players").update({
        player2Name: player2Name,
        player2Ready: player2Ready
    });

    sessionStorage.setItem("isPlayer", "2");

})

database.ref("/players").on("value", function (snap) {

    // if (snapshot.child("player1Name").exists || snapshot.child("player2Name").exists ) {
    player1Name = snap.val().player1Name;
    player2Name = snap.val().player2Name;
    $("#player1-name").text(player1Name);
    $("#player2-name").text(player2Name);

    player1Ready = snap.val().player1Ready;
    player2Ready = snap.val().player2Ready;

    // } else {
    //     $("#player1-name").text("Player 1");
    //     $("#player2-name").text("Player 2");
    // }

    // playersCon = snap.val().playersCon;



})

if (playersCon === 2) {
    if (sessionStorage.getItem("isPlayer") === "1") {
        console.log("ran");
        $("#rock1").text("Rock");
        $("#paper1").text("Paper");
        $("#scissors1").text("Scissors");
    }
}