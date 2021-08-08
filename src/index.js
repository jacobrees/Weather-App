import './scss/styles.scss';

const setSearchBtn = () => {
  const searchBtn = document.querySelector('.search-btn');

  searchBtn.addEventListener('click', (e) => {
    const searchBox = document.querySelector('.search-box');
    e.preventDefault();
    console.log(searchBox.value);
  });
};

const contentContainer = document.querySelector('.content');

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
