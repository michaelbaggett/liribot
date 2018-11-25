require("dotenv").config();
const Spotify = require("node-spotify-api");
const keys = require("./keys.js");
const moment = require("moment")
const axios = require("axios");
const fs = require("fs");

let userCommand = process.argv[2];
let userSearch = process.argv[3];


function spotifySearch() {
    var spotify = new Spotify(keys);

    spotify.search({
        type: 'track',
        query: 'userSearch'
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
    })
};

function omdbSearch() {
    let queryURL = "http://www.omdbapi.com/?t=" + userSearch + "&y=&plot=short&apikey=trilogy"


    // if (!userSearch) {
    //     userSearch = "Mr Nobody";
    //     axios.get(queryURL).then(
    //         function (response) {
    //             console.log(response)
    //         }
    //     )
    // }
    axios.get(queryURL).then(
        function (response) {
            const data = response.data;
            //console.log(data);
            console.log(
                `
${"Movie Title:" + data.Title},
${"Year Released: " + data.Year},
${"IMDB Rating: " + data.imdbRating},
${data.Ratings[1].Source + ": " + data.Ratings[1].Value},
${"Country in which produced: " + data.Country},
${"Language: " + data.Language},
${"Plot: " + data.Plot},
${"Actors: " + data.Actors}
`
            )
        }
    )
}

function bandsInTownSearch() {
    let bandsURL = "https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp"


    axios.get(bandsURL).then(
        function (response) {
            let venue1 = response.data[0].venue.name;
            let venue2 = response.data[1].venue.name;
            let city1 = response.data[0].venue.city;
            let city2 = response.data[1].venue.city;
            let state1 = response.data[0].venue.region;
            let state2 = response.data[1].venue.region;
            let time1 = response.data[0].datetime;
            let time2 = response.data[1].datetime;
            console.log(
                `
Venue: ${venue1} 
Where: ${city1}, ${state1}
Date: ${moment(time1).format('LLL')},
Venue: ${venue2} 
Where: ${city2}, ${state2} 
Date: ${moment(time2).format('LLL')}
`)
        }
    )
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf-8", function (err, data) {
        if (err) {
            return console.log(err)
        }
        //console.log(data)
        let dataArr = data.split(",");
        console.log(dataArr);
        if (dataArr[0] === "movie-this") {
            userSearch = dataArr[1]
            console.log(userSearch)
            //omdbSearch();
        }
    })
}

switch (userCommand) {
    case "movie-this":
        omdbSearch();
        break;
    case "spotify-this":
        spotifySearch();
        break;
    case "concert-this":
        bandsInTownSearch();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
}