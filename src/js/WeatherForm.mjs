const apiKey = import.meta.env.VITE_API_KEY; // Importing the API key from the .env file

async function fetchLatLonWeatherData(type = "simple") {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${apiKey}&units=imperial`;

    if (type === "forecast") {
        url = `https://api.openweathermap.org/data/2.5/forecast?lat=${this.lat}&lon=${this.lon}&appid=${apiKey}&units=imperial`;
    }

    const response = await fetch(url);
    const data = await response.json();
    return data;
}


async function fetchZipWeatherData(type = "simple") {
    let url = `https://api.openweathermap.org/data/2.5/weather?zip=${this.zip}&appid=${apiKey}&units=imperial`;

    if (type === "forecast") {
        url = `https://api.openweathermap.org/data/2.5/forecast?zip=${this.zip}&appid=${apiKey}&units=imperial`;
    }

    const response = await fetch(url);
    const data = await response.json();
    return data;
}


async function fetchCityWeatherData(type = "simple") {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.state},${this.country}&appid=${apiKey}&units=imperial`;

    if (type === "forecast") {
        url = `https://api.openweathermap.org/data/2.5/forecast?q=${this.city},${this.state},${this.country}&appid=${apiKey}&units=imperial`;
    }

    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export default class WeatherForm {
    constructor(type, city, state, country, zip, lat, lon) {
        this.type = type;
        this.city = city;
        this.state = state;
        this.country = country;
        this.zip = zip;
        this.lat = lat;
        this.lon = lon;

        if (type === "lat") {
            this.fetchWeatherData = fetchLatLonWeatherData;
        } else if (type === "city") {
            this.fetchWeatherData = fetchCityWeatherData;
        } else if (type === "zip") {
            this.fetchWeatherData = fetchZipWeatherData;
        }
    }
}

export async function renderTemplateCard(data, type) {
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

function simpleWeatherCard(data) {
    return `<div class="weather-card">
    <h2>${data.name} | ${data.sys.country}</h2>
    <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon" />
    <p>Temperature: ${data.main.temp}°F</p>
    <p>Weather: ${data.weather[0].description}</p>
    <p>Time: ${new Date(data.dt * 1000).toLocaleTimeString()}</p>
    </div>`;
};


/*
* Function renders a five day forecast at 1800 UTC time,
* this ends up grabbing all 5 days at 1800 instead of grabbing
* the next 5 3-hour time intervals. After the data is filtered, it is
* simply mapped to a string of HTML elements.
*/
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
            <div class="forecast-grid-item">${formatDays(day.dt_txt)} <br>
                <img src="http://openweathermap.org/img/w/${day.weather[0].icon}.png" alt="Weather Icon" /> <br>
                ${day.main.temp}°F <br>
                ${day.weather[0].description}
            </div>
            `).join("")}
        </div>
    </div>
    `;
    return card;
}

/*
* Function formats the date to return the day of the week
*/
function formatDays(date) {
    return new Date(date).toLocaleDateString("en-US", { weekday: "long" });
}