import { getWeather, getLocations } from './apiCalls.js'; //eslint-disable-line

const setGetWeatherListeners = () => {
  const allLocations = document.querySelectorAll('.country-result');
  allLocations.forEach((location) => {
    location.addEventListener('click', (e) => {
      getWeather(e);
    });
  });
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

export { setGetWeatherListeners, setSearchBtn };