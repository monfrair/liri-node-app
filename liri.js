//Liri takes the following arguments
// * my-tweets
// * spotify-this-song
// * movie-this
// * do-what-it-says


// NPM Package for reading and writing files
var fs = require('fs'); 

var dataKeys = require("./keys.js");
var twitter = require("twitter");
var spotifySong = require('node-spotify-api');
var request = require("request");


//take in all the command line arguments
var nodeArgs = process.argv;


// Command Instructions possibilities: my-tweets, spotify-this-song, movie-this, do-what-it-says
	var commandLine1 = process.argv[2];
	var commandLine2 = process.argv[3];	
	var commandLine3 = process.argv[4];

//twitter variables

var tweets = "";
var userName = "monfrair";

//spotify variables

var artist = "";
var songName = "";
var link = "";
var album ="";

//movie variables

var movieTitle = "";
var year = 0;
var imdbRating = 0;
var country = "";
var language = "";
var plot = "";
var actors = "";
var rotten = "";
var rottenURL = "";




search: function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);



 
var spotify = new Spotify({
  id: 'cee40f14b4714e95a4942522c241ced1',
  secret: '100ea93662344e14992be21b7a6d0b96'
});


 
spotify.search({ type: 'track', query: songName, limit: 20 }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
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
   
  });
};


//Function for finding songs on Spotify
var getSpotify = function(songName) {
  //If it doesn't find a song, default is The Sign by Ace of Base
  if (songName === undefined) {
    songName = 'The Sign';
  };

  spotify.search({ type: 'track', query: songName }, function(err, data) {
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
   
  });
};



























