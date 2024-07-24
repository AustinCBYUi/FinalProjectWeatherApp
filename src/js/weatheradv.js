import { loadHeaderFooter } from "./utilities";

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