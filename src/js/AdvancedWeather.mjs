const apiKey = import.meta.env.VITE_API_KEY;

export default class AdvWeather {
    constructor(city = null, state = null, country = null, lat = null, lon = null) {
        this.city = city;
        this.state = state;
        this.country = country;
        this.lat = lat;
        this.lon = lon;
    }

    //Fetches weather data for city, state, country.
    //Directly specified by weatheradv.js
    async fetchWeatherData(search = "city", type = "simple") {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.state},${this.country}&appid=${apiKey}&units=imperial`;

        if (type === "forecast") {
            url = `https://api.openweathermap.org/data/2.5/forecast?q=${this.city},${this.state},${this.country}&appid=${apiKey}&units=imperial`;
        }

        if (search === "latlon") {
            url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${apiKey}&units=imperial`;
            if (type === "forecast") {
                url = `https://api.openweathermap.org/data/2.5/forecast?lat=${this.lat}&lon=${this.lon}&appid=${apiKey}&units=imperial`;
            }
        }

        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
}


/* *********************
* Function to render the template to the parent element.
* ******************** */
export async function renderAdvTemplateCard(data, type) {
    const weatherContainer = document.getElementById("weatherContainer");
    weatherContainer.innerHTML = "";

    const card = document.createElement("div");
    card.className = "weather-card"

    if (type === "simple") {
        card.innerHTML = simpleWeatherCard(data);
    } else if (type === "forecast") {
        card.innerHTML = forecastWeatherCard(data);
    }
    weatherContainer.appendChild(card);
}


/* *********************
* Function to render a single day weather card.
* ******************** */
function simpleWeatherCard(data) {
    return `<div class="weather-card">
    <h2>${data.name} | ${data.sys.country}</h2>
    <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon" />
    <p>Temperature: ${data.main.temp}°F</p>
    <p>Weather: ${data.weather[0].description}</p>
    <p>Feels Like: ${data.main.feels_like}°F</p>
    <p>Temperature High: ${data.main.temp_max}°F</p>
    <p>Temperature Low: ${data.main.temp_min}°F</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Pressure: ${data.main.pressure} hPa</p>
    <p>Sea Level: ${data.main.sea_level} ft</p>
    <p>Visibility: ${data.visibility} meters</p>
    <p>Wind Speed: ${data.wind.speed} mph</p>
    <p>Wind Direction: ${data.wind.deg}° / ${getCompassDirection(data.wind.deg)}</p>
    <p>Wind Gust: ${data.wind.gust} mph</p>
    <p>Time: ${new Date(data.dt * 1000).toLocaleTimeString()}</p>
    <p>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
    <p>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
    </div>`;
};


/* *********************
* Function to render the forecast weather card.
* ******************** */
function forecastWeatherCard(data) {
    const filteredData = data.list.filter(item => {
        const date = new Date(item.dt * 1000);
        return date.getUTCHours() === 18;
    }).slice(0, 5);
    const card = `<div class="weather-card">
    <h2>${data.city.name} | ${data.city.country}</h2>
    <p>5 Day Forecast:</p>
    <div class="forecast-grid">
        ${filteredData.map(day => `
            <div class="forecast-grid-item">
            <h3>${formatDays(day.dt)}</h3>
            <img src="http://openweathermap.org/img/w/${day.weather[0].icon}.png" alt="Weather Icon" />
            <p>Temperature: ${day.main.temp}°F</p>
            <p>Weather: ${day.weather[0].description}</p>
            <p>Feels Like: ${day.main.feels_like}°F</p>
            <p>Temperature High: ${day.main.temp_max}°F</p>
            <p>Temperature Low: ${day.main.temp_min}°F</p>
            <p>Humidity: ${day.main.humidity}%</p>
            <p>Pressure: ${day.main.pressure} hPa</p>
            <p>Sea Level: ${day.main.sea_level} ft</p>
            <p>Visibility: ${day.visibility} meters</p>
            <p>Wind Speed: ${day.wind.speed} mph</p>
            <p>Wind Direction: ${day.wind.deg}° / ${getCompassDirection(day.wind.deg)}</p>
            <p>Wind Gust: ${day.wind.gust} mph</p>
            <p>Area Timezone: ${data.city.timezone}</p>
            <p>Time: ${formatDays(data.dt, true)}</p>
            <p>Sunrise: ${formatDays(data.city.sunrise, true)}</p>
            <p>Sunset: No API Support for Lat/Lon</p>
        </div>
    `).join("")}
    </div>
    </div>`;
    return card;
}


/* *********************
* Function that formats time to a readable time / date to a specific day
* ******************** */
function formatDays(date, time = false) {
    if (!time) {
        return new Date(date).toLocaleDateString("en-US", { weekday: "long"});
    } else {
        return new Date(date * 1000).toLocaleTimeString();
    }
}


/* *********************
* Calculate compass direction from degrees.
* ******************** */
function getCompassDirection(degrees) {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return directions[Math.round(degrees / 45) % 8];
}