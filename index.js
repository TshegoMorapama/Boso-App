function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let descriptionElement = document.querySelector("#condition");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let icon = document.querySelector("#icon");

  temperatureElement.innerHTML = `${temperature}°`;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;

 getForecast(response.data.city);
}

function changeCity(event) {
  event.preventDefault();

  let area = document.querySelector(".area");
  let cityInput = document.querySelector("#city");
  area.textContent = cityInput.value;
  let city = cityInput.value;

  let apiKey = "6971a13af1b8tb2ebe7419f6ba0o6bdc";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;

  axios.get(apiUrl).then(displayTemperature);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = document.querySelector(".current-day");
  day.innerHTML = `${days[new Date().getDay()]}`;

  let now = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  document.getElementById("time").innerHTML = now;
}

function formatDay(timestemp) {
  let date=new Date(timestemp * 1000);
  let days= ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];

}

function getForecast(city) {
  let apiKey = "6971a13af1b8tb2ebe7419f6ba0o6bdc";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metric`;

  axios(apiUrl).then(function (response) { 
    displayForecast(response.data); 
  });
}

function displayForecast(forecastData) { 
  console.log(forecastData);

  
  let forecastHTML = "";

  forecastData.daily.forEach(function (day, index) {
    if (index < 5) {
    forecastHTML = forecastHTML +
    `
     <div class="weather-forecast-day">
      <div class="weather-forecast-date"> ${formatDay(day.time)} </div>
      <div>
     <img src="${day.condition.icon_url}" alt="" width="48" id="weather-image" />
      </div>
      <div class="weather-forecast-temperatures">
        <span class="temperature-max"> 
        <strong>${Math.round(day.temperature.maximum)}&deg;</strong> 
        </span>
        <span class="temperature-min">${Math.round(day.temperature.minimum)}&deg;</span>
      </div>
      </div>
      `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

let form = document.querySelector(".button");
form.addEventListener("click", changeCity);

getForecast("pretoria");
