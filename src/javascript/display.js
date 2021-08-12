import { setGetWeatherListeners, setSearchBtn } from './eventListeners.js'; //eslint-disable-line

const countryNames = require('../assets/countryNames.json');

const contentContainer = document.querySelector('.content');

const degreeToDirection = (degree) => { //eslint-disable-line
  if (degree < 45 || degree >= 315) {
    return 'North';
  } if (degree < 135) {
    return 'East';
  } if (degree < 225) {
    return 'South';
  } if (degree < 315) {
    return 'West';
  }
};

const loadWeatherPage = (weather) => {
  let html = '';
  html += `<div class="weather-content">
    <div class="weather-main-container">
        <h2 class="weather-city-name">${weather.name}</h2>     
        <h2 class="weather-temperature">${weather.main.temp}°F</h2>            
        <h2 class="weather-forecast">${weather.weather[0].description}</h2>
        <img class="weather-svg" src="./assets/imgs/${weather.weather[0].icon}.svg" alt="Weather-Icon">
        <h2 class="weather-winds-title">Wind</h2>
        <h2 class="weather-winds-speed">Speed: ${weather.wind.speed} mph</h2>
        <h2 class="weather-winds-direction">Direction: ${degreeToDirection(weather.wind.deg)}</h2>
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

  setGetWeatherListeners();
};

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

export { loadWeatherPage, loadSearchPage, loadHomePage };