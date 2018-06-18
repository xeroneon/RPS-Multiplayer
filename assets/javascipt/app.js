
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

var player1Connected = false;

var player2Connected = false;

var player1Ready = false;

var player2Ready = false;

var playersCon = 0;

var key;


database.ref().update({
    player2Connected: false
})
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
        
        // con.onDisconnect().then((snap) => {
        //     key = snap.key;
        //     console.log(key);

        //     database.ref().update({
        //         player1Connected: true
        //     })
        //  });
        // Remove user from the connection list when they disconnect.

        // con.update({
        //     player1Connected: true
        // })

        con.onDisconnect().remove();

        // if (snap.numChildren() === 0) {
        //     player1Name = prompt("What is your name?");
        // }

    }



});

// database.ref("/connections/" + key).on("value", function(snap) {
//     database.ref().update({
//         player1Connected: true
//     })
// })
connectionsRef.on("value", function (snap) {
    console.log("connected", snap.numChildren())

    if (snap.numChildren() === 0) {
        database.ref().update({
            player1Connected: false,
            player2Connected: false
        })
    }
    if (snap.numChildren() === 1) {
        playersCon = 1;

        database.ref().update({
            playersCon: playersCon,
        })
        // database.ref("/players").update({
        //     player1Ready: false,
        //     player2Ready: false
        // })
        if (player1Connected === false) {
            database.ref().update({
                player1Connected: true,
            })
            database.ref("/players").update({
                player1Ready: false
            })
        }
        if (player2Connected === false) {
            database.ref("/players").update({
                player2Ready: false
            })
        }

        if(sessionStorage.getItem("isPlayer") === "1") {
            database.ref().update({
                player2Connected: false
            })
            database.ref("/players").update({
                player2Ready: false
            })
        }
        if(sessionStorage.getItem("isPlayer") === "2") {
            database.ref().update({
                player1Connected: false
            })
            database.ref("/players").update({
                player1Ready: false
            })
        }
    }
    if (snap.numChildren() === 2) {
        playersCon = 2;

        database.ref().update({
            playersCon: playersCon,
        })
        if (player1Connected === false) {
            database.ref().update({
                player1Connected: true
            })
        }
        if(player2Connected === false) {
            database.ref().update({
                player2Connected: true
            })
        }
    }
    // connectionsRef.update({
    //     player1Connected: false
    // })
    // if (con.val().player1Connected === false) {
    //     con.update({
    //         player1Connected: true
    //     })
    // }

})

$("#player1-submit").on("click", function () {
    player1Name = $("#player1-input").val();
    player2Name = $("#player2-input").val();

    player1Ready = true;

    database.ref("/players").update({
        player1Name: player1Name,
        player1Ready: player1Ready
    });

    sessionStorage.setItem("isPlayer", "1");

    $("#player1-input").addClass("hide");
    $("#player2-input").addClass("hide");
    $("#player1-submit").addClass("hide");
    $("#player2-submit").addClass("hide");
})

$("#player2-submit").on("click", function () {
    player1Name = $("#player1-input").val();
    player2Name = $("#player2-input").val();

    player2Ready = true;

    database.ref("/players").update({
        player2Name: player2Name,
        player2Ready: player2Ready
    });

    sessionStorage.setItem("isPlayer", "2");
    $("#player1-input").addClass("hide");
    $("#player2-input").addClass("hide");
    $("#player1-submit").addClass("hide");
    $("#player2-submit").addClass("hide");

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

database.ref().on("value", function(snap) {
    player2Connected = snap.val().player2Connected;

    player1Connected = snap.val().player1Connected;

    // console.log(player2Connected);

    // console.log(player1Connected);
    if (player1Connected === true && player2Connected === true) {
        if (sessionStorage.getItem("isPlayer") === "1") {
            console.log("ran");

            $("#rock1").removeClass("hide");
            $("#paper1").removeClass("hide");
            $("#scissors1").removeClass("hide");
        }
    }
})


$("#rock1").on("click", function() {
    player1Choice = "rock"
    database.ref().update({
        player1Choice: player1Choice
    })
} )
$("#paper1").on("click", function() {
    player1Choice = "paper"
    database.ref().update({
        player1Choice: player1Choice
    })
} )
$("#scissors1").on("click", function() {
    player1Choice = "scissors"
    database.ref().update({
        player1Choice: player1Choice
    })
} )