var playerNum;


// initialize firebase
var config = {
    apiKey: "AIzaSyBcw7vxfVodOnXmmesBCNFN625DR_CTvdY",
    authDomain: "rps-multi-e7e39.firebaseapp.com",
    databaseURL: "https://rps-multi-e7e39.firebaseio.com",
    projectId: "rps-multi-e7e39",
    StorageBucket: "rps-multi-e7e39.appspot.com",
    messagingSenderId: "880645929001"
};
firebase.initializeApp(config);

// database references
var database = firebase.database();
var fbRefPlayers = database.ref("/players");
var fbRefUser;
var fbRefOpponent;

// setup references to the players
fbRefPlayers.once("value", function(snap) {

	// no players yet; player 1
	if ( !snap.exists() ) {
		fbRefUser = fbRefPlayers.child(1);
		fbRefOpponent = fbRefPlayers.child(2);
		playerNum = 1;
	} else if ( snap.numChildren() === 1 ) {
		fbRefOpponent = fbRefPlayers.child(1);
		fbRefUser = fbRefPlayers.child(2);
	} else {
		console.log("Already 2 players.");
	}

	// listen for changes to the opponent data
	fbRefOpponent.on("value", function(snap) {

		// update the opponent name

	});


});



// Handles a change in the opponent.
function opponentChanged(opp) {

	// render the name

}

// Handles a change in the user.
function userChanged(user) {

	// update the database

	// update the view
	view.renderStart(user.name, 1, "Waiting for opponent to join.");

}

var players = function() {

	var user = new Player();
	var opponent = new Player();


	return {
		opponent: {

		},
		user: {

		}
	}
};

/*
*	----- Player -----
*
*	Container for data associated with a player.
*/
var Player = function(name = "", wins = 0, losses =0 ) {
	this.name = name;
	this.wins = wins;
	this.losses = losses;
};


$(document).ready(function() {

	// start button click
	$("#btnStart").on("click", function() {

		// get players name and reset form
		var  name = $("#txtName").val().trim();
		$("#txtName").val("");
		userChanged(new Player(name));



	});
	
});

/*
*	----- view -----
*
*	Container for rendering dynamic page content.
*/
var view = {
	// --- view components --- //


	// --- methods --- //
	alert: function (message) {
		alert(message);
	},
	render: function() {

	},
	renderStart: function(name, num, status) {

		// fade out greeting and form
		$(function() {
			$("#signon, #greeting, #status").fadeOut(400, function() {
				// make greeting visible
				$("#greeting").removeClass("invisible");

				// update values
				view.updatePlayer({
					name: name,
					wins: 0,
					losses: 0,
					num: num
				});
				$("#status").text(status);

				// fade greating, status, and the rest of the game in
				$(".chat-display, .gameArea .invisible, #greeting, #status")
					.css("opacity", "0")
					.show()
					.removeClass("invisible hidden")
					.fadeTo(200, 1);
			});
		});
	},
	renderOpponent: function(opponent) {

	},
	updatePlayer: function(data) {
		$(".playerName").text(data.name);
		$("#playerWins").text(data.wins);
		$("#playerLosses").text(data.losses);
		$("#playerNum").text(data.num);
	}
};


// --- test code --- //
function fbRemPlayers() { fbRefPlayers.remove(); }