// NOTE:
// Run project with Netlify Dev (not Live Server):
// npx netlify dev

// Requires .env file with:
// OPENWEATHER_API_KEY

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
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.list;
  let forecastElement = document.querySelector('#forecast');

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastItem, index) {
    if (index % 8 === 0 && index < 40) {
      forecastHTML += `
        <div class="col">
          <h3 class="text-center">${formatDay(forecastItem.dt)}</h3>
          <img
            src="https://openweathermap.org/img/wn/${forecastItem.weather[0].icon}.png"
            alt="${forecastItem.weather[0].description}"
            width="47"
          />
          <div>
            <span class="high">${Math.round(forecastItem.main.temp_max)}</span>°
            <span class="low">${Math.round(forecastItem.main.temp_min)}</span>°
          </div>
        </div>`;
    }
  });

  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  axios
    .get(
      `/.netlify/functions/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}`
    )
    .then(displayForecast)
    .catch(() => {
      console.warn('Forecast failed');
    });
}

function displayTemperature(response) {
  let iconElement = document.querySelector('#weather-icon');
  let temperatureElement = document.querySelector('#temperature');
  let cityElement = document.querySelector('#city');
  let dateElement = document.querySelector('#date');
  let descriptionElement = document.querySelector('#description');
  let precipitationElement = document.querySelector('#precipitation');
  let humidityElement = document.querySelector('#humidity');
  let windElement = document.querySelector('#wind');

  let iconCode = response.data.weather[0].icon;

  iconElement.innerHTML = `
  <img
    src="https://openweathermap.org/img/wn/${iconCode}@4x.png"
    alt="${response.data.weather[0].description}"
    width="80"
  />
`;

  celsiusTemperature = response.data.main.temp;

  temperatureElement.textContent = Math.round(response.data.main.temp);
  cityElement.textContent = response.data.name;
  dateElement.textContent = formatDate(response.data.dt * 1000);
  descriptionElement.textContent = response.data.weather[0].description;
  precipitationElement.textContent = response.data.clouds.all;
  humidityElement.textContent = response.data.main.humidity;
  windElement.textContent = Math.round(response.data.wind.speed);

  getForecast(response.data.coord);
}

function updateWeatherDataWithGeolocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  axios
    .get(`/.netlify/functions/weather?lat=${latitude}&lon=${longitude}`)
    .then(displayTemperature);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector('#search-input');
  let newCity = searchInputElement.value.trim();

  if (newCity) {
    city = newCity;
    axios
      .get(`/.netlify/functions/weather?city=${encodeURIComponent(city)}`)
      .then(displayTemperature);
    document.querySelector('#city').textContent = city;
  }

  searchInputElement.value = '';
}

let city = 'Stockholm';

axios
  .get(`/.netlify/functions/weather?city=${encodeURIComponent(city)}`)
  .then(displayTemperature);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector('#temperature');
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.textContent = Math.round(fahrenheitTemperature);
  celsiusLinkElement.classList.remove('active');
  fahrenheitLinkElement.classList.add('active');
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector('#temperature');
  temperatureElement.textContent = Math.round(celsiusTemperature);
  fahrenheitLinkElement.classList.remove('active');
  celsiusLinkElement.classList.add('active');
}

let celsiusLinkElement = document.querySelector('#celsius-link');
let fahrenheitLinkElement = document.querySelector('#fahrenheit-link');

let formElement = document.querySelector('.search-bar');
formElement.addEventListener('submit', search);

fahrenheitLinkElement.addEventListener('click', displayFahrenheitTemperature);
celsiusLinkElement.addEventListener('click', displayCelsiusTemperature);

// Get references to the required elements for geolocation
let iconElement = document.querySelector('#weather-icon');
let temperatureElement = document.querySelector('#temperature');
let cityElement = document.querySelector('#city');
let dateElement = document.querySelector('#date');
let descriptionElement = document.querySelector('#description');
let precipitationElement = document.querySelector('#precipitation');
let humidityElement = document.querySelector('#humidity');
let windElement = document.querySelector('#wind');
let searchInputElement = document.querySelector('#search-input');

// Default geolocation data on page load
function getDefaultGeolocationData() {
  navigator.geolocation.getCurrentPosition(function (position) {
    updateWeatherDataWithGeolocation(position);

    // Update textContent elements
    iconElement.innerHTML = '';
    temperatureElement.textContent = '....';
    precipitationElement.textContent = 'Loading...';
    humidityElement.textContent = 'Loading...';
    windElement.textContent = 'Loading...';

    // Set active link and clear search input
    celsiusLinkElement.classList.add('active');
    fahrenheitLinkElement.classList.remove('active');
    searchInputElement.value = '';
  });
}

formElement.addEventListener('submit', search);
fahrenheitLinkElement.addEventListener('click', displayFahrenheitTemperature);
celsiusLinkElement.addEventListener('click', displayCelsiusTemperature);

// Get default geolocation data on page load
getDefaultGeolocationData();

// Theme switcher

// Light Theme Button
const lightThemeButton = document.querySelector('#light-theme-button');
lightThemeButton.addEventListener('click', function () {
  // Remove other theme classes
  document.body.classList.remove('creative-theme', 'dark-theme');
  // Add light theme class
  document.body.classList.add('light-theme');
});

// Creative Theme Button
const creativeThemeButton = document.querySelector('#creative-theme-button');
creativeThemeButton.addEventListener('click', function () {
  // Remove other theme classes
  document.body.classList.remove('light-theme', 'dark-theme');
  // Generate random colors for creative theme
  const randomColor1 = getRandomColor();
  const randomColor2 = getRandomColor();
  // Apply creative theme styles dynamically
  document.body.style.setProperty('--creative-theme-color1', randomColor1);
  document.body.style.setProperty('--creative-theme-color2', randomColor2);
  // Add creative theme class
  document.body.classList.add('creative-theme');
});

// Dark Theme Button
const darkThemeButton = document.querySelector('#dark-theme-button');
darkThemeButton.addEventListener('click', function () {
  // Remove other theme classes
  document.body.classList.remove('light-theme', 'creative-theme');
  // Add dark theme class
  document.body.classList.add('dark-theme');
});

// Set the light theme as default on page load
document.addEventListener('DOMContentLoaded', function () {
  document.body.classList.add('light-theme');
  document.body.classList.remove('dark-theme', 'creative-theme');
});

// Helper function to generate random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
