// ======================================
// WEATHER APP
// ======================================

// Paste your ACTIVE WeatherApp API key here
const API_KEY = "9ec977a2f46d65f35fe7cc3b0998e5f0";

// HTML Elements
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const countryName = document.getElementById("countryName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const feelsLike = document.getElementById("feelsLike");
const windSpeed = document.getElementById("windSpeed");
const weatherIcon = document.getElementById("weatherIcon");
const errorMessage = document.getElementById("errorMessage");


// ======================================
// SEARCH BUTTON
// ======================================

searchBtn.addEventListener("click", function () {

    const city = cityInput.value.trim();

    if (city === "") {
        errorMessage.textContent = "Please enter a city name.";
        return;
    }

    getWeather(city);
});


// ======================================
// ENTER KEY
// ======================================

cityInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        getWeather(cityInput.value.trim());
    }

});


// ======================================
// GET WEATHER
// ======================================

async function getWeather(city) {

    if (city === "") {
        errorMessage.textContent = "Please enter a city name.";
        return;
    }

    errorMessage.textContent = "Loading weather...";

    const url =
        "https://api.openweathermap.org/data/2.5/weather" +
        "?q=" + encodeURIComponent(city) +
        "&appid=" + API_KEY +
        "&units=metric";

    try {

        const response = await fetch(url);

        const data = await response.json();

        console.log("Weather API Response:", data);

        if (!response.ok) {

            if (response.status === 401) {
                throw new Error(
                    "Invalid API key or API key is not activated yet."
                );
            }

            if (response.status === 404) {
                throw new Error("City not found.");
            }

            throw new Error("Unable to get weather data.");
        }

        displayWeather(data);

        errorMessage.textContent = "";

    } catch (error) {

        console.error("Weather Error:", error);

        errorMessage.textContent = "❌ " + error.message;

    }
}


// ======================================
// DISPLAY WEATHER
// ======================================

function displayWeather(data) {

    cityName.textContent = data.name;

    countryName.textContent =
        data.sys.country;

    temperature.textContent =
        Math.round(data.main.temp) + "°C";

    description.textContent =
        data.weather[0].description;

    humidity.textContent =
        data.main.humidity + "%";

    feelsLike.textContent =
        Math.round(data.main.feels_like) + "°C";

    windSpeed.textContent =
        data.wind.speed + " m/s";


    // Weather Icon
    const iconCode =
        data.weather[0].icon;

    weatherIcon.src =
        "https://openweathermap.org/img/wn/" +
        iconCode +
        "@2x.png";

    weatherIcon.alt =
        data.weather[0].description;
}