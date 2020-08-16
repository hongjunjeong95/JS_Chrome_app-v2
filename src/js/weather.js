const COORDS = 'coords';
const API_KEY = 'eebd85a52b285ab1ee6f6800ba26bed9';

const weather = document.getElementById('jsWeather');

const saveItem = (coordsObj) => {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
};

const handleGeoSuccess = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveItem(latitude, longitude);
};

const handleGeoError = () => {
  console.log('Cant access geo loacation');
};

const askCoords = () => {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
};

const setCoords = (lat, lon) => {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const todayTemp = json.main.temp;
      const todayWeather = json.weather[0].main;
      const currentPlace = json.name;
      weather.innerHTML = `${todayTemp}°C @ ${todayWeather} @ ${currentPlace}`;
    });
};

function init() {
  const loadedCoords = localStorage.getItem(COORDS);

  if (loadedCoords === null) {
    askCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);

    setCoords(parsedCoords.latitude, parsedCoords.longitude);
  }
}

init();
