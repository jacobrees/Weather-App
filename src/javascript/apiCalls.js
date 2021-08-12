import { loadWeatherPage, loadSearchPage } from './display.js'; //eslint-disable-line
import { resetUnits } from './toggleUnits.js';

const apiKey = '575a5a5a77f08cf33080bb747278040f';

const getWeather = async (e) => {
  const lat = e.currentTarget.childNodes[5].childNodes[1].textContent.slice(10);
  const lon = e.currentTarget.childNodes[7].childNodes[1].textContent.slice(11);
  const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`, {
    mode: 'cors',
  });
  const weather = await response.json();
  loadWeatherPage(weather);
  resetUnits();
};

const getLocations = async (locationInput) => {
  const location = encodeURIComponent(locationInput.trim());
  const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${apiKey}`, {
    mode: 'cors',
  });
  const locations = await response.json();
  loadSearchPage(locations);
};

export { getWeather, getLocations };