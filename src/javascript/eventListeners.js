import { getWeather, getLocations } from './apiCalls.js'; //eslint-disable-line
import { loadHomePage } from './display.js'; //eslint-disable-line
import { toggleUnits } from './toggleUnits.js';

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

const setHomePageBtn = () => {
  const homeBtn = document.querySelector('.home-btn');

  homeBtn.addEventListener('click', () => {
    loadHomePage();
  });
};

const setGoBackBtn = () => {
  const backBtn = document.querySelector('.go-back-btn');
  backBtn.addEventListener('click', () => {
    loadHomePage();
  });
};

const setToggleUnitsBtn = () => {
  const toggleUnitsBtn = document.querySelector('.toggle-units-btn');
  toggleUnitsBtn.addEventListener('click', (e) => {
    toggleUnits(e);
  });
};

export {
  setGetWeatherListeners, setSearchBtn, setHomePageBtn, setGoBackBtn, setToggleUnitsBtn,
};