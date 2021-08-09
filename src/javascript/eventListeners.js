import getLocations from './apiCalls.js';
import { loadSearchPage, loadHomePage } from './pages.js'; //eslint-disable-line

const setSearchBtn = () => {
  const searchBtn = document.querySelector('.search-btn');
  const searchBox = document.querySelector('.search-box');

  searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    getLocations(searchBox.value);
    loadSearchPage();
  });

  searchBox.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      searchBtn.click();
    }
  });
};

const homeBtn = document.querySelector('.home-btn');

homeBtn.addEventListener('click', () => {
  loadHomePage();
});

export default setSearchBtn;