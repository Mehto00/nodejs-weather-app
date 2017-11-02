
//	Hi, I'm a graphic designer and a lifelong learner on a path to become a Full Stack developer.
// 	Check out more from 
// 	www.mikkometso.com
// 	www.linkedin.com/in/mikkometso/
// 	www.github.com/Mehto00/


const https = require('https');
const readline = require('readline');
var fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let location = "Helsinki"; // Set default location to Helsinki
let api ="";

function convertToCelsius(kelvin) {
	celsius = kelvin - 273.15
	return celsius;
}

function formatInputStyle(userInput) {
	userInput = userInput.charAt(0).toUpperCase() + userInput.substr(1).toLowerCase()
	return userInput;
}

function getWeather(api, location) {
	https.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${api}`, (res) => {
		let body = "";
		
		res.on('data', (data) => {
			body += data.toString();

		}).on('end', () => {
			try {
				const weatherData = JSON.parse(body);
				var weatherDescription = weatherData.weather[0].description;
				let celsius = convertToCelsius(weatherData.main.temp);

				// Print the results
				console.log(`The Weather description for ${location} is currently ${weatherDescription}`);
				console.log(`and the temperature is ${celsius.toFixed(1)} degrees celsius`);
			} catch(e) {
				console.log(`Problem with user input: No data was found for ${location}`)
			}
		});

	}).on('error', (e) => {
		console.error(e.message);
	});
} 

// If file does not exist asks user for a openweathermap api key and save it
if (!fs.existsSync('apikey.txt')) {
	rl.question('Please provide your openweathermap.org api key\n(for more information checkout http://openweathermap.org/appid): ', (api) => {
	  
	  	fs.writeFile("apikey.txt", api, function(err) {
		    if(err) {
		        return console.log("Problem with saving the file: " + err);
		    }
	    	console.log("Api-key was saved!");
		}); 
		rl.close();
	});
}

fs.readFile('apikey.txt', 'utf8', function(error, data) {
	if (error) {
		throw error;
	}
	api = data;
})

// Ask user for a location and format input style 
rl.question('Input city name for a weather search: ', (location) => {  
	rl.close();
	location = formatInputStyle(location.toString());
	getWeather(api, location);
});


