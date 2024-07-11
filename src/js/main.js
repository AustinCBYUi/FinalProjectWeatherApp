import { loadHeaderFooter } from "./utilities";
loadHeaderFooter();

import WeatherForm, { renderTemplateCard } from "./WeatherForm.mjs";

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

document.getElementById("simpleWeather").addEventListener("click", async function() {
    const lastSearch = JSON.parse(localStorage.getItem("lastSearch"));
    if (lastSearch) {
        const weather = new WeatherForm(lastSearch.city, lastSearch.state, lastSearch.country);
        const data = await weather.fetchWeatherData("simple");
        renderTemplateCard(data, "simple");
    }
});

document.getElementById("forecastWeather").addEventListener("click", async function() {
    const lastSearch = JSON.parse(localStorage.getItem("lastSearch"));
    if (lastSearch) {
        const weather = new WeatherForm(lastSearch.city, lastSearch.state, lastSearch.country);
        const data = await weather.fetchWeatherData("forecast");
        renderTemplateCard(data, "forecast");
    }
});