const toggleLoadingScreen = () => {
  const loadingScreen = document.querySelector('.loading-screen');

  loadingScreen.classList.toggle('hide-loading-screen');
};

export default toggleLoadingScreen;