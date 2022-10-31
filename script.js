let now = new Date();

//current day
function formatDay(now) {
  let dayInd = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayInd];
  return `${day}`;
}
let currentDay = document.querySelector("#currentDay");
currentDay.innerHTML = formatDay(now);

//current date
let date = now.getDate();
let year = now.getYear();
let currentYear = year + 1900;
let month = now.getMonth();
let currentMonth = month + 1;
let currentDate = document.querySelector("#currentDate");
currentDate.innerHTML = `${currentYear}-${currentMonth}-${date}`;

//current time
function formatTime(now) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
let currentTime = document.querySelector(`#currentTime`);
currentTime.innerHTML = formatTime(now);

//search for the city
//function search(event) {
//event.preventDefault();
//let currentCity = document.querySelector("#currentCity");
// let searchInput = document.querySelector(`#search-input`);
//currentCity.innerHTML = searchInput.value;
///}
//let searchForm = document.querySelector("#search-form");
//searchForm.addEventListener("submit", search);

//function convertToFahrenheit(event) {
// event.preventDefault();
//let tempElement = document.querySelector("#currentTemp");
// tempElement.innerHTML = 32;
//}
//function convertToCelsius(event) {
//event.preventDefault();
// let tempElement = document.querySelector("#currentTemp");
// tempElement.innerHTML = 0;
//}
//let fahrenheitLink = document.querySelector("#fahrenheit");
//fahrenheitLink.addEventListener("click", convertToFahrenheit);
//let celsiusLink = document.querySelector("#celsius");
//celsiusLink.addEventListener("click", convertToCelsius);

//current temperature

function currentWeather(response) {
  console.log(response.data);
  document.querySelector("#currentCity").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = `${temperature} °C`;
  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity ${humidity} %`;
  let pressure = response.data.main.pressure;
  let currentPressure = document.querySelector("#pressure");
  currentPressure.innerHTML = `Pressure ${pressure} hPa`;
  let wind = response.data.wind.speed;
  let currentWind = document.querySelector("#windSpeed");
  currentWind.innerHTML = `Wind ${wind} km/h`;
}
let searchByLocation = document.querySelector("#current-location-button");
searchByLocation.addEventListener("submit", searchLocation);

function searchLocation(location) {
  let latitude = location.coords.latitude;
  let longitude = location.coords.longitude;
  let apiKey = "502dc8f7ae36e57af1974e18d16a86f8";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(currentWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let locationButton = document.querySelector("#current-location-button");
locationButton.addEventListener("click", getCurrentPosition);

let selectTemp = document.querySelector("#search-form");
selectTemp.addEventListener("submit", searchCity);

function searchCity(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#search-input");
  console.log(currentCity.value);
  let h1 = document.querySelector("#currentCity");
  h1.innerHTML = `${currentCity.value}`;
  let city = document.querySelector("#search-input").value;
  let apiKey = "9cb72bec958f8fb02391985ed7b219d2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(currentWeather);
}
