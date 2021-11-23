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
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "0bf572751074ee15d519faf4989d97e0";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
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
  getForecast(response.data.coord)
 }
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input").value;
  let apiKey = "0bf572751074ee15d519faf4989d97e0";
  let apiEnd = "https://api.openweathermap.org/data/2.5/weather?"
  let apiUnit = "imperial"
  let apiUrl = `${apiEnd}q=${searchInput}&units=${apiUnit}&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showCityTemp);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index){ 
    if (index < 6) {
  forecastHTML = forecastHTML + 
    `
    <div class="col-2">
          <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
  
          <img 
            src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
            alt="img"
            width="42"
            class="forecast-icon"
           />
         <div class="weather-forecast-temp">
           <span class="weather-forecast-temp-max">
            ${Math.round(forecastDay.temp.max)}°
           </span>
           <span class="weather-forecast-temp-min">
            ${Math.round(forecastDay.temp.min)}°
           </span>
          </div>
        </div>
    `};
  })
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}
let celTemp = null;
let celHigh = null;
let celLow = null;
let updateCity = document.querySelector("#btn-search");
updateCity.addEventListener("click", searchCity);
updateCity.addEventListener(`keydown`, searchCity);