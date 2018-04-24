
//require modules and keys


require("dotenv").config();


var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
var keys = require('./keys.js')


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//take arguments
//* Comands: `my-tweets`

// * `spotify-this-song

// * `movie-this`

// * `do-what-it-says`



var argument = process.argv[2]

// twitter info request

if (argument === 'my-tweets' ) {
var params = {screen_name: 'gatoarmen' , count: 10};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    // console.log(tweets[0].text);

    for (var i = 0; i < tweets.length; i++) {

        console.log("_____________________________________________");
        console.log("Tweeted on: " + tweets[i].created_at);
        console.log(tweets[i].text);
    }
  }
});
}

// spotify info request
if (argument === 'spotify-this-song' ) {


    
 var songName = process.argv[3]

 if (process.argv[3]) {

spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    } 
    
   
var data = data.tracks.items;
//   console.log(data); 
  

console.log("_____________________________________________");
  console.log('Songs Name: ' + data[0].name); //song track name
  console.log('Preview: ' +  data[0].album.href); //url 
  console.log('Album Name: ' +  data[0].album.name); //album name
  console.log('Preview: ' +  data[0].preview_url); //preview link to the song
  console.log('Artist: ' +  data[0].artists[0].name); //artist's name


  });
 
} else {

    
spotify.search({ type: 'track', query: 'The-Sign' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    } 
    
   
var data = data.tracks.items;
//   console.log(data); 
  

console.log("_____________________________________________");
  console.log('Songs Name: ' + data[0].name); //song track name
  console.log('Preview: ' +  data[0].album.href); //url 
  console.log('Album Name: ' +  data[0].album.name); //album name
  console.log('Preview: ' +  data[0].preview_url); //preview link to the song
  console.log('Artist: ' +  data[0].artists[0].name); //artist's name


  });

}

} 

// OMDB INFO REQUEST
if (argument === 'movie-this' ) {
// Grab the movieName which will always be the third node argument.
var movieName = process.argv[3];
if (process.argv[3]) {
// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";}

else { var queryUrl = "http://www.omdbapi.com/?t=" + 'Mr.Nobody' + "&y=&plot=short&apikey=trilogy"; }

// This line is just to help us debug against the actual URL.
// console.log(queryUrl);

request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    
    console.log("======================================================================");
    console.log("The movie's name is: " + JSON.parse(body).Title);
    console.log("");
    console.log("The movie was released in: " + JSON.parse(body).Year);
    console.log("");
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
    console.log("");
    console.log("This movie was produced in the: " + JSON.parse(body).Country);
    console.log("");
    console.log("The language for this movie is in: " + JSON.parse(body).Language);
    console.log("");
    console.log("The movie's Plot: " + JSON.parse(body).Plot);
    console.log("");
    console.log("The movie's Actor's: " + JSON.parse(body).Actors);
  
  }
});

}

// do what It says

if(argument === "do-what-it-says"){
    
    {
        fs.readFile('random.txt', "utf8", function(err, data){
            console.log(data);
        });
       
    }   

}
