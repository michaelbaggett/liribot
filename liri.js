require("dotenv").config();
//var spotify = require("spotify");
//const spotifyKey = new Spotify(keys.spotify)
const axios = require("axios");
//const spotify = require("spotify");

let userCommand = process.argv[2];
let userSearch = process.argv[3].slice();


// function spotifySearch() {
//     get spotifyQuery = "https://api.spotify.com/v1/search?q=" + songTitle + "&type=track&limit=10"

//     spotify.search({
//         type: 'track',
//         query: spotifyQuery
//     }, function (err, data) {
//         if (err) {
//             console.log('Error occurred: ' + err);
//             return;
//         } else {
//             console.log(data)
//         }
//     })
// };

function omdbSearch() {
    let queryURL = "http://www.omdbapi.com/?t=" + userSearch + "&y=&plot=short&apikey=trilogy"

    axios.get(queryURL).then(
        function (response) {
            const data = response.data;
            //xqconsole.log(data);
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

switch (userCommand) {
    case "omdb-this":
        omdbSearch();
        break;
    case "spotify-this":
        spotifySearch();
        break;
}