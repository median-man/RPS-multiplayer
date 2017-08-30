/*
*	----- Game -----
*/
var game = {

};

/*
*	----- storage -----
*
* 	Provides methods and properties for saving and retrieving game
*	data.
*	
*/
var storage = {
	// --- values --- //
	playerCount: 0,

	// --- refernces --- //
	playersRef: false,
	userRef: false,
	opponentRef: false,


	// --- methods --- //

	// Adds player to database if possible.
	addPlayer: function(player) {
		
		if ( this.playerCount === 0 ) {
			// add player to database as player 1
			this.userRef = this.playersRef.child(1);
		} else if ( !this.userRef && this.playerCount === 1){
			// add player to db as player 2
			this.userRef = this.playersRef.child(2);

		// return 0 if game is full and player not already
		// in the game
		} else if ( !this.userRef ) {
			console.log("storage: Already 2 players.");
			return 0;
		}
		this.userRef.set(player);
		return this.userRef.key;
	},
	setOpponentRef: function(key) {

	},
	connect: function() {

		// initialize the database connection
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
		this.playersRef = database.ref("/players");

		// handle change in players
		this.playersRef.on("value", function(snap) {
			storage.playerCount = snap.numChildren();
			console.log(snap.exportVal());
		});
	},
	clearAll: function() {
		this.playersRef.remove();
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
	storage.connect();
	$("#btnStart").on("click", function() {
		var  name = $("#txtName").val().trim();
		$("#txtName").val("");

		var playerNum = storage.addPlayer(new Player(name));
		console.log(playerNum);
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