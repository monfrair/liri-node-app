//Liri takes the following arguments
// * my-tweets
// * spotify-this-song
// * movie-this
// * do-what-it-says


////#########  error is in the for loop, check it out and fix it /////////////


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
var userValue = " "; //will this handle the whole name of the song if multiple words?

for (i = 3; i < process.argv.length; i++) {
    userValue += ' ' + process.argv[i];
}
//console.log(userValue);
//console.log(userChoice);



if (userChoice === 'spotify-this-song') {
    getSpotify();
} else if (userChoice === 'my-tweets') {
    fetchTweets();
} else if (userChoice === 'movie-this') {
    getMovie();
} else if (userChoice === 'do-what-it-says') {
    whatItSays();
} else   {
    console.log('please choose one');
}



//Function for finding songs on Spotify
function getSpotify() {
    //If it doesn't find a song, default is The Sign by Ace of Base
    if (userValue === undefined) {
        userValue = 'The Sign';
    };


    //spotify variables for user account
    var spotifyThisSong = new spotify({
        id: 'cee40f14b4714e95a4942522c241ced1',
        secret: '100ea93662344e14992be21b7a6d0b96',
    });

    



//    console.log(userValue);
    spotifyThisSong.search({
        type: 'track',
        query: userValue,
        limit: 20
    }, function (err, data) {
        if (err) {
            console.log('Spotify Error occurred: ' + err);
            return;
        }

        
        var getArtistNames = function (artist) {
        return artist.name;
    };
        
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
        

    });


    

};
