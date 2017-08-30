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

// TODO-NEXT:
// handle initially setting the player/opponent numbers
// setup references to the players
fbRefPlayers.once("value", function(snap) {
	var user = {};
	// no players yet; player 1
	if ( !snap.exists() ) {
		fbRefUser = fbRefPlayers.child(1);
		fbRefOpponent = fbRefPlayers.child(2);
		user.num = 1;
	} else if ( snap.numChildren() === 1 ) {
		fbRefOpponent = fbRefPlayers.child(1);
		fbRefUser = fbRefPlayers.child(2);
		user.num = 2;
	} else {
		console.log("Already 2 players.");
	}

	// listen for changes to the opponent data
	fbRefOpponent.on("value", function(snap) {

		// update the opponent name

	});
	playerChanged('user', user);

});

var store = {
	updateUser: function(plyUser) {
		fbRefUser.set(plyUser);
	}
};





// Handles a change in the opponent.
function opponentChanged(opp) {

	// render the name

}


/*
*	----- Players -----
*
*	The term 'user' applies to the person playing on the client while
*	the term 'opponent' applies to the person the user is playing
*	the game with. 'Player' will refer to a generic player class.
*/

// initialize players object with new instances of Player
var players = {
	user: new Player(),
	opponent: new Player()
};

// Player is a simple class to represent the data associated with
// a player in the game. (user or opponent)
var Player = function(name = "", wins = 0, losses = 0, num = 0 ) {
	this.name = name;
	this.wins = wins;
	this.losses = losses;
	this.number = num; // player 1 or player 2
};
// Handles a change in a player
function playerChanged(key, ply) {
	// removeme
	console.log("playerChanged", key, ply);
	// update player
	if ( ply.hasOwnProperty('name') ) {
		players[key].name = ply.name;
	}
	if ( ply.hasOwnProperty('wins') ) {
		players[key].wins = ply.wins;
	}
	if ( ply.hasOwnProperty('losses') ) {
		players[key].losses = ply.losses;
	}
	if ( ply.hasOwnProperty('num') ) {
		players[key].num = ply.num;
	}

	// update the database if changed player is the user
	if ( key === 'user' ) {
		store.updateUser(players.user);
	}

	// update the view
	view.render("wait for player");
}

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
	init: function() {
		// register event listeners
		$("#btnStart").on("click", function() {

			// get players name and reset form
			var  name = $("#txtName").val().trim();
			$("#txtName").val("");

			// handle user change
			userChanged('user', { name: name });
		});
	},
	render: function(key) {

		switch ( key ) {

			// transition from sign on to waiting for player to
			// join
			case "wait for player":
				var statusMsg = "Waiting for opponent to join.";
				var plyUser = players.user;

				// fade out elements, update the values, fade back in
				$(function() {
					$("#signon, #greeting, #status").fadeOut(400, function() {
						// make greeting visible
						$("#greeting").removeClass("invisible");

						// update values
						view.updatePlayer(players.user);
						$("#status").text(statusMsg);

						// fade greating, status, and the rest of the game in
						$(".chat-display, .gameArea .invisible, #greeting, #status")
							.css("opacity", "0")
							.show()
							.removeClass("invisible hidden")
							.fadeTo(200, 1);
					});
				});
			break;

			case "wait for turn":
			break;

			case "take turn":
			break;

			case "show result":
			break;

		}
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

// start the game
$(document).ready(function() {
	view.init();
});


// --- development tools --- //
function fbRemPlayers() { fbRefPlayers.remove(); }