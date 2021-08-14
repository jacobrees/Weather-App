import { setGetWeatherListeners, setSearchBtn, setGoBackBtn, setToggleUnitsBtn } from './eventListeners.js'; //eslint-disable-line
import toggleLoadingScreen from './loadingScreen.js';

const contentContainer = document.querySelector('.content');

const clearPage = () => {
  while (contentContainer.firstChild) {
    contentContainer.removeChild(contentContainer.firstChild);
  }
};

const createHomePageElement = () => {
  const searchContentDiv = document.createElement('div');
  searchContentDiv.classList.add('search-content');
  const searchTitle = document.createElement('h2');
  searchTitle.textContent = 'Search By Location';
  searchTitle.classList.add('search-title');
  searchContentDiv.appendChild(searchTitle);
  const form = document.createElement('form');
  form.classList.add('search-form');
  form.setAttribute('action', '#');
  searchContentDiv.appendChild(form);
  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', 'Search by city/town');
  input.classList.add('search-box');
  form.appendChild(input);
  const submitBtn = document.createElement('button');
  submitBtn.setAttribute('type', 'button');
  submitBtn.textContent = 'Search';
  submitBtn.classList.add('search-btn');
  form.appendChild(submitBtn);

  return searchContentDiv;
};

const loadHomePage = () => {
  clearPage();
  const homePage = createHomePageElement();
  contentContainer.appendChild(homePage);
  setSearchBtn();
};

const countryNames = require('../assets/countryNames.json');

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
    contentContainer.innerHTML = html;
    setGetWeatherListeners();
  } else {
    html += '<h2 class="no-results-found-title">No Results Found</h2><button class="go-back-btn" type="button">Go Back</button>';

    contentContainer.innerHTML = html;
    setGoBackBtn();
  }
  toggleLoadingScreen();
};

const degreeToDirection = (num) => {
  const val = Math.floor((num / 22.5) + 0.5);
  const arr = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return arr[(val % 16)];
};

const loadWeatherPage = (weather) => {
  let html = '';
  html += `<button class="toggle-units-btn" type="button">Toggle °F/°C</button>
            <div class="weather-content">
                <div class="weather-main-container">
                    <h2 class="weather-city-name">${weather.name}</h2>     
                    <h2 class="weather-temperature">${Number(weather.main.temp)}°F</h2>            
                    <h2 class="weather-forecast">${weather.weather[0].description}</h2>
                    <img class="weather-svg" src="./assets/imgs/${weather.weather[0].icon}.svg" alt="Weather-Icon">
                    <h2 class="weather-winds-title">Wind</h2>
                    <h2 class="weather-winds-speed">Speed: ${weather.wind.speed} mph</h2>
                    <h2 class="weather-winds-direction">
                    Direction: ${degreeToDirection(weather.wind.deg)}
                    <svg class="wind-direction-svg" style="transform: rotate(${weather.wind.deg}deg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 11h-6l11-11 11 11h-6v13h-10z"/></svg>
                    </h2>
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
                </div>
            </div>`;
  contentContainer.innerHTML = html;
  setToggleUnitsBtn();
  toggleLoadingScreen();
};

export { loadWeatherPage, loadSearchPage, loadHomePage };