const apiKey = '575a5a5a77f08cf33080bb747278040f';

const getLocations = async (locationInput) => {
  const location = encodeURIComponent(locationInput.trim());
  const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${apiKey}`, {
    mode: 'cors',
  });
  const locations = await response.json();
  console.log(locations);
  return locations;
};

export default getLocations;