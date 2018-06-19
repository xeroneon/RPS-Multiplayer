
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
    player2Connected: false,
    playersCon: 0
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

        // if (sessionStorage.getItem("isPlayer") === false) {
        //     database.ref("/players").update({
        //         player1Name: "Player 1",
        //         player2Name: "Player 2"
        //     })
        // }

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
            database.ref("/players").update({
                player1Name: "Player 1",
                player2Name: "Player 2"
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

});

// database.ref().once("value").then(function(snap) {
//     if (snap.val().playersCon === 0) {
//         database.ref("/players").update({
//             player1Name: "Player 1",
//             player2Name: "Player 2"
//         })
//     }

//     player1Name = snap.val().player1Name;

//     player2Name = snap.val().player2Name;
    
//     // if (snap.val().playersCon === 1) {
//     //     console.log("something")
//     // }
// })

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
});

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

});

database.ref("/players").on("value", function (snap) {
    player1Name = snap.val().player1Name;
    player2Name = snap.val().player2Name;
    $("#player1-name").text(player1Name);
    $("#player2-name").text(player2Name);

    player1Ready = snap.val().player1Ready;
    player2Ready = snap.val().player2Ready;
});

database.ref("/players/player1Name").on("value", function(snap) {
    if (snap.val() !== "Player 1") {
        $("#player1-input").addClass("hide");
        $("#player1-submit").addClass("hide");
    }
})

database.ref("/players/player2Name").on("value", function(snap) {
    if (snap.val() !== "Player 2") {
        $("#player2-input").addClass("hide");
        $("#player2-submit").addClass("hide");
    }
})

database.ref().on("value", function(snap) {
    player2Connected = snap.val().player2Connected;

    player1Connected = snap.val().player1Connected;

    // console.log(player2Connected);

    // console.log(player1Connected);
    if (player1Connected === true && player2Connected === true) {
        // sessionStorage.setItem("chose", false);
        
        if (sessionStorage.getItem("isPlayer") === "1" && snap.val().player1chose === false) {
            console.log("ran");

            $("#rock1").removeClass("hide");
            $("#paper1").removeClass("hide");
            $("#scissors1").removeClass("hide");
        }
    }

    if (snap.val().player1chose === true && snap.val().player2chose === true) {
        if (snap.val().player1Choice === "rock" && snap.val().player2Choice === "rock") {
            // console.log("result");
            $("#result").text("Tie");
        }
        else if (snap.val().player1Choice === "rock" && snap.val().player2Choice === "paper") {
            // console.log("result");
            $("#result").text(player2Name + " Wins");
        }
        else if (snap.val().player1Choice === "rock" && snap.val().player2Choice === "scissors") {
            // console.log("result");
            $("#result").text(player1Name + " Wins");
        }

        else if (snap.val().player1Choice === "paper" && snap.val().player2Choice === "rock") {
            // console.log("result");
            $("#result").text(player1Name + " Wins");
        }
        else if (snap.val().player1Choice === "scissors" && snap.val().player2Choice === "rock") {
            // console.log("result");
            $("#result").text(player2Name + " Wins");
        }
    }
});

database.ref("player1Choice").on("value", function(snap) {
    if (sessionStorage.getItem("isPlayer") === "2") {
        $("#rock2").removeClass("hide");
        $("#paper2").removeClass("hide");
        $("#scissors2").removeClass("hide");
    }
});

// player 1 choices
database.ref().update({
    player1Choice: "",
    player1chose: false
})
$("#rock1").on("click", function() {
    player1Choice = "rock";
    database.ref().update({
        player1Choice: "",
        player1chose: true
    });
    database.ref().update({
        player1Choice: player1Choice
    });
    if (sessionStorage.getItem("isPlayer") === "1") {
        $("#rock1").addClass("hide");
        $("#paper1").addClass("hide");
        $("#scissors1").addClass("hide");
    }
    console.log("click");
} )
$("#paper1").on("click", function() {
    player1Choice = "paper";
    database.ref().update({
        player1Choice: "",
        player1chose: true
    });
    database.ref().update({
        player1Choice: player1Choice
    });
    console.log("click");
} )
$("#scissors1").on("click", function() {
    player1Choice = "scissors";
    database.ref().update({
        player1Choice: "",
        player1chose: true
    });
    database.ref().update({
        player1Choice: player1Choice
    });
    console.log("click");
} )


//player 2 choices
database.ref().update({
    player2Choice: "",
    player2chose: false
})
$("#rock2").on("click", function() {
    player2Choice = "rock";
    database.ref().update({
        player2Choice: "",
        player2chose: true
    });
    database.ref().update({
        player2Choice: player2Choice
    });
    if (sessionStorage.getItem("isPlayer") === "2") {
        $("#rock2").addClass("hide");
        $("#paper2").addClass("hide");
        $("#scissors2").addClass("hide");
    }
    console.log("click");
} )
$("#paper2").on("click", function() {
    player2Choice = "paper";
    database.ref().update({
        player2Choice: "",
        player2chose: true
    });
    database.ref().update({
        player2Choice: player2Choice
    });
    if (sessionStorage.getItem("isPlayer") === "2") {
        $("#rock2").addClass("hide");
        $("#paper2").addClass("hide");
        $("#scissors2").addClass("hide");
    }
    console.log("click");
} )
$("#scissors2").on("click", function() {
    player2Choice = "scissors";
    database.ref().update({
        player2Choice: "",
        player2chose: true
    });
    database.ref().update({
        player2Choice: player2Choice
    });
    if (sessionStorage.getItem("isPlayer") === "2") {
        $("#rock2").addClass("hide");
        $("#paper2").addClass("hide");
        $("#scissors2").addClass("hide");
    }
    console.log("click");
} )

//send messages

// database.

$("#chat-send").on("click", function() {
    if (sessionStorage.getItem("isPlayer") === "1") {
        database.ref("/messages").update({
            player1Message: $("#chat-input").val()
        })
    } else if (sessionStorage.getItem("isPlayer") === "2") {
        database.ref("/messages").update({
            player2Message: $("#chat-input").val()
        })
    }
})

database.ref("/messages/player1Message").on("value", function(snap) {
    if (player1Ready === true && player2Ready === true) {
        $("#chat-window").append('<p class="player1-message">' + player1Name + ': ' + snap.val() + '</p>');
    }
})

database.ref("/messages/player2Message").on("value", function(snap) {
    if (player1Ready === true && player2Ready === true) {
        $("#chat-window").append('<p class="player2-message">' + player2Name + ': ' + snap.val() + '</p>');
    }
})