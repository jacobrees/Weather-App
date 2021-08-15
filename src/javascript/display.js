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

const createSearchResultsElement = (locations) => {
  const searchResultsContentDiv = document.createElement('div');
  searchResultsContentDiv.classList.add('search-results-content');
  locations.forEach((location) => {
    const countryResultDiv = document.createElement('div');
    countryResultDiv.classList.add('country-result');
    searchResultsContentDiv.appendChild(countryResultDiv);
    const countryNameDiv = document.createElement('div');
    countryNameDiv.classList.add('country-name-container');
    countryResultDiv.appendChild(countryNameDiv);
    const countryImg = document.createElement('img');
    countryImg.classList.add('search-country-flag');
    countryImg.src = `https://flagcdn.com/${location.country.toLowerCase()}.svg`;
    countryImg.alt = `${countryNames[location.country.toLowerCase()]}`;
    countryNameDiv.appendChild(countryImg);
    const countryName = document.createElement('h3');
    countryName.classList.add('country-name');
    countryName.textContent = countryNames[location.country.toLowerCase()];
    countryNameDiv.appendChild(countryName);
    const cityNameDiv = document.createElement('div');
    cityNameDiv.classList.add('city-name-container');
    countryResultDiv.appendChild(cityNameDiv);
    const cityName = document.createElement('h4');
    cityName.textContent = `City/Town: ${location.name}`;
    cityNameDiv.appendChild(cityName);
    const latitudeDiv = document.createElement('div');
    latitudeDiv.classList.add('latitude-container');
    countryResultDiv.appendChild(latitudeDiv);
    const latitude = document.createElement('h4');
    latitude.textContent = `Latitude: ${location.lat}`;
    latitudeDiv.appendChild(latitude);
    const longitudeDiv = document.createElement('div');
    longitudeDiv.classList.add('longitude-container');
    countryResultDiv.appendChild(longitudeDiv);
    const longitude = document.createElement('h4');
    longitude.textContent = `longitude: ${location.lon}`;
    longitudeDiv.appendChild(longitude);
  });
  return searchResultsContentDiv;
};

const createGoBackElements = () => {
  const noResultsTitle = document.createElement('h2');
  noResultsTitle.classList.add('no-results-found-title');
  noResultsTitle.textContent = 'No Results Found';
  const backBtn = document.createElement('button');
  backBtn.classList.add('go-back-btn');
  backBtn.setAttribute('type', 'button');
  backBtn.textContent = 'Go Back';

  return [noResultsTitle, backBtn];
};

const loadSearchPage = (locations) => {
  clearPage();
  if (locations.length > 0) {
    const searchResults = createSearchResultsElement(locations);
    contentContainer.appendChild(searchResults);
    setGetWeatherListeners();
  } else {
    const goBackElements = createGoBackElements();
    goBackElements.forEach((goBackElement) => {
      contentContainer.appendChild(goBackElement);
    });
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