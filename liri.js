//Liri takes the following arguments
// * my-tweets
// * spotify-this-song
// * movie-this
// * do-what-it-says


// NPM Package for reading and writing files
var fs = require('fs');

var dataKeys = require("./keys.js");
var twitter = require("twitter");
var spotify = require("node-spotify-api");
var request = require("request");


///capture user input, and inform user of what to type in.
console.log("Please Type my-tweets, spotify-this-song, movie-this, or do-what-it-says");

//take in all the command line arguments
var nodeArgs = process.argv;



// Command Instructions possibilities: my-tweets, spotify-this-song, movie-this, do-what-it-says
var userChoice = process.argv[2];
var userValue = process.argv[3];  //will this handle the whole name of the song if multiple words?

for(i=4; i<process.argv.length; i++){
	    userValue += '+' + process.argv[i];
	}
console.log(userValue);
console.log(userChoice);

var spotifyThisSong = new spotify({
    id: 'cee40f14b4714e95a4942522c241ced1',
    secret: '100ea93662344e14992be21b7a6d0b96',
});


//case switch function to determine users choice  change to an if else statement
function userEntry(){
	
	switch(userChoice){

		case 'my-tweets':
		fetchTweets();
		break;

		case 'spotify-this-song':
		getSpotify();
		break;

		case 'movie-this':
		aMovieForMe();
		break;

		case 'do-what-it-says':
		followTheTextbook();
		break;
		
        default: 
            console.log("Please choose one of the following options: my-tweets,  spotify-this-song,  movie-this, or  do-what-it-says");
	}
};


//Function for finding songs on Spotify
function getSpotify() {
    //If it doesn't find a song, default is The Sign by Ace of Base
    if (userValue === undefined) {
        userValue = 'The Sign';
    };
    

    //spotify variables for user account

   spotify.search({
        type: 'track',
        query: userValue, limit: 20
    }, function (err, data) {
        if (err) {
            console.log('Spotify Error occurred: ' + err);
            return;
        }

        var songs = data.tracks.items;
        var data = []; //empty array to hold data

        for (var i = 0; i < songs.length; i++) {
            data.push({
                'artist(s)': songs[i].artists.map(getArtistNames),
                'song name: ': songs[i].name,
                'preview song: ': songs[i].preview_url,
                'album: ': songs[i].album.name,
            });
        }
        console.log(data);
        console.log(songs);

    });
};
