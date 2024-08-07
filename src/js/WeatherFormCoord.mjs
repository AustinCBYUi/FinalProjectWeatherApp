import WeatherForm from "./WeatherForm.mjs";

const apiKey = import.meta.env.VITE_API_KEY; // Importing the API key from the .env file

export default class WeatherFormCoord {
    constructor(lat, lon) {
        this.lat = lat;
        this.lon = lon;
    }

    async fetchWeatherDataCoords(type = "simple") {
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${apiKey}&units=imperial`;

        if (type === "forecast") {
            url = `https://api.openweathermap.org/data/2.5/forecast?lat=${this.lat}&lon=${this.lon}&appid=${apiKey}&units=imperial`;
        }

        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
}

export async function renderCoordTemplateCard(data, type) {
    const weatherContainer = document.getElementById("weatherContainer");
    weatherContainer.innerHTML = "";

    const card = document.createElement("div");
    card.className = "weather-card"

    if (type === "simple") {
        card.innerHTML = simpleWeatherCardCoords(data);
    } else if (type === "forecast") {
        card.innerHTML = await forecastWeatherCardCoords(data);
    } else {
        throw new Error("Invalid type");
    }
    weatherContainer.appendChild(card);
}

function simpleWeatherCardCoords(data) {
    return `<div class="weather-card">
    <h2>${data.name} ${data.sys.country}</h2>
    <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon" />
    <p>Temperature: ${data.main.temp}°F</p>
    <p>Weather: ${data.weather[0].description}</p>
    <p>Time: ${new Date(data.dt * 1000).toLocaleTimeString()}</p>
    </div>`;
};

async function forecastWeatherCardCoords(data) {
    const filteredData = data.list.filter(item => {
        const date = new Date(item.dt * 1000);
        return date.getUTCHours() === 18;
    }).slice(0, 5);

    const card = `<div class="weather-card">
    <h2>${data.city.name} | ${data.city.country}</h2>
    <p>5 Day Forecast</p>
    <div class="forecast-grid">
        ${filteredData.map(day => `
            <div class="forecast-grid-item"> ${formatDays(day.dt_txt)} <br>
                <img src="http://openweathermap.org/img/w/${day.weather[0].icon}.png" alt="Weather Icon" /> <br>
                <p>Temperature: ${day.main.temp}°F</p>
                <p>Weather: ${day.weather[0].description}</p>
            </div>`).join("")}
        </div>
    </div>`;
    return card;
};


function formatDays(date) {
    return new Date(date).toLocaleDateString("en-US", { weekday: "long" });
}