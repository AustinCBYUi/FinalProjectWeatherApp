import { loadHeaderFooter } from "./utilities";
import WeatherForm, { renderTemplateCard } from "./WeatherForm.mjs";


loadHeaderFooter("Home");

//Constants for the nav buttons for each search type.
const latSearch = document.querySelector("#lat");
const citySearch = document.querySelector("#city");
const zipSearch = document.querySelector("#zip");
//Constants for the search divs.
const latSearchDiv = document.querySelector(".lat-lon-form");
const citySearchDiv = document.querySelector(".city-form");
const zipSearchDiv = document.querySelector(".zip-form");

//----------------------------- Nav button event listeners -----------------------------
latSearch.addEventListener("click", async function (e) {
    event.preventDefault();
    //Unhide the latitude and longitude search form.
    latSearchDiv.toggleAttribute("hidden");
    //Hide the other forms.
})
citySearch.addEventListener("click", async function (e) {
    event.preventDefault();
    citySearchDiv.toggleAttribute("hidden");
})
zipSearch.addEventListener("click", async function (e) {
    event.preventDefault();
    zipSearchDiv.toggleAttribute("hidden");
})
//----------------------------- End of Nav button event listeners -----------------------------


//----------------------------- Lat/Lon stuff here -----------------------------
//Listener for form submission
document.getElementById("weatherFormLatLon").addEventListener("submit", async function (e) {
    event.preventDefault();
    try {
        const alert = document.querySelector(".alert-text");
        alert.innerHTML = "The data has been retrieved!";
        const lat = document.getElementById("latitude").value;
        const lon = document.getElementById("longitude").value;

        const weather = new WeatherForm(lat, lon);

        localStorage.setItem("lastSearch", JSON.stringify({ lat, lon }));
    } catch (error) {
        console.error(error);
        alert.innerHTML = "There was an error retrieving the data.";
    }
})

//Listener for simple weather button
document.getElementById("simpleWeather").addEventListener("click", async function() {
    const lastSearch = JSON.parse(localStorage.getItem("lastSearch"));
    if (lastSearch) {
        const weather = new WeatherForm(lastSearch.lat, lastSearch.lon);
        const data = await weather.fetchWeatherData("simple");
        renderTemplateCard(data, "simple");
    }
})

//Listener for forecast weather button
document.getElementById("forecastWeather").addEventListener("click", async function() {
    const lastSearch = JSON.parse(localStorage.getItem("lastSearch"));
    if (lastSearch) {
        const weather = new WeatherForm(lastSearch.lat, lastSearch.lon);
        const data = await weather.fetchWeatherData("forecast");
        renderTemplateCard(data, "forecast");
    }
})
//----------------------------- End of Lat/Lon stuff -----------------------------


//----------------------------- City stuff here -----------------------------
document.getElementById("weatherForm").addEventListener("submit", function (e) {
    event.preventDefault();
    const alert = document.querySelector(".alert-text");
    alert.innerHTML = "The data has been retrieved!";
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const country = document.getElementById("country").value;

    const weather = new WeatherForm(city, state, country);

    localStorage.setItem("lastSearch", JSON.stringify({ city, state, country }));
});

//Listener for simple weather
document.getElementById("simpleWeather").addEventListener("click", async function() {
    const lastSearch = JSON.parse(localStorage.getItem("lastSearch"));
    if (lastSearch) {
        const weather = new WeatherForm(lastSearch.city, lastSearch.state, lastSearch.country);
        const data = await weather.fetchWeatherData("simple");
        renderTemplateCard(data, "simple");
    }
});

//Listner for forecast weather
document.getElementById("forecastWeather").addEventListener("click", async function() {
    const lastSearch = JSON.parse(localStorage.getItem("lastSearch"));
    if (lastSearch) {
        const weather = new WeatherForm(lastSearch.city, lastSearch.state, lastSearch.country);
        const data = await weather.fetchWeatherData("forecast");
        renderTemplateCard(data, "forecast");
    }
});
//----------------------------- End of City stuff -----------------------------

//----------------------------- Zip stuff here -----------------------------
if (zipSearchDiv.hasAttribute("hidden")) {
    return;
} else {
    document.getElementById("zip-form").addEventListener("submit", function (e) {
        event.preventDefault();
        const alert = document.querySelector(".alert-text");
        alert.innerHTML = "The data has been retrieved!";
        const zip = document.getElementById("zip").value;

        const weather = new WeatherForm(zip);

        localStorage.setItem("lastSearch", JSON.stringify({ zip }));
    });
}

//Listener for simple weather
document.getElementById("simpleWeather-zip").addEventListener("click", async function() {
    const lastSearch = JSON.parse(localStorage.getItem("lastSearch"));
    if (lastSearch) {
        const weather = new WeatherForm(lastSearch.zip);
        const data = await weather.fetchWeatherData("simple");
        renderTemplateCard(data, "simple");
    }
});

//Listener for forecast weather
document.getElementById("forecastWeather-zip").addEventListener("click", async function() {
    const lastSearch = JSON.parse(localStorage.getItem("lastSearch"));
    if (lastSearch) {
        const weather = new WeatherForm(lastSearch.zip);
        const data = await weather.fetchWeatherData("forecast");
        renderTemplateCard(data, "forecast");
    }
});