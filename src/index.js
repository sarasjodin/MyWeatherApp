function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col">
        <h3>${day}</h3>
        <img src="src/images/sunny.svg" alt="Sunny" />
        <div>
          <span class="high">hi</span>°<span class="low">lo</span>°
        </div>
        </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayTemperature(response) {
  let iconElement = document.querySelector("#weather-icon img");
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let dateElement = document.querySelector("#date");
  let descriptionElement = document.querySelector("#description");
  let precipitationElement = document.querySelector("#precipitation");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  let iconCode = response.data.weather[0].icon;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${iconCode}@4x.png`
  );
  iconElement.setAttribute("alt", `${descriptionElement}`);

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  descriptionElement.innerHTML = response.data.weather[0].description;
  precipitationElement.innerHTML = response.data.clouds.all;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

function updateWeatherDataWithGeolocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "ff1d9ea9376b5c27a82e04fc2b2abdbb";
  let units = "units=metric";
  let apiLink = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&${units}`;

  axios.get(apiLink).then(displayTemperature);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let newCity = searchInputElement.value.trim();
  console.log(searchInputElement.value);

  if (newCity) {
    city = newCity;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&${units}`;
    axios.get(apiUrl).then(displayTemperature);
    document.querySelector("#city").textContent = city;
  }

  searchInputElement.value = "";
}

let apiKey = "ff1d9ea9376b5c27a82e04fc2b2abdbb";
let city = "Stockholm";
let units = "units=metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&${units}`;

// Too be removed
displayForecast();

axios.get(apiUrl).then(displayTemperature);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLinkElement.classList.remove("active");
  fahrenheitLinkElement.classList.add("active");
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  fahrenheitLinkElement.classList.remove("active");
  celsiusLinkElement.classList.add("active");
}

let celsiusLinkElement = document.querySelector("#celsius-link");
let fahrenheitLinkElement = document.querySelector("#fahrenheit-link");

let formElement = document.querySelector(".search-bar");
formElement.addEventListener("submit", search);

fahrenheitLinkElement.addEventListener("click", displayFahrenheitTemperature);
celsiusLinkElement.addEventListener("click", displayCelsiusTemperature);

// Get references to the required elements for geolocation
let iconElement = document.querySelector("#weather-icon img");
let temperatureElement = document.querySelector("#temperature");
let cityElement = document.querySelector("#city");
let dateElement = document.querySelector("#date");
let descriptionElement = document.querySelector("#description");
let precipitationElement = document.querySelector("#precipitation");
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");
let searchInputElement = document.querySelector("#search-input");

// Default geolocation data on page load
function getDefaultGeolocationData() {
  navigator.geolocation.getCurrentPosition(function (position) {
    updateWeatherDataWithGeolocation(position);

    // Update innerHTML elements
    iconElement.setAttribute("src", "");
    temperatureElement.innerHTML = "....";
    cityElement.innerHTML = "Loading...";
    dateElement.innerHTML = "Loading...";
    descriptionElement.innerHTML = "Loading...";
    precipitationElement.innerHTML = "Loading...";
    humidityElement.innerHTML = "Loading...";
    windElement.innerHTML = "Loading...";

    // Set active link and clear search input
    celsiusLinkElement.classList.add("active");
    fahrenheitLinkElement.classList.remove("active");
    searchInputElement.value = "";
  });
}

formElement.addEventListener("submit", search);
fahrenheitLinkElement.addEventListener("click", displayFahrenheitTemperature);
celsiusLinkElement.addEventListener("click", displayCelsiusTemperature);

// Get default geolocation data on page load
getDefaultGeolocationData();

// Theme switcher

// Light Theme Button
const lightThemeButton = document.querySelector("#light-theme-button");
lightThemeButton.addEventListener("click", function () {
  // Remove other theme classes
  document.body.classList.remove("creative-theme", "dark-theme");
  // Add light theme class
  document.body.classList.add("light-theme");
});

// Creative Theme Button
const creativeThemeButton = document.querySelector("#creative-theme-button");
creativeThemeButton.addEventListener("click", function () {
  // Remove other theme classes
  document.body.classList.remove("light-theme", "dark-theme");
  // Generate random colors for creative theme
  const randomColor1 = getRandomColor();
  const randomColor2 = getRandomColor();
  // Apply creative theme styles dynamically
  let iconElement = document.querySelector("#weather-icon img");
  document.body.style.setProperty("--creative-theme-color1", randomColor1);
  document.body.style.setProperty("--creative-theme-color2", randomColor2);
  // Add creative theme class
  document.body.classList.add("creative-theme");
});

// Dark Theme Button
const darkThemeButton = document.querySelector("#dark-theme-button");
darkThemeButton.addEventListener("click", function () {
  // Remove other theme classes
  document.body.classList.remove("light-theme", "creative-theme");
  // Add dark theme class
  document.body.classList.add("dark-theme");
});

// Set the light theme as default on page load
document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.add("light-theme");
  document.body.classList.remove("dark-theme", "creative-theme");
});

// Helper function to generate random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
