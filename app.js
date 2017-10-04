
//	Hi, I'm a graphic designer and a lifelong learner on a path to become a Full Stack developer.
// 	Check out more from 
// 	www.mikkometso.com
// 	www.linkedin.com/in/mikkometso/
// 	www.github.com/Mehto00/


const https = require('https');

let apiKey,latitude, longitude;

function getWeather(apiKey, latitude, longitude) {
	https.get(`https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}`, (res) => {
	let body = "";
	res.on('data', (data) => {
		body += data.toString();

	}).on('end', () => {
		const weatherData = JSON.parse(body);
		console.log(weatherData.currently);
	});

	}).on('error', (e) => {
		console.error(e);
	});
}

// User input to arguments
apiKey = process.argv.slice(2,3);
latitude = process.argv.slice(3,4);
longitude = process.argv.slice(4,5);

getWeather(apiKey, latitude, longitude);
