const apiKey = import.meta.env.VITE_API_KEY; // Importing the API key from the .env file

export default class WeatherFormCoord {
    constructor(lat, lon) {
        this.lat = lat;
        this.lon = lon;
    }

    async fetchWeatherData(type = "simple") {
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${apiKey}&units=imperial`;

        if (type === "forecast") {
            url = `https://api.openweathermap.org/data/2.5/forecast?lat=${this.lat}&lon=${this.lon}&appid=${apiKey}&units=imperial`;
        }

        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
}

function simpleWeatherCardCoords(data) {
    return `<div class="weather-card">
    <h2>${data.lat} ${data.lon}</h2>
    <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon" />
    <p>Temperature: ${data.main.temp}°F</p>
    <p>Weather: ${data.weather[0].description}</p>
    <p>Time: ${new Date(data.dt * 1000).toLocaleTimeString()}</p>
    </div>`;
};

function forecastWeatherCardCoords(data) {
    const filteredData = data.list.filter(item => {
        const date = new Date(item.dt * 1000);
        return date.getUTCHours() === 18;
    }).slice(0, 5);

    return `<div class="weather-card">
    <h2>${data.lat} ${data.lon}</h2>
    <img src="http://openweathermap.org/img/w/${filteredData[0].weather[0].icon}.png" alt="Weather Icon" />
    <p>Temperature: ${filteredData[0].main.temp}°F</p>
    <p>Weather: ${filteredData[0].weather[0].description}</p>
    <p>Time: ${new Date(filteredData[0].dt * 1000).toLocaleTimeString()}</p>
    </div>`;
};