let units;

const resetUnits = () => {
  units = 'imperial';
};

const fToC = (f) => {
  const c = (5 / 9) * (f - 32);
  return Number(c.toFixed(2));
};

let defaultValue;

const setDefaultValue = (e) => {
  defaultValue = e.currentTarget
    .parentElement.childNodes[1].childNodes[0].childNodes[1].textContent;
};

const toggleUnits = (e) => {
  const tempDataOnScreen = e.currentTarget.parentElement.childNodes[1].childNodes[0].childNodes[1];
  const tempData = parseFloat(tempDataOnScreen.textContent.slice(0, -2));
  if (units === 'imperial') {
    units = 'metric';
    setDefaultValue(e);
    tempDataOnScreen.textContent = `${fToC(tempData)}°C`;
  } else {
    units = 'imperial';
    tempDataOnScreen.textContent = defaultValue;
  }
};

export { toggleUnits, resetUnits };