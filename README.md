# nodejs-weather-app
Just a simple node.js weather app. App uses openweathermap.org's API to display weather forecasts.

## Usage

To get your own API key you have to set up account in http://openweathermap.org/appid

After that save your API key to **api.json** -file.

```
{
	"key": "<your api key here>"
}
```

After that (assuming your in the same folder your files are located) you can run the **app.js** from your command prompt with command 
```
node app.json "city-your-searching-for"
```