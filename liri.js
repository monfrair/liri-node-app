//Liri takes the following arguments
// * my-tweets
// * spotify-this-song
// * movie-this
// * do-what-it-says


// NPM Package for reading and writing files
var fs = require('fs');

var dataKeys = require("./keys.js");
var Twitter = require('twitter');
var spotify = require("node-spotify-api");
var request = require("request");
var client = new Twitter(dataKeys.twitterKeys);


///capture user input, and inform user of what to type in.
console.log("Please Type my-tweets, spotify-this-song, movie-this, or do-what-it-says");

//take in all the command line arguments
var nodeArgs = process.argv;



// Command Instructions possibilities: my-tweets, spotify-this-song, movie-this, do-what-it-says
var userChoice = process.argv[2];
var userValue = " "; //will this handle the whole name of the song if multiple words?

for (i = 3; i < process.argv.length; i++) {
    userValue += ' ' + process.argv[i];
};

console.log(userValue + "34");
console.log(userChoice + "35");




////////////////////////////////////////////////////////////////////////
//Function for finding songs on Spotify
////////////////////////////////////////////////////////////////////////

function getSpotify() {
    //If it doesn't find a song, default is The Sign by Ace of Base
    if (userValue === " ") {
        (userValue = 'The Sign');
    };

    //spotify variables for user account
    var spotifyThisSong = new spotify({
        id: 'cee40f14b4714e95a4942522c241ced1',
        secret: '100ea93662344e14992be21b7a6d0b96',
    });

    //   Spotify search
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
////////////////////////////////////////////////////////////////////////
//end for finding songs on Spotify --working great
////////////////////////////////////////////////////////////////////////   


////////////////////////////////////////////////////////////////////////
//    twitter funtcion to get tweet data  not working at all getting undefined error on funtion
////////////////////////////////////////////////////////////////////////

function readTweets() {
    console.log(userValue + "  code got to line 96");
    console.log(userChoice + "  WTF code line 97");




    var params = {
        screen_name: 'monfrair',
        count: 20
    };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {

        if (!error) {

                for (i= 0; i < tweets.length; i++) {
	            console.log(tweets);
	        }
	    }
        else {
            console.log(error);
        }

            console.log(userChoice + "    WTF code line 118");
           
    });
};

////////////////////////////////////////////////////////////////////////
//     end of twitter function
////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////        
//        movie function and code to get movie data
////////////////////////////////////////////////////////////////////////       

function getMovie() {

    if (userValue === undefined) {
        userValue = 'Mr Nobody';
    }

    var urlHit = "http://www.omdbapi.com/?t=" + userValue + "&y=&plot=full&tomatoes=true&r=json";

    request(urlHit, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = [];
            var jsonData = JSON.parse(body);

            data.push({
                'Title: ': jsonData.Title,
                'Year: ': jsonData.Year,
                'Rated: ': jsonData.Rated,
                'IMDB Rating: ': jsonData.imdbRating,
                'Country: ': jsonData.Country,
                'Language: ': jsonData.Language,
                'Plot: ': jsonData.Plot,
                'Actors: ': jsonData.Actors,
                'Rotten Tomatoes Rating: ': jsonData.tomatoRating,
                'Rotton Tomatoes URL: ': jsonData.tomatoURL,
            });
            console.log(data);

        }
    });
}
////////////////////////////////////////////////////////////////////////        
//      end of  movie function and code to get movie data
////////////////////////////////////////////////////////////////////////       



////////////////////////////////////////////////////////////////////////        
//     do what it says function and code 
////////////////////////////////////////////////////////////////////////       

 function whatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        console.log(data);
        writeToLog(data);
        var dataArr = data.split(',')

        if (dataArr.length == 2) {
            pick(dataArr[0], dataArr[1]);
        } else if (dataArr.length == 1) {
            pick(dataArr[0]);
        }

    });
}

////////////////////////////////////////////////////////////////////////        
//   end of  do what it says function and code 
////////////////////////////////////////////////////////////////////////       

////////////////////////////////////////////////////////////////////////
//else if statements for user input
////////////////////////////////////////////////////////////////////////
console.log("code got to line 197");

if (userChoice === 'spotify-this-song') {
    getSpotify();

} else if (userChoice === 'my-tweets') {
    readTweets();
    console.log("code got to line 204");
} else if (userChoice === 'movie-this') {
    getMovie();
    console.log("code got to line 207");
} else if (userChoice === 'do-what-it-says') {
    whatItSays();
} else {
    console.log('please choose one');

};


////////////////////////////////////////////////////////////////////////
//end of else if statements for user input
////////////////////////////////////////////////////////////////////////
