
//	Hi, I'm a graphic designer and a lifelong learner on a path to become a Full Stack developer.
// 	Check out more from 
// 	www.mikkometso.com
// 	www.linkedin.com/in/mikkometso/
// 	www.github.com/Mehto00/


const https = require('https');

let location, apiKey;

function convertToCelsius(kelvin) {
	celsius = kelvin - 273.15
	return celsius;
}

function getWeather(apiKey, location) {
	https.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${apiKey}`, (res) => {
	let body = "";
	res.on('data', (data) => {
		body += data.toString();

	}).on('end', () => {
		const weatherData = JSON.parse(body);
		let celsius = convertToCelsius(weatherData.main.temp);
		console.log(`The temperature in ${location} is currently ${celsius.toFixed(1)} degrees celsius`);
	});

	}).on('error', (e) => {
		console.error(e);
	});
}

// User input to arguments
apiKey = process.argv.slice(2,3);
location = process.argv.slice(3,4);

getWeather(apiKey, location);
