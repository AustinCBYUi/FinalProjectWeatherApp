import { loadHeaderFooter } from "./utilities";
import AdvWeather, { renderAdvTemplateCard } from "./AdvancedWeather.mjs";

loadHeaderFooter("Advanced Weather")

//Constants for the nav buttons for each search type.
const latSearch = document.querySelector("#lat");
const citySearch = document.querySelector("#cityButton");
//Constants for the search divs.
const latSearchDiv = document.querySelector(".lat-lon-form");
const citySearchDiv = document.querySelector(".city-form");

//----------------------------- Nav button event listeners -----------------------------
latSearch.addEventListener("click", async function (e) {
    event.preventDefault();
    //Unhide the latitude and longitude search form.
    latSearchDiv.toggleAttribute("hidden");
    if (!citySearchDiv.hasAttribute("hidden")) {
        citySearchDiv.toggleAttribute("hidden");
    }
})

citySearch.addEventListener("click", async function (e) {
    event.preventDefault();
    citySearchDiv.toggleAttribute("hidden");
    //Checks if the other form is hidden, if not, hide it.
    if (!latSearchDiv.hasAttribute("hidden")) {
        latSearchDiv.toggleAttribute("hidden");
    }
})

document.getElementById("weatherFormLatLon").addEventListener("submit", async function (e) {
    event.preventDefault();
    try {
        const simpleButton = document.querySelector("#simpleWeather");
        const forecastButton = document.querySelector("#forecastWeather");
        const alert = document.querySelector(".alert-text");
        alert.innerHTML = "The data has been retrieved!";
        const lat = document.getElementById("latitude").value;
        const lon = document.getElementById("longitude").value;

        const weather = new AdvWeather(null, null, null, lat, lon);

        localStorage.setItem("lastSearch", JSON.stringify({ lat, lon }));
        
        //If the user clicks simple, it will render the simple weather card.document.getElementById("simpleWeatherCity").addEventListener("click", async function() {
        simpleButton.addEventListener("click", async function () {
            const data = await weather.fetchWeatherData("latlon", "simple");
            renderAdvTemplateCard(data, "simple");
        })
        forecastButton.addEventListener("click", async function () {
            const data = await weather.fetchWeatherData("latlon", "forecast");
            renderAdvTemplateCard(data, "forecast");
        })
    } catch (error) {
        console.error(error);
        alert.innerHTML = "There was an error retrieving the data.";
    }
})


document.getElementById("weatherForm").addEventListener("submit", async function (e) {
    event.preventDefault();
    const simpleButton = document.querySelector("#simpleWeatherCity");
    const forecastButton = document.querySelector("#forecastWeatherCity");
    const alert = document.querySelector(".alert-text");
    alert.innerHTML = "The data has been retrieved!";
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const country = document.getElementById("country").value;
    
    const weather = new AdvWeather(city, state, country);
    
    localStorage.setItem("lastSearch", JSON.stringify({ city, state, country }));
    
    //If the user clicks simple, it will render the simple weather card.document.getElementById("simpleWeatherCity").addEventListener("click", async function() {
    simpleButton.addEventListener("click", async function () {
        const data = await weather.fetchWeatherData("city", "simple");
        renderAdvTemplateCard(data, "simple");
    })
    forecastButton.addEventListener("click", async function () {
        const data = await weather.fetchWeatherData("city", "forecast");
        renderAdvTemplateCard(data, "forecast");
    })
});