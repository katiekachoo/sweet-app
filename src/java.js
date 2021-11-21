function updateTime() {
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"];
let day = days[now. getDay()];
let time = now.toLocaleTimeString();
let localTime = document.querySelector("#current-local-time");
let timeDescription = document.querySelector("#time-description");
localTime.innerHTML = `${day} ${time}`;
timeDescription.innerHTML = "Local time";
}
function findLocal(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(position);
  updateTime();
  let apiKey = "0bf572751074ee15d519faf4989d97e0";
  let apiEnd = "https://api.openweathermap.org/data/2.5/weather?"
  let apiUnit = "metric"
  let apiUrl = `${apiEnd}lat=${lat}&lon=${lon}&units=${apiUnit}&appid=${apiKey}`;
  axios.get(apiUrl).then(updateTime);
}
function updateLocal (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocal);
}
function formatTime(timestamp) {
  let date =  new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"];
  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}
function showCityTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let cityTemp = document.querySelector("#current-temp");
  let cityDescrip = document.querySelector("#local-summary");
  let country = document.querySelector("#country");
  let cityName = document.querySelector("#local-city");
  let lowTempData = document.querySelector("#today-low-temp");
  let lowTemp = Math.round(response.data.main.temp_min);
  let highTempData = document.querySelector("#today-high-temp");
  let highTemp = Math.round(response.data.main.temp_max);
  let cityTime = document.querySelector("#current-local-time");
  let timeDescription = document.querySelector("#time-description");
  let humidity = document.querySelector("#humid");
  let windSpeed = document.querySelector("#wind");
  let icon = document.querySelector("#icon");
  celTemp = response.data.main.temp;
  celHigh = response.data.main.temp_max;
  celLow = response.data.main.temp_min;
  cityTemp.innerHTML = `${temp}`;
  cityDescrip.innerHTML = `${response.data.weather[0].description}`;
  icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  icon.setAttribute("alt", `${response.data.weather[0].description}`)
  country.innerHTML = `${response.data.sys.country}`;
  cityName.innerHTML = `${response.data.name}`;
  lowTempData.innerHTML = `${lowTemp}`;
  highTempData.innerHTML = `${highTemp}`;
  cityTime.innerHTML = formatTime(response.data.dt * 1000);
  timeDescription.innerHTML = "Last updated";
  humidity.innerhTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
 }
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input").value;
  let apiKey = "0bf572751074ee15d519faf4989d97e0";
  let apiEnd = "https://api.openweathermap.org/data/2.5/weather?"
  let apiUnit = "metric"
  let apiUrl = `${apiEnd}q=${searchInput}&units=${apiUnit}&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showCityTemp);
}
function convertTempFar(event) {
  event.preventDefault();
  let tempCel = document.querySelector("#current-temp");
  tempCel.innerHTML = Math.round(celTemp);
  let todayHigh = document.querySelector("#today-high-temp");
  todayHigh.innerHTML = Math.round(celHigh);
  let todayLow = document.querySelector("#today-low-temp");
  todayLow.innerHTML = Math.round(celLow);
}
function convertTempCel(event) {
  event.preventDefault();
  let tempFar = document.querySelector("#current-temp");
  tempFar.innerHTML = Math.round(((celTemp*9)/5+32));
  let todayLowCel = document.querySelector("#today-low-temp");
  todayLowCel.innerHTML = Math.round(((celLow*9)/5+32));
  let todayHighCel = document.querySelector("#today-high-temp");
  todayHighCel.innerHTML = Math.round(((celHigh*9)/5+32));
}
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Mon","Tue","Wed","Thu","Fri"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day){
  forecastHTML = forecastHTML + 
    `
    <div class="col-2">
          <div class="weather-forecast-date">${day}</div>
          <img 
            src="http://openweathermap.org/img/wn/50d@2x.png"
            alt="img"
            width="42"
            class="forecast-icon"
           />
         <div class="weather-forecast-temp">
           <span class="weather-forecast-temp-max">
            18
           </span>
           <span class="weather-forecast-temp-min">
            11
           </span>
          </div>
        </div>
    `});
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}
let celTemp = null;
let celHigh = null;
let celLow = null;
let searchLocal = document.querySelector("#btn-local");
searchLocal.addEventListener("click", updateLocal)
let updateCity = document.querySelector("#btn-search");
updateCity.addEventListener("click", searchCity);
let currentTempCel = document.querySelector("#current-temp-cel");
currentTempCel.addEventListener("click", convertTempFar);
let currentTempFar = document.querySelector("#current-temp-far");
currentTempFar.addEventListener("click", convertTempCel);

displayForecast();
