/* eslint-disable no-unused-vars */

function getCurrentTemperature(latitude, longitude) {
  let apiKey = "ff1d9ea9376b5c27a82e04fc2b2abdbb";
  let units = "units=metric";
  let apiLink = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&${units}`;

  axios
    .get(apiLink)
    .then(function (response) {
      let temperature = Math.round(response.data.main.temp);
      let city = response.data.name;
      let h1Element = document.querySelector("#search-city-value");
      h1Element.innerHTML = `${city}`;
      console.log(`Current temperature in ${city}: ${temperature}°C`);
      let temperatureElement = document.querySelector(".double-focus");
      temperatureElement.innerHTML = `${temperature}`;
    })
    .catch(function (error) {
      console.log("Error fetching weather data:", error);
    });
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  getCurrentTemperature(latitude, longitude);
}

navigator.geolocation.getCurrentPosition(showPosition);

function getWeatherData(city) {
  let apiKey = "ff1d9ea9376b5c27a82e04fc2b2abdbb";
  let units = "units=metric";
  let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&${units}`;

  axios
    .get(apiLink)
    .then(function (response) {
      showTemperatureAndCity(response);
    })
    .catch(function (error) {
      console.log(error);
      alert("Error retrieving weather data.");
    });
}

function showTemperatureAndCity(response) {
  let temperature = Math.round(response.data.main.temp);
  let openWeatherCity = response.data.name;
  temperatureElement.innerHTML = `${temperature}`;
  searchCityValue.innerHTML = `${openWeatherCity}`;
  console.log(openWeatherCity);

  let celsiusTemperature = `${temperature}`;
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  let tempContainer = document.querySelector("#temp-container");
  let doubleFocus = document.querySelector(".double-focus");
  let degreesC = document.querySelector(".degrees-c");
  let degreesF = document.querySelector(".degrees-f");

  let activeUnit = "C"; // Variable to track the active temperature unit
  doubleFocus.innerHTML = `${celsiusTemperature}`;
  degreesC.classList.add("active");

  degreesC.addEventListener("click", function (event) {
    event.preventDefault();
    if (activeUnit !== "C") {
      doubleFocus.innerHTML = `${celsiusTemperature}`;
      degreesC.classList.add("active");
      degreesF.classList.remove("active");
      activeUnit = "C";
    }
  });

  degreesF.addEventListener("click", function (event) {
    event.preventDefault();
    if (activeUnit !== "F") {
      doubleFocus.innerHTML = `${fahrenheitTemperature}`;
      degreesF.classList.add("active");
      degreesC.classList.remove("active");
      activeUnit = "F";
    }
  });

  // Reset active unit and classes to Celsius when a new city is searched
  activeUnit = "C";
  degreesC.classList.add("active");
  degreesF.classList.remove("active");
}

let form = document.querySelector("#search-city-form");
let placeholder = document.querySelector("#search-city-input");
/* let searchCityValue = document.querySelector("#search-city-value");
 */
let searchCityValue = document.querySelector(".first-child #search-city-value");

let temperatureElement = document.querySelector(".double-focus");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let searchInputValue = placeholder.value;

  if (searchInputValue === "") {
    placeholder.value = "";
    placeholder.placeholder = "Enter a city";
    alert("Please add a city");
  } else {
    let displayedValue = searchInputValue;
    searchCityValue.innerHTML = displayedValue;
    placeholder.placeholder = searchInputValue;
    getWeatherData(searchInputValue);
    searchCityValue.innerHTML = searchInputValue;
    console.log(searchInputValue);
  }
});

let now = new Date();
let date = now.getDate();
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekday = weekdays[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let year = now.getFullYear();
let hour = String(now.getHours()).padStart(2, "0"); // Add leading zero if needed;
let minute = String(now.getMinutes()).padStart(2, "0"); // Add leading zero if needed;;

let actualDate = `${weekday} ${date} ${month} ${year} ${hour}:${minute}`;

let actualDayTimeInput = document.querySelector("#date-info-first");
let spanDayTimeData = document.getElementById("date-info-first");
spanDayTimeData.innerHTML = `${weekday} ${hour}:${minute}`;
let actualDateInput = document.querySelector("#date-info-second");
let spanData = document.getElementById("date-info-second");
spanData.innerHTML = `${date} ${month} ${year}`;
