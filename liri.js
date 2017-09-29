//Make it so liri.js can take in one of the following commands:
//    * my-tweets
//    * spotify-this-song
//    * movie-this
//    * do-what-it-says

//1. node liri.js my-tweets
//    * This will show your last 20 tweets and when they were created at in your terminal/bash window.
//2. node liri.js spotify-this-song '<song name here>'
//    * This will show the following information about the song in your terminal/bash window
//        * Artist(s)
//        * The song's name
//        * A preview link of the song from Spotify
//        * The album that the song is from
//    * If no song is provided then your program will default to "The Sign" by Ace of Base.
//    * You will utilize the node-spotify-api package in order to retrieve song information from the Spotify API.
//    * Like the Twitter API, the Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a client id and client secret:
//    * Step One: Visit https://developer.spotify.com/my-applications/#!/
//    * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.
//    * Step Three: Once logged in, navigate to https://developer.spotify.com/my-applications/#!/applications/create to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.
//    * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the node-spotify-api package. See the
//3. node liri.js movie-this '<movie name here>'
//    * This will output the following information to your terminal/bash window:
//  * Title of the movie.
//  * Year the movie came out.
//  * IMDB Rating of the movie.
//  * Rotten Tomatoes Rating of the movie.
//  * Country where the movie was produced.
//  * Language of the movie.
//  * Plot of the movie.
//  * Actors in the movie.
//    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
//        * If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
//        * It's on Netflix!
//    * You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use 40e9cece.
//4. node liri.js do-what-it-says
//    * Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
//        * It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
//        * Feel free to change the text in that document to test out the feature for other commands.

//liri app will take the following aruments:
//my tweets
//spotify this song
//movie-this
//do-what-it-says

// NPM Package for reading and writing files
var fs = require('fs'); 

var dataKeys = require("./keys.js");
var twitter = require("twitter");
var spotify = require("spotify");
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
    writeToLog(data);
  });
};



























