import { setSearchBtn, setHomePageBtn } from './eventListeners.js';
import { toggleLoadingScreen } from './loadingScreen.js';

const start = () => {
  window.addEventListener('load', () => {
    toggleLoadingScreen();
  });
  setSearchBtn();
  setHomePageBtn();
};

export default start;