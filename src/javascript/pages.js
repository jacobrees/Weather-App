import setSearchBtn from './eventListeners.js'; //eslint-disable-line

const contentContainer = document.querySelector('.content');

const loadSearchPage = () => {
  contentContainer.innerHTML = ` <div class="search-results-content">
    <div class="country-result">
        <div class="country-name-container">
            <img class="search-country-flag" src="https://flagcdn.com/sh.svg" alt="Saint Helena, Ascension and Tristan da Cunha">
            <h3 class="country-name">Saint Helena, Ascension and Tristan da Cunha</h3>
        </div>
        <div class="city-name-container">
            <h4>City/Town: Swansea</h4>
        </div>
        <div class="latitude-container">
            <h4>Latitude: S 54° 16' 52''</h4>
        </div>
        <div class="longitude-container">
            <h4>Longitude: W 36° 30' 33''</h4>
        </div>
    </div>
    </div>`;
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

export { loadSearchPage, loadHomePage };