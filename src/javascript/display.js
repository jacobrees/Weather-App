import { setGetWeatherListeners, setSearchBtn, setGoBackBtn, setToggleUnitsBtn } from './eventListeners.js'; //eslint-disable-line
import { toggleLoadingScreen, testAllImgsLoaded, waitForImageToLoad } from './loadingScreen.js';

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

    waitForImageToLoad(countryImg).then(() => {
      testAllImgsLoaded(locations.length);
    });

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
    toggleLoadingScreen();
  }
};

const degreeToDirection = (num) => {
  const val = Math.floor((num / 22.5) + 0.5);
  const arr = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return arr[(val % 16)];
};

const createWeatherPageElements = (weather) => {
  const toggleUnitsBtn = document.createElement('button');
  toggleUnitsBtn.setAttribute('type', 'button');
  toggleUnitsBtn.classList.add('toggle-units-btn');
  toggleUnitsBtn.textContent = 'Toggle °F/°C';
  const weatherContentDiv = document.createElement('div');
  weatherContentDiv.classList.add('weather-content');
  const weatherMainContainer = document.createElement('div');
  weatherMainContainer.classList.add('weather-main-container');
  weatherContentDiv.appendChild(weatherMainContainer);
  const weatherCityName = document.createElement('h2');
  weatherCityName.classList.add('weather-city-name');
  weatherCityName.textContent = `${weather.name}`;
  weatherMainContainer.appendChild(weatherCityName);
  const weatherTemperature = document.createElement('h2');
  weatherTemperature.classList.add('weather-temperature');
  weatherTemperature.textContent = `${Number(weather.main.temp)}°F`;
  weatherMainContainer.appendChild(weatherTemperature);
  const weatherForecast = document.createElement('h2');
  weatherForecast.classList.add('weather-forecast');
  weatherForecast.textContent = `${weather.weather[0].description}`;
  weatherMainContainer.appendChild(weatherForecast);
  const weatherImg = document.createElement('img');
  weatherImg.classList.add('weather-svg');
  weatherImg.src = `./assets/imgs/${weather.weather[0].icon}.svg`;

  waitForImageToLoad(weatherImg).then(() => {
    testAllImgsLoaded(1);
  });

  weatherImg.alt = 'Weather-Icon';
  weatherMainContainer.appendChild(weatherImg);
  const weatherWindTitle = document.createElement('h2');
  weatherWindTitle.classList.add('weather-winds-title');
  weatherWindTitle.textContent = 'Wind';
  weatherMainContainer.appendChild(weatherWindTitle);
  const weatherWindsSpeed = document.createElement('h2');
  weatherWindsSpeed.classList.add('weather-winds-speed');
  weatherWindsSpeed.textContent = `Speed: ${weather.wind.speed} mph`;
  weatherMainContainer.appendChild(weatherWindsSpeed);
  const weatherWindsDirection = document.createElement('h2');
  weatherWindsDirection.classList.add('weather-winds-direction');
  weatherWindsDirection.textContent = `Direction: ${degreeToDirection(weather.wind.deg)}`;
  const weatherDirectionSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  weatherDirectionSvg.classList.add('wind-direction-svg');
  weatherDirectionSvg.setAttribute('viewBox', '0 0 24 24');
  weatherDirectionSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  weatherDirectionSvg.setAttribute('style', `transform: rotate(${weather.wind.deg}deg)`);
  const weatherDirectionSvgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  weatherDirectionSvgPath.setAttribute('d', 'M7 11h-6l11-11 11 11h-6v13h-10z');
  weatherDirectionSvg.appendChild(weatherDirectionSvgPath);
  weatherWindsDirection.appendChild(weatherDirectionSvg);
  weatherMainContainer.appendChild(weatherWindsDirection);
  const humidityCloudinessDiv = document.createElement('div');
  humidityCloudinessDiv.classList.add('humidity-cloudiness-container');
  weatherMainContainer.appendChild(humidityCloudinessDiv);
  const humidityDiv = document.createElement('div');
  humidityDiv.classList.add('humidity-container');
  humidityCloudinessDiv.appendChild(humidityDiv);
  const humidityTitle = document.createElement('h2');
  humidityTitle.classList.add('humidity-cloudiness-title');
  humidityTitle.textContent = 'Humidity';
  humidityDiv.appendChild(humidityTitle);
  const humidityResult = document.createElement('h2');
  humidityResult.classList.add('humidity', 'humidity-cloudiness-result');
  humidityResult.textContent = `${weather.main.humidity}%`;
  humidityDiv.appendChild(humidityResult);
  const cloudinessDiv = document.createElement('div');
  cloudinessDiv.classList.add('cloudiness-container');
  humidityCloudinessDiv.appendChild(cloudinessDiv);
  const cloudinessTitle = document.createElement('h2');
  cloudinessTitle.classList.add('humidity-cloudiness-title');
  cloudinessTitle.textContent = 'Cloudiness';
  cloudinessDiv.appendChild(cloudinessTitle);
  const cloudinessResult = document.createElement('h2');
  cloudinessResult.classList.add('cloudiness', 'humidity-cloudiness-result');
  cloudinessResult.textContent = `${weather.clouds.all}%`;
  cloudinessDiv.appendChild(cloudinessResult);

  return [toggleUnitsBtn, weatherContentDiv];
};

const loadWeatherPage = (weather) => {
  clearPage();
  const weatherPageElements = createWeatherPageElements(weather);
  weatherPageElements.forEach((weatherPageElement) => {
    contentContainer.appendChild(weatherPageElement);
  });
  setToggleUnitsBtn();
};

export { loadWeatherPage, loadSearchPage, loadHomePage };