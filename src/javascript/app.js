const countryNames = require('../assets/countryNames.json');

const contentContainer = document.querySelector('.content');

const loadSearchPage = (locations) => {
  let html = '<div class="search-results-content">';
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
};

const apiKey = '575a5a5a77f08cf33080bb747278040f';

const getLocations = async (locationInput) => {
  const location = encodeURIComponent(locationInput.trim());
  const response1 = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${apiKey}`, {
    mode: 'cors',
  });
  const locations = await response1.json();
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