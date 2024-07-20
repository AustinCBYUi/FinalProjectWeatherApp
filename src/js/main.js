import { loadHeaderFooter } from "./utilities";
import WeatherForm, { renderTemplateCard } from "./WeatherForm.mjs";
import WeatherFormCoord, { renderCoordTemplateCard } from "./WeatherFormCoord.mjs";


loadHeaderFooter("Home");

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
    document.getElementById("weatherFormLatLon").addEventListener("submit", async function (e) {
        event.preventDefault();
        try {
            const alert = document.querySelector(".alert-text");
            alert.innerHTML = "The data has been retrieved!";
            const lat = document.getElementById("latitude").value;
            const lon = document.getElementById("longitude").value;
    
            const weather = new WeatherFormCoord(lat, lon);
    
            localStorage.setItem("lastSearch", JSON.stringify({ lat, lon }));
            const data = await weather.fetchWeatherDataCoords("simple");
            renderCoordTemplateCard(data, "simple");
        } catch (error) {
            console.error(error);
            alert.innerHTML = "There was an error retrieving the data.";
        }
    })
    
    //Listener for simple weather button
    document.getElementById("simpleWeather").addEventListener("click", async function() {
        const lastSearch = JSON.parse(localStorage.getItem("lastSearch"));
        if (lastSearch) {
            const weather = new WeatherFormCoord(lastSearch.lat, lastSearch.lon);
            const data = await weather.fetchWeatherDataCoords("simple");
            renderCoordTemplateCard(data, "simple");
        }
    })
    
    //Listener for forecast weather button
    document.getElementById("forecastWeather").addEventListener("click", async function() {
        const lastSearch = JSON.parse(localStorage.getItem("lastSearch"));
        if (lastSearch) {
            const weather = new WeatherFormCoord(lastSearch.lat, lastSearch.lon);
            const data = await weather.fetchWeatherDataCoords("forecast");
            renderCoordTemplateCard(data, "forecast");
        }
    })
    //Hide the other forms.
})
citySearch.addEventListener("click", async function (e) {
    event.preventDefault();
    citySearchDiv.toggleAttribute("hidden");
    //Checks if the other form is hidden, if not, hide it.
    if (!latSearchDiv.hasAttribute("hidden")) {
        latSearchDiv.toggleAttribute("hidden");
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
    
    const weather = new WeatherForm(city, state, country);
    
    localStorage.setItem("lastSearch", JSON.stringify({ city, state, country }));
    
    //If the user clicks simple, it will render the simple weather card.document.getElementById("simpleWeatherCity").addEventListener("click", async function() {
    simpleButton.addEventListener("click", async function () {
        const data = await weather.fetchWeatherData("simple");
        renderTemplateCard(data, "simple");
    })
    forecastButton.addEventListener("click", async function () {
        const data = await weather.fetchWeatherData("forecast");
        renderTemplateCard(data, "forecast");
    })
});
    //If the user clicks forecast, it will render the forecast weather card.
// document.getElementById("forecastWeather").addEventListener("click", async function() {
//     const lastSearch = JSON.parse(localStorage.getItem("lastSearch"))
//     const data = await weather.fetchWeatherData("forecast");
//     renderTemplateCard(data, "forecast");
// });
        
//Listener for simple weather
//This is for the Local Storage.
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
//----------------------------- End of Nav button event listeners -----------------------------


//----------------------------- Lat/Lon stuff here -----------------------------
//Listener for form submission
// document.getElementById("weatherFormLatLon").addEventListener("submit", async function (e) {
//     event.preventDefault();
//     try {
//         const alert = document.querySelector(".alert-text");
//         alert.innerHTML = "The data has been retrieved!";
//         const lat = document.getElementById("latitude").value;
//         const lon = document.getElementById("longitude").value;

//         const weather = new WeatherFormCoord(lat, lon);

//         localStorage.setItem("lastSearch", JSON.stringify({ lat, lon }));
//     } catch (error) {
//         console.error(error);
//         alert.innerHTML = "There was an error retrieving the data.";
//     }
// })

// //Listener for simple weather button
// document.getElementById("simpleWeather").addEventListener("click", async function() {
//     const lastSearch = JSON.parse(localStorage.getItem("lastSearch"));
//     if (lastSearch) {
//         const weather = new WeatherFormCoord(lastSearch.lat, lastSearch.lon);
//         const data = await weather.fetchWeatherDataCoords("simple");
//         renderCoordTemplateCard(data, "simple");
//     }
// })

// //Listener for forecast weather button
// document.getElementById("forecastWeather").addEventListener("click", async function() {
//     const lastSearch = JSON.parse(localStorage.getItem("lastSearch"));
//     if (lastSearch) {
//         const weather = new WeatherFormCoord(lastSearch.lat, lastSearch.lon);
//         const data = await weather.fetchWeatherDataCoords("forecast");
//         renderCoordTemplateCard(data, "forecast");
//     }
// })
//----------------------------- End of Lat/Lon stuff -----------------------------


//----------------------------- City stuff here -----------------------------
document.getElementById("weatherForm").addEventListener("submit", async function (e) {
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
