const city = document.querySelector('.js-city');
const cityValue = document.querySelector('.cityInput');
const temp = document.querySelector('.temp');
const weather = document.querySelector('.weather');
const dateString = document.querySelector('.dates');
const hum = document.querySelector('.js-humidity');
const wind = document.querySelector('.js-wind');

const cloudy = 'linear-gradient(151deg, rgba(2, 0, 36, 1) 0%, rgba(3, 2, 52, 1) 8%, rgba(9, 9, 121, 1) 20%, rgba(0, 212, 255, 1) 100%)';
const clear = 'linear-gradient(0deg, rgba(34, 193, 195, 1) 0%, rgba(253, 187, 45, 1) 100%)';
const rain = 'linear - gradient(to bottom, #c8c8c8, #b0b0b0)'
const mist = 'linear-gradient(to bottom, #f2f2f2, #dcdcdc)';
const drizzle = 'linear-gradient(to bottom, #d9d9d9, #c8c8c8)';
const snow = 'linear - gradient(to bottom, #f0f2f2, #d9d9d9)';

cityValue.addEventListener('keydown', (event) => {
  const cityInput = cityValue.value;
  if (event.key === 'Enter') {
    getWeather(cityInput);
    cityValue.value = '';
  }
})


async function getWeather(cityInput) {
  const loadMessage = document.querySelector('.loader')
  loadMessage.style.display = 'flex'
  try {
    const apiKey = "f3e87e5a1e354f9d4560f284204a49bb";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const response = await fetch(apiURL + cityInput + `&appid=${apiKey}`);
const data = await response.json();

const date = new Date(data.dt * 1000);
const formattedDateTime = date.toDateString() + ' ' + date.toLocaleTimeString();

city.innerHTML = data.name + ' ' + data.sys.country;
temp.innerHTML = Math.round(data.main.temp) + '°C';
hum.innerHTML = Math.round(data.main.humidity) + '%';
wind.innerHTML = data.wind.speed + 'km/h'
weather.innerHTML = data.weather[0].main;
dateString.textContent = formattedDateTime;

let weatherCondition = data.weather[0].main;
switch (weatherCondition) {
  case 'Clouds':
    document.querySelector('.image').src = 'images/cloudy.png';
    document.body.style.background = cloudy;
    break;
  case 'Clear':
    document.querySelector('.image').src = 'images/clear.png';
    document.body.style.background = clear;
    break;
  case 'Rain':
    document.querySelector('.image').src = 'images/rain.png';
    document.body.style.background = rain;
    break;
  case 'Drizzle':
    document.querySelector('.image').src = 'images/drizzle.png';
    document.body.style.background = drizzle;
    break;
  case 'Mist':
    document.querySelector('.image').src = 'images/mist.png';
    document.body.style.background = mist;
    break;
  case 'Snow':
    document.querySelector('.image').src = 'images/snow.png';
    document.body.style.background = snow;
    break;

  default:
    // Tab to edit
}
  } catch (e) {
    throw e
  } finally {
    loadMessage.style.display = 'none'
  }
}
