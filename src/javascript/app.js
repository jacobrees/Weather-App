const countryNames = require('../assets/countryNames.json');

const contentContainer = document.querySelector('.content');

const apiKey = '575a5a5a77f08cf33080bb747278040f';

const loadWeatherPage = (weather) => {
  let html = '';
  html += `<div class="weather-content">
  <div class="weather-main-container">
      <h2 class="weather-city-name">${weather.name}</h2>     
      <h2 class="weather-temperature">${weather.main.temp}°F</h2>            
      <h2 class="weather-forecast">${weather.weather[0].description}</h2>
      <svg class="weather-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
              d="M15 8c-3.004 0-5.45 2.268-5.609 5.123-1.928.333-3.391 1.954-3.391 3.905 0 2.193 1.848 3.972 4.125 3.972h9.75c2.277 0 4.125-1.779 4.125-3.972 0-1.951-1.463-3.572-3.391-3.905-.159-2.855-2.605-5.123-5.609-5.123zm-10.899 7.998c-2.266-.014-4.101-1.785-4.101-3.97 0-1.951 1.463-3.572 3.391-3.905.159-2.855 2.605-5.123 5.609-5.123 2.235 0 4.158 1.258 5.063 3.078-.702.084-1.371.261-2.002.52-.535-.886-1.464-1.598-3.061-1.598-3.872 0-3.828 4.025-3.701 4.822-1.064.055-3.299.265-3.299 2.206 0 1.087.953 1.972 2.125 1.972h.734c-.368.608-.63 1.28-.758 1.998z" />
      </svg>
      <h2 class="weather-winds-title">Wind</h2>
      <h2 class="weather-winds-speed">Speed: ${weather.wind.speed} mph</h2>
      <h2 class="weather-winds-direction">Direction: ${weather.wind.deg}°</h2>
      <div class="humidity-cloudiness-container">
          <div class="humidity-container">
              <h2 class="humidity-cloudiness-title">Humidity</h2>
              <h2 class="humidity humidity-cloudiness-result">${weather.main.humidity}%</h2>
          </div>
          <div class="cloudiness-container">
              <h2 class="humidity-cloudiness-title">Cloudiness</h2>
              <h2 class="cloudiness humidity-cloudiness-result">${weather.clouds.all}%</h2>
          </div>
      </div>
  </div>`;
  contentContainer.innerHTML = html;
};

const getWeather = async (e) => {
  const lat = e.currentTarget.childNodes[5].childNodes[1].textContent.slice(10);
  const lon = e.currentTarget.childNodes[7].childNodes[1].textContent.slice(11);
  const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`, {
    mode: 'cors',
  });
  const weather = await response.json();
  loadWeatherPage(weather);
};

const loadSearchPage = (locations) => {
  let html = '';
  if (locations.length > 0) {
    html += '<div class="search-results-content">';
    locations.forEach((location) => {
      html += ` 
      <div class="country-result">
          <div class="country-name-container">
              <img class="search-country-flag" src="https://flagcdn.com/${location.country.toLowerCase()}.svg" alt="${countryNames[location.country.toLowerCase()]}">
              <h3 class="country-name">${countryNames[location.country.toLowerCase()]}</h3>
          </div>
          <div class="city-name-container">
              <h4>City/Town: ${location.name}</h4>
          </div>
          <div class="latitude-container">
              <h4>Latitude: ${location.lat}</h4>
          </div>
          <div class="longitude-container">
              <h4>Longitude: ${location.lon}</h4>
          </div>
      </div>`;
    });
    html += '</div>';
  } else {
    html += '<h2 class="no-results-found-title">No Results Found</h2>';
  }

  contentContainer.innerHTML = html;

  const allLocations = document.querySelectorAll('.country-result');
  allLocations.forEach((location) => {
    location.addEventListener('click', (e) => {
      getWeather(e);
    });
  });
};

const getLocations = async (locationInput) => {
  const location = encodeURIComponent(locationInput.trim());
  const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${apiKey}`, {
    mode: 'cors',
  });
  const locations = await response.json();
  loadSearchPage(locations);
};

const setSearchBtn = () => {
  const searchBtn = document.querySelector('.search-btn');
  const searchBox = document.querySelector('.search-box');

  searchBtn.addEventListener('click', (e) => {
    e.preventDefault();

    getLocations(searchBox.value);
  });

  searchBox.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      searchBtn.click();
    }
  });
};

const homeBtn = document.querySelector('.home-btn');

const loadHomePage = () => {
  contentContainer.innerHTML = `<div class="search-content">
              <h2 class="search-title">Search By Location</h2>
              <form class="search-form" action="#"><input class="search-box" type="text"
                      placeholder="Search by city/town">
                  <button class="search-btn" type="button">Search</button>
              </form>
          </div>`;
  setSearchBtn();
};
homeBtn.addEventListener('click', () => {
  loadHomePage();
});

export { loadSearchPage, setSearchBtn };