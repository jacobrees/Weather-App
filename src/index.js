import './scss/styles.scss';

const contentContainer = document.querySelector('.content');

const setSearchBtn = () => {
  const searchBtn = document.querySelector('.search-btn');
  const searchBox = document.querySelector('.search-box');

  searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(searchBox.value);
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
    <div class="country-result">
    <div class="country-name-container">
        <img class="search-country-flag" src="https://flagcdn.com/sa.svg" alt="South Africa">
        <h3 class="country-name">South Africa</h3>
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
  });
  searchBox.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
      searchBtn.click();
    }
  });
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

const homeBtn = document.querySelector('.home-btn');

homeBtn.addEventListener('click', () => {
  loadHomePage();
});

setSearchBtn();
