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
    `http://openweathermap.org/img/wn/${iconCode}@4x.png`
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
let city = "New York";
let units = "units=metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&${units}`;

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
