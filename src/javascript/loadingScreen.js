const toggleLoadingScreen = () => {
  const loadingScreen = document.querySelector('.loading-screen');

  loadingScreen.classList.toggle('hide-loading-screen');
};

let imgsLoadCount = 0;

const testAllImgsLoaded = (totalImgs) => {
  imgsLoadCount += 1;
  if (imgsLoadCount === totalImgs) {
    toggleLoadingScreen();
    imgsLoadCount = 0;
  }
};

const waitForImageToLoad = (imageElement) => new Promise((resolve) => {
  imageElement.onload = resolve;
  imageElement.onerror = resolve;
});

export { toggleLoadingScreen, testAllImgsLoaded, waitForImageToLoad };