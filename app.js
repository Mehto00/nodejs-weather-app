
//	Hi, I'm a graphic designer and a lifelong learner on a path to become a Full Stack developer.
// 	Check out more from 
// 	www.mikkometso.com
// 	www.linkedin.com/in/mikkometso/
// 	www.github.com/Mehto00/


const https = require('https');
const api = require('./api');

let location = "Helsinki"; // Set default location to Helsinki

function convertToCelsius(kelvin) {
	celsius = kelvin - 273.15
	return celsius;
}

function formatInputStyle(userInput) {
	userInput = userInput.charAt(0).toUpperCase() + userInput.substr(1).toLowerCase()
	return userInput;
}

function getWeather(api, location) {
	https.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${api.key}`, (res) => {
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

// Update location if given and format style 
if (process.argv.slice(2,3) != "") {
	location = process.argv.slice(2,3);
	location = formatInputStyle(location.toString());
}

getWeather(api, location);



