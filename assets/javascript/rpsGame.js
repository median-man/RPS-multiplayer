
/*
*	----- Storage -----
*
* 	Provides methods and properties for saving and retrieving game
*	data.
*	
*/
var Storage = {
	// --- values --- //
	playerCount: 0,

	// --- refernces --- //
	playersRef: null,


	// --- methods --- //
	addPlayer: function(player) {
		if ( this.playerCount === 0 ) {
			// add player to database as player 1
			this.playersRef.child(1).set(player);
			return 1;
		} else if ( this.playerCount === 1 ) {
			// add player to db as player 2
			this.playersRef.child(2).set(player);
			return 2;
		} else {
			console.log("Storage: Already 2 players.");
			return 0;
		}
	},
	connect: function() {

		// initialize the database connection
		var config = {
		    apiKey: "AIzaSyBcw7vxfVodOnXmmesBCNFN625DR_CTvdY",
		    authDomain: "rps-multi-e7e39.firebaseapp.com",
		    databaseURL: "https://rps-multi-e7e39.firebaseio.com",
		    projectId: "rps-multi-e7e39",
		    storageBucket: "rps-multi-e7e39.appspot.com",
		    messagingSenderId: "880645929001"
		};
		firebase.initializeApp(config);

		// database references
		var database = firebase.database();
		this.playersRef = database.ref("/players");

		// handle change in players
		this.playersRef.on("value", function(snap) {
			Storage.playerCount = snap.numChildren();
			console.log(snap.exportVal());
		});
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
	Storage.connect();
	$("#btnStart").on("click", function() {
		var name = $("#txtName").val().trim();
		$("#txtName").val("");

		Storage.addPlayer(new Player(name));
	});
	
});

/*
*	----- View -----
*
*	Container for rendering dynamic page content.
*/
var View = {
	alert: function (message) {
		alert(message);
	}
};