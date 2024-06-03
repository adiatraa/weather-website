document.getElementById("toggle-label").addEventListener("click", function () {
  document.querySelector(".toggle-display").classList.toggle("toggled");
  document.body.classList.toggle("dark-theme");
});

function getUserLocation() {
  navigator.geolocation.getCurrentPosition(fetchData, (error) => {
    console.error("Error Getting Location: ", error);
    alert("Error Getting Location: " + error.message);
  });
}

getUserLocation();

async function fetchData(position) {
  var lat = position?.coords?.latitude;
  var lon = position?.coords?.longitude;

  document.getElementById("loading").style.display = "block";

  if (lat && lon) {
    //Fech API OpenMeteo Current
    const responseOpenMeteo = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m&hourly=temperature_2m&timezone=Asia%2FBangkok`
    );
    const responseOpenMeteoJson = await responseOpenMeteo.json();
    console.log(responseOpenMeteoJson, "<< Response Open Meteo Json");

    //Fetch API Geocoding Open Weather
    const responseGeocoding =
      await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=10&appid=224409a97cfb66a9475367480e6ac1e2
      `);
    const responseGeocodingJson = await responseGeocoding.json();

    //Fetch API Open Meteo 7 days integrate with current location user
    const historyCurrentUser = await fetch(
      `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=2024-05-16&end_date=2024-05-30&hourly=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max&timezone=Asia%2FBangkok`
    );
    const responseHistoryCurrent = await historyCurrentUser.json();
    console.log(responseHistoryCurrent, "<< Response History Current");
    document.getElementById("loading").style.display = "none";

    //Assign Value in Navbar
    if (responseGeocodingJson[0].state === undefined) {
      document.getElementById("p-nav-loc-name").innerHTML = "";
    } else {
      document.getElementById("p-nav-loc-name").innerHTML =
        responseGeocodingJson[0].state;
    }

    document.getElementById("h2-nav-loc-name").innerHTML =
      responseGeocodingJson[0].name;

    //Assign API Value to Sidebar
    document.getElementById("temp-sidebar").innerHTML =
      responseOpenMeteoJson.current.temperature_2m + "°C";
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var d = new Date(responseOpenMeteoJson.current.time);
    var dayName = days[d.getDay()];
    document.getElementById("h2-sidebar-day").innerHTML = dayName;
    document.getElementById("p-sidebar-day").innerHTML = getTimeFromDateTime(
      responseOpenMeteoJson.current.time
    );

    //Icon
    let weatherCode = {
      0: {
        day: {
          description: "Sunny",
          image: "images/weather-assets/sunny.png",
        },
        night: {
          description: "Clear",
          image: "images/weather-assets/clear.png",
        },
      },
      1: {
        day: {
          description: "Mainly Sunny",
          image: "images/weather-assets/sunny.png",
        },
        night: {
          description: "Mainly Clear",
          image: "images/weather-assets/clear.png",
        },
      },
      2: {
        day: {
          description: "Partly Cloudy",
          image: "images/weather-assets/cloudySun.png",
        },
        night: {
          description: "Partly Cloudy",
          image: "images/weather-assets/cloudyNight.png",
        },
      },
      3: {
        day: {
          description: "Cloudy",
          image: "images/weather-assets/cloudy.png",
        },
        night: {
          description: "Cloudy",
          image: "images/weather-assets/cloudyNight.png",
        },
      },
      45: {
        day: {
          description: "Foggy",
          image: "http://openweathermap.org/img/wn/50d@2x.png",
        },
        night: {
          description: "Foggy",
          image: "http://openweathermap.org/img/wn/50n@2x.png",
        },
      },
      48: {
        day: {
          description: "Rime Fog",
          image: "http://openweathermap.org/img/wn/50d@2x.png",
        },
        night: {
          description: "Rime Fog",
          image: "http://openweathermap.org/img/wn/50n@2x.png",
        },
      },
      51: {
        day: {
          description: "Light Drizzle",
          image: "images/weather-assets/rainSun.png",
        },
        night: {
          description: "Light Drizzle",
          image: "images/weather-assets/rainNight.png",
        },
      },
      53: {
        day: {
          description: "Drizzle",
          image: "images/weather-assets/rainSun.png",
        },
        night: {
          description: "Drizzle",
          image: "images/weather-assets/rainNight.png",
        },
      },
      55: {
        day: {
          description: "Heavy Drizzle",
          image: "images/weather-assets/rainSun.png",
        },
        night: {
          description: "Heavy Drizzle",
          image: "images/weather-assets/rainNight.png",
        },
      },
      56: {
        day: {
          description: "Light Freezing Drizzle",
          image: "http://openweathermap.org/img/wn/09d@2x.png",
        },
        night: {
          description: "Light Freezing Drizzle",
          image: "http://openweathermap.org/img/wn/09n@2x.png",
        },
      },
      57: {
        day: {
          description: "Freezing Drizzle",
          image: "http://openweathermap.org/img/wn/09d@2x.png",
        },
        night: {
          description: "Freezing Drizzle",
          image: "http://openweathermap.org/img/wn/09n@2x.png",
        },
      },
      61: {
        day: {
          description: "Light Rain",
          image: "images/weather-assets/rainSun.png",
        },
        night: {
          description: "Light Rain",
          image: "images/weather-assets/rainNight.png",
        },
      },
      63: {
        day: {
          description: "Rain",
          image: "images/weather-assets/rainSun.png",
        },
        night: {
          description: "Rain",
          image: "images/weather-assets/rainNight.png",
        },
      },
      65: {
        day: {
          description: "Heavy Rain",
          image: "images/weather-assets/rainSun.png",
        },
        night: {
          description: "Heavy Rain",
          image: "images/weather-assets/rainNight.png",
        },
      },
      66: {
        day: {
          description: "Light Freezing Rain",
          image: "images/weather-assets/rainSun.png",
        },
        night: {
          description: "Light Freezing Rain",
          image: "images/weather-assets/rainNight.png",
        },
      },
      67: {
        day: {
          description: "Freezing Rain",
          image: "images/weather-assets/rainSun.png",
        },
        night: {
          description: "Freezing Rain",
          image: "images/weather-assets/rainNight.png",
        },
      },
      71: {
        day: {
          description: "Light Snow",
          image: "images/weather-assets/snowSun.png",
        },
        night: {
          description: "Light Snow",
          image: "images/weather-assets/snowNight.png",
        },
      },
      73: {
        day: {
          description: "Snow",
          image: "images/weather-assets/snowSun.png",
        },
        night: {
          description: "Snow",
          image: "images/weather-assets/snowNight.png",
        },
      },
      75: {
        day: {
          description: "Heavy Snow",
          image: "images/weather-assets/snowSun.png",
        },
        night: {
          description: "Heavy Snow",
          image: "images/weather-assets/snowNight.png",
        },
      },
      77: {
        day: {
          description: "Snow Grains",
          image: "images/weather-assets/snowSun.png",
        },
        night: {
          description: "Snow Grains",
          image: "images/weather-assets/snowNight.png",
        },
      },
      80: {
        day: {
          description: "Light Showers",
          image: "images/weather-assets/rainSun.png",
        },
        night: {
          description: "Light Showers",
          image: "images/weather-assets/rainNight.png",
        },
      },
      81: {
        day: {
          description: "Showers",
          image: "images/weather-assets/rainSun.png",
        },
        night: {
          description: "Showers",
          image: "images/weather-assets/rainNight.png",
        },
      },
      82: {
        day: {
          description: "Heavy Showers",
          image: "images/weather-assets/rainSun.png",
        },
        night: {
          description: "Heavy Showers",
          image: "images/weather-assets/rainNight.png",
        },
      },
      85: {
        day: {
          description: "Light Snow Showers",
          image: "images/weather-assets/snowSun.png",
        },
        night: {
          description: "Light Snow Showers",
          image: "images/weather-assets/snowNight.png",
        },
      },
      86: {
        day: {
          description: "Snow Showers",
          image: "images/weather-assets/snowSun.png",
        },
        night: {
          description: "Snow Showers",
          image: "images/weather-assets/snowNight.png",
        },
      },
      95: {
        day: {
          description: "Thunderstorm",
          image: "images/weather-assets/thunderstorm.png",
        },
        night: {
          description: "Thunderstorm",
          image: "images/weather-assets/thunderstorm.png",
        },
      },
      96: {
        day: {
          description: "Light Thunderstorms With Hail",
          image: "http://openweathermap.org/img/wn/11d@2x.png",
        },
        night: {
          description: "Light Thunderstorms With Hail",
          image: "http://openweathermap.org/img/wn/11n@2x.png",
        },
      },
      99: {
        day: {
          description: "Thunderstorm With Hail",
          image: "http://openweathermap.org/img/wn/11d@2x.png",
        },
        night: {
          description: "Thunderstorm With Hail",
          image: "http://openweathermap.org/img/wn/11n@2x.png",
        },
      },
    };
    let currentWeatherCode = responseOpenMeteoJson.current.weather_code;
    let isDayTime = responseOpenMeteoJson.current.is_day == 1;

    let getCurrentWeatherCode = weatherCode[currentWeatherCode];
    let weatherIcon = isDayTime
      ? getCurrentWeatherCode.day.image
      : getCurrentWeatherCode.night.image;
    let weatherDescription = isDayTime
      ? getCurrentWeatherCode.day.description
      : getCurrentWeatherCode.night.description;

    document.getElementById("img-sidebar-weather-top").src = weatherIcon;
    document.getElementById("p-weather-status").innerHTML = weatherDescription;
    document.getElementById("humidity-weather-status").innerHTML =
      "Humidity - " + responseOpenMeteoJson.current.relative_humidity_2m + "%";
    document.getElementById("wind-weather-status").innerHTML =
      "Wind - " + responseOpenMeteoJson.current.wind_speed_10m + "km/h";

    //Assing API Value to Week Weather in 7 Days Section (Current Location)
    //Today

    //History
    let HistoryWeatherCode = responseHistoryCurrent.daily.weather_code;
    let isDayTime2 = true;

    document.getElementById(
      `weather-week`
    ).innerHTML = `<div class="weather-today">
      <p>Today</p>
      <div class="weather-today-side">
          <img src="${weatherIcon}" alt="" height="100px" width="110px" id="img-weather-today">
          <div class="weather-today-status">
              <h2>${responseOpenMeteoJson.current.temperature_2m + "°C"}</h2>
              <p>${weatherDescription}</p>
              <div class="today-humidity">
                  <i class="fa-solid fa-water"></i>
                  <p>${
                    "Humidity - " +
                    responseOpenMeteoJson.current.relative_humidity_2m +
                    "%"
                  }</p>
              </div>
              <div class="today-wind">
                  <i class="fa-solid fa-wind"></i>
                  <p>${
                    "Wind - " +
                    responseOpenMeteoJson.current.wind_speed_10m +
                    "km/h"
                  }</p>
              </div>
          </div>
      </div>
  </div>`;

    let startDate = new Date(responseHistoryCurrent.daily.time[14]);
    for (let i = 14; i >= 9; i--) {
      let getHistoryWeatherCode = weatherCode[HistoryWeatherCode[i]];
      let weatherHistoryIcon = isDayTime2
        ? getHistoryWeatherCode.day.image
        : getHistoryWeatherCode.night.image;

      let date = new Date(startDate);
      date.setDate(date.getDate() - (14 - i));
      let dayName = days[date.getDay()];
      let dayNumber = date.getDate();
      let shortDayName = dayName.substring(0, 3);

      document.getElementById(
        `weather-week`
      ).innerHTML += `<div class="weather-past">
      <p>${shortDayName} ${dayNumber}</p>
      <div class="weather-past-side">
          <div class="weather-image-past">
              <img src="${weatherHistoryIcon}" alt="" height="90px" width="100px" id="img-past-1">
          </div>
          <div class="weather-past-status">
              <h2>${
                responseHistoryCurrent.daily.temperature_2m_max[i] + "°C"
              }</h2>
              <p>${
                "—&nbsp" +
                responseHistoryCurrent.daily.temperature_2m_min[i] +
                "°C"
              }</p>
          </div>
      </div>
  </div>`;
    }

    document.getElementById(
      `weather-week`
    ).innerHTML += `<div class="blank"></div>`;
  }
}

fetchData();

// Function to extract and format the time
function getTimeFromDateTime(dateTime) {
  var date = new Date(dateTime);
  var hours = date.getHours().toString().padStart(2, "0");
  var minutes = date.getMinutes().toString().padStart(2, "0");
  return hours + ":" + minutes;
}

async function searchBar() {
  let searchCity = document.getElementById("search-input").value;

  if (!searchCity) {
    console.error("Search city is empty");
    return;
  }

  try {
    // Fetch API Open Weather Map for Latitude and Longitude
    const coordOpenWeather = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=224409a97cfb66a9475367480e6ac1e2`
    );
    const coordOpenWeatherJson = await coordOpenWeather.json();

    let lat = coordOpenWeatherJson.city.coord.lat;
    let lon = coordOpenWeatherJson.city.coord.lon;

    console.log(coordOpenWeatherJson);

    //Fetch API Open Meteo History 7 Days
    const historyWeather = await fetch(
      `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=2024-05-16&end_date=2024-05-30&hourly=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max&timezone=Asia%2FBangkok`
    );
    const historyWeatherJson = await historyWeather.json();
    console.log(historyWeatherJson, "<< History Weather Json");

    //Fetch API Geocoding Open Weather for City Name and State
    const responseGeocodingSearch =
      await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=10&appid=224409a97cfb66a9475367480e6ac1e2
    `);
    const responseGeocodingSearchJson = await responseGeocodingSearch.json();

    //Fech API OpenMeteo Current
    const currentWeatherSearch = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m&hourly=temperature_2m&timezone=Asia%2FBangkok`
    );
    const currentWeatherSearchJson = await currentWeatherSearch.json();
    console.log(currentWeatherSearchJson, "<< currentWeatherSearchJson");

    //Assign Value in Navbar
    if (responseGeocodingSearchJson[0].state === undefined) {
      document.getElementById("p-nav-loc-name").innerHTML = "";
    } else {
      document.getElementById("p-nav-loc-name").innerHTML =
        responseGeocodingSearchJson[0].state;
    }

    document.getElementById("h2-nav-loc-name").innerHTML =
      responseGeocodingSearchJson[0].name;

    //Assign API Value to Sidebar
    document.getElementById("temp-sidebar").innerHTML =
      currentWeatherSearchJson.current.temperature_2m + "°C";
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var d = new Date(currentWeatherSearchJson.current.time);
    var dayName = days[d.getDay()];
    document.getElementById("h2-sidebar-day").innerHTML = dayName;
    document.getElementById("p-sidebar-day").innerHTML = getTimeFromDateTime(
      currentWeatherSearchJson.current.time
    );

    //Icon
    let weatherCode = {
      0: {
        day: {
          description: "Sunny",
          image: "images/weather-assets/sunny.png",
        },
        night: {
          description: "Clear",
          image: "images/weather-assets/clear.png",
        },
      },
      1: {
        day: {
          description: "Mainly Sunny",
          image: "images/weather-assets/sunny.png",
        },
        night: {
          description: "Mainly Clear",
          image: "images/weather-assets/clear.png",
        },
      },
      2: {
        day: {
          description: "Partly Cloudy",
          image: "images/weather-assets/cloudySun.png",
        },
        night: {
          description: "Partly Cloudy",
          image: "images/weather-assets/cloudyNight.png",
        },
      },
      3: {
        day: {
          description: "Cloudy",
          image: "images/weather-assets/cloudy.png",
        },
        night: {
          description: "Cloudy",
          image: "images/weather-assets/cloudyNight.png",
        },
      },
      45: {
        day: {
          description: "Foggy",
          image: "http://openweathermap.org/img/wn/50d@2x.png",
        },
        night: {
          description: "Foggy",
          image: "http://openweathermap.org/img/wn/50n@2x.png",
        },
      },
      48: {
        day: {
          description: "Rime Fog",
          image: "http://openweathermap.org/img/wn/50d@2x.png",
        },
        night: {
          description: "Rime Fog",
          image: "http://openweathermap.org/img/wn/50n@2x.png",
        },
      },
      51: {
        day: {
          description: "Light Drizzle",
          image: "images/weather-assets/rainSun.png",
        },
        night: {
          description: "Light Drizzle",
          image: "images/weather-assets/rainNight.png",
        },
      },
      53: {
        day: {
          description: "Drizzle",
          image: "images/weather-assets/rainSun.png",
        },
        night: {
          description: "Drizzle",
          image: "images/weather-assets/rainNight.png",
        },
      },
      55: {
        day: {
          description: "Heavy Drizzle",
          image: "images/weather-assets/rainSun.png",
        },
        night: {
          description: "Heavy Drizzle",
          image: "images/weather-assets/rainNight.png",
        },
      },
      56: {
        day: {
          description: "Light Freezing Drizzle",
          image: "http://openweathermap.org/img/wn/09d@2x.png",
        },
        night: {
          description: "Light Freezing Drizzle",
          image: "http://openweathermap.org/img/wn/09n@2x.png",
        },
      },
      57: {
        day: {
          description: "Freezing Drizzle",
          image: "http://openweathermap.org/img/wn/09d@2x.png",
        },
        night: {
          description: "Freezing Drizzle",
          image: "http://openweathermap.org/img/wn/09n@2x.png",
        },
      },
      61: {
        day: {
          description: "Light Rain",
          image: "images/weather-assets/rainSun.png",
        },
        night: {
          description: "Light Rain",
          image: "images/weather-assets/rainNight.png",
        },
      },
      63: {
        day: {
          description: "Rain",
          image: "images/weather-assets/rainSun.png",
        },
        night: {
          description: "Rain",
          image: "images/weather-assets/rainNight.png",
        },
      },
      65: {
        day: {
          description: "Heavy Rain",
          image: "images/weather-assets/rainSun.png",
        },
        night: {
          description: "Heavy Rain",
          image: "images/weather-assets/rainNight.png",
        },
      },
      66: {
        day: {
          description: "Light Freezing Rain",
          image: "images/weather-assets/rainSun.png",
        },
        night: {
          description: "Light Freezing Rain",
          image: "images/weather-assets/rainNight.png",
        },
      },
      67: {
        day: {
          description: "Freezing Rain",
          image: "images/weather-assets/rainSun.png",
        },
        night: {
          description: "Freezing Rain",
          image: "images/weather-assets/rainNight.png",
        },
      },
      71: {
        day: {
          description: "Light Snow",
          image: "images/weather-assets/snowSun.png",
        },
        night: {
          description: "Light Snow",
          image: "images/weather-assets/snowNight.png",
        },
      },
      73: {
        day: {
          description: "Snow",
          image: "images/weather-assets/snowSun.png",
        },
        night: {
          description: "Snow",
          image: "images/weather-assets/snowNight.png",
        },
      },
      75: {
        day: {
          description: "Heavy Snow",
          image: "images/weather-assets/snowSun.png",
        },
        night: {
          description: "Heavy Snow",
          image: "images/weather-assets/snowNight.png",
        },
      },
      77: {
        day: {
          description: "Snow Grains",
          image: "images/weather-assets/snowSun.png",
        },
        night: {
          description: "Snow Grains",
          image: "images/weather-assets/snowNight.png",
        },
      },
      80: {
        day: {
          description: "Light Showers",
          image: "images/weather-assets/rainSun.png",
        },
        night: {
          description: "Light Showers",
          image: "images/weather-assets/rainNight.png",
        },
      },
      81: {
        day: {
          description: "Showers",
          image: "images/weather-assets/rainSun.png",
        },
        night: {
          description: "Showers",
          image: "images/weather-assets/rainNight.png",
        },
      },
      82: {
        day: {
          description: "Heavy Showers",
          image: "images/weather-assets/rainSun.png",
        },
        night: {
          description: "Heavy Showers",
          image: "images/weather-assets/rainNight.png",
        },
      },
      85: {
        day: {
          description: "Light Snow Showers",
          image: "images/weather-assets/snowSun.png",
        },
        night: {
          description: "Light Snow Showers",
          image: "images/weather-assets/snowNight.png",
        },
      },
      86: {
        day: {
          description: "Snow Showers",
          image: "images/weather-assets/snowSun.png",
        },
        night: {
          description: "Snow Showers",
          image: "images/weather-assets/snowNight.png",
        },
      },
      95: {
        day: {
          description: "Thunderstorm",
          image: "images/weather-assets/thunderstorm.png",
        },
        night: {
          description: "Thunderstorm",
          image: "images/weather-assets/thunderstorm.png",
        },
      },
      96: {
        day: {
          description: "Light Thunderstorms With Hail",
          image: "images/weather-assets/thunderstorm.png",
        },
        night: {
          description: "Light Thunderstorms With Hail",
          image: "images/weather-assets/thunderstorm.png",
        },
      },
      99: {
        day: {
          description: "Thunderstorm With Hail",
          image: "http://openweathermap.org/img/wn/11d@2x.png",
        },
        night: {
          description: "Thunderstorm With Hail",
          image: "http://openweathermap.org/img/wn/11n@2x.png",
        },
      },
    };
    let currentWeatherCode = currentWeatherSearchJson.current.weather_code;
    let isDayTime = currentWeatherSearchJson.current.is_day == 1;

    let getCurrentWeatherCode = weatherCode[currentWeatherCode];
    let weatherIcon = isDayTime
      ? getCurrentWeatherCode.day.image
      : getCurrentWeatherCode.night.image;
    let weatherDescription = isDayTime
      ? getCurrentWeatherCode.day.description
      : getCurrentWeatherCode.night.description;

    document.getElementById("img-sidebar-weather-top").src = weatherIcon;
    document.getElementById("p-weather-status").innerHTML = weatherDescription;
    document.getElementById("humidity-weather-status").innerHTML =
      "Humidity - " +
      currentWeatherSearchJson.current.relative_humidity_2m +
      "%";
    document.getElementById("wind-weather-status").innerHTML =
      "Wind - " + currentWeatherSearchJson.current.wind_speed_10m + "km/h";

    //Assing API Value to Week Weather in 7 Days Section (Search Input Location)

    //History
    let HistoryWeatherSearchCode = historyWeatherJson.daily.weather_code;
    let isDayTime2 = true;
    //Today Section
    document.getElementById(
      `weather-week`
    ).innerHTML = `<div class="weather-today">
      <p>Today</p>
      <div class="weather-today-side">
          <img src="${weatherIcon}" alt="" height="100px" width="110px" id="img-weather-today">
          <div class="weather-today-status">
              <h2>${currentWeatherSearchJson.current.temperature_2m + "°C"}</h2>
              <p>${weatherDescription}</p>
              <div class="today-humidity">
                  <i class="fa-solid fa-water"></i>
                  <p>${
                    "Humidity - " +
                    currentWeatherSearchJson.current.relative_humidity_2m +
                    "%"
                  }</p>
              </div>
              <div class="today-wind">
                  <i class="fa-solid fa-wind"></i>
                  <p>${
                    "Wind - " +
                    currentWeatherSearchJson.current.wind_speed_10m +
                    "km/h"
                  }</p>
              </div>
          </div>
      </div>
  </div>`;

    //Past Section
    let startDate = new Date(historyWeatherJson.daily.time[14]);
    for (let i = 14; i >= 9; i--) {
      let getHistoryWeatherCode = weatherCode[HistoryWeatherSearchCode[i]];
      let weatherHistoryIcon = isDayTime2
        ? getHistoryWeatherCode.day.image
        : getHistoryWeatherCode.night.image;

      let date = new Date(startDate);
      date.setDate(date.getDate() - (14 - i));
      let dayName = days[date.getDay()];
      let dayNumber = date.getDate();
      let shortDayName = dayName.substring(0, 3);

      document.getElementById(
        `weather-week`
      ).innerHTML += `<div class="weather-past">
      <p>${shortDayName} ${dayNumber}</p>
      <div class="weather-past-side">
          <div class="weather-image-past">
              <img src="${weatherHistoryIcon}" alt="" height="90px" width="100px" id="img-past-1">
          </div>
          <div class="weather-past-status">
              <h2>${historyWeatherJson.daily.temperature_2m_max[i] + "°C"}</h2>
              <p>${
                "—&nbsp" + historyWeatherJson.daily.temperature_2m_min[i] + "°C"
              }</p>
          </div>
      </div>
  </div>`;
    }

    document.getElementById(
      `weather-week`
    ).innerHTML += `<div class="blank"></div>`;
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
}

document
  .getElementById("search-input")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      searchBar();
    }
  });

searchBar();

async function otherLargeCities() {
  let weatherCode = {
    0: {
      day: {
        description: "Sunny",
        image: "images/weather-assets/sunny.png",
      },
      night: {
        description: "Clear",
        image: "images/weather-assets/clear.png",
      },
    },
    1: {
      day: {
        description: "Mainly Sunny",
        image: "images/weather-assets/sunny.png",
      },
      night: {
        description: "Mainly Clear",
        image: "images/weather-assets/clear.png",
      },
    },
    2: {
      day: {
        description: "Partly Cloudy",
        image: "images/weather-assets/cloudySun.png",
      },
      night: {
        description: "Partly Cloudy",
        image: "images/weather-assets/cloudyNight.png",
      },
    },
    3: {
      day: {
        description: "Cloudy",
        image: "images/weather-assets/cloudy.png",
      },
      night: {
        description: "Cloudy",
        image: "images/weather-assets/cloudyNight.png",
      },
    },
    45: {
      day: {
        description: "Foggy",
        image: "http://openweathermap.org/img/wn/50d@2x.png",
      },
      night: {
        description: "Foggy",
        image: "http://openweathermap.org/img/wn/50n@2x.png",
      },
    },
    48: {
      day: {
        description: "Rime Fog",
        image: "http://openweathermap.org/img/wn/50d@2x.png",
      },
      night: {
        description: "Rime Fog",
        image: "http://openweathermap.org/img/wn/50n@2x.png",
      },
    },
    51: {
      day: {
        description: "Light Drizzle",
        image: "images/weather-assets/rainSun.png",
      },
      night: {
        description: "Light Drizzle",
        image: "images/weather-assets/rainNight.png",
      },
    },
    53: {
      day: {
        description: "Drizzle",
        image: "images/weather-assets/rainSun.png",
      },
      night: {
        description: "Drizzle",
        image: "images/weather-assets/rainNight.png",
      },
    },
    55: {
      day: {
        description: "Heavy Drizzle",
        image: "images/weather-assets/rainSun.png",
      },
      night: {
        description: "Heavy Drizzle",
        image: "images/weather-assets/rainNight.png",
      },
    },
    56: {
      day: {
        description: "Light Freezing Drizzle",
        image: "http://openweathermap.org/img/wn/09d@2x.png",
      },
      night: {
        description: "Light Freezing Drizzle",
        image: "http://openweathermap.org/img/wn/09n@2x.png",
      },
    },
    57: {
      day: {
        description: "Freezing Drizzle",
        image: "http://openweathermap.org/img/wn/09d@2x.png",
      },
      night: {
        description: "Freezing Drizzle",
        image: "http://openweathermap.org/img/wn/09n@2x.png",
      },
    },
    61: {
      day: {
        description: "Light Rain",
        image: "images/weather-assets/rainSun.png",
      },
      night: {
        description: "Light Rain",
        image: "images/weather-assets/rainNight.png",
      },
    },
    63: {
      day: {
        description: "Rain",
        image: "images/weather-assets/rainSun.png",
      },
      night: {
        description: "Rain",
        image: "images/weather-assets/rainNight.png",
      },
    },
    65: {
      day: {
        description: "Heavy Rain",
        image: "images/weather-assets/rainSun.png",
      },
      night: {
        description: "Heavy Rain",
        image: "images/weather-assets/rainNight.png",
      },
    },
    66: {
      day: {
        description: "Light Freezing Rain",
        image: "images/weather-assets/rainSun.png",
      },
      night: {
        description: "Light Freezing Rain",
        image: "images/weather-assets/rainNight.png",
      },
    },
    67: {
      day: {
        description: "Freezing Rain",
        image: "images/weather-assets/rainSun.png",
      },
      night: {
        description: "Freezing Rain",
        image: "images/weather-assets/rainNight.png",
      },
    },
    71: {
      day: {
        description: "Light Snow",
        image: "images/weather-assets/snowSun.png",
      },
      night: {
        description: "Light Snow",
        image: "images/weather-assets/snowNight.png",
      },
    },
    73: {
      day: {
        description: "Snow",
        image: "images/weather-assets/snowSun.png",
      },
      night: {
        description: "Snow",
        image: "images/weather-assets/snowNight.png",
      },
    },
    75: {
      day: {
        description: "Heavy Snow",
        image: "images/weather-assets/snowSun.png",
      },
      night: {
        description: "Heavy Snow",
        image: "images/weather-assets/snowNight.png",
      },
    },
    77: {
      day: {
        description: "Snow Grains",
        image: "images/weather-assets/snowSun.png",
      },
      night: {
        description: "Snow Grains",
        image: "images/weather-assets/snowNight.png",
      },
    },
    80: {
      day: {
        description: "Light Showers",
        image: "images/weather-assets/rainSun.png",
      },
      night: {
        description: "Light Showers",
        image: "images/weather-assets/rainNight.png",
      },
    },
    81: {
      day: {
        description: "Showers",
        image: "images/weather-assets/rainSun.png",
      },
      night: {
        description: "Showers",
        image: "images/weather-assets/rainNight.png",
      },
    },
    82: {
      day: {
        description: "Heavy Showers",
        image: "images/weather-assets/rainSun.png",
      },
      night: {
        description: "Heavy Showers",
        image: "images/weather-assets/rainNight.png",
      },
    },
    85: {
      day: {
        description: "Light Snow Showers",
        image: "images/weather-assets/snowSun.png",
      },
      night: {
        description: "Light Snow Showers",
        image: "images/weather-assets/snowNight.png",
      },
    },
    86: {
      day: {
        description: "Snow Showers",
        image: "images/weather-assets/snowSun.png",
      },
      night: {
        description: "Snow Showers",
        image: "images/weather-assets/snowNight.png",
      },
    },
    95: {
      day: {
        description: "Thunderstorm",
        image: "images/weather-assets/thunderstorm.png",
      },
      night: {
        description: "Thunderstorm",
        image: "images/weather-assets/thunderstorm.png",
      },
    },
    96: {
      day: {
        description: "Light Thunderstorms With Hail",
        image: "http://openweathermap.org/img/wn/11d@2x.png",
      },
      night: {
        description: "Light Thunderstorms With Hail",
        image: "http://openweathermap.org/img/wn/11n@2x.png",
      },
    },
    99: {
      day: {
        description: "Thunderstorm With Hail",
        image: "http://openweathermap.org/img/wn/11d@2x.png",
      },
      night: {
        description: "Thunderstorm With Hail",
        image: "http://openweathermap.org/img/wn/11n@2x.png",
      },
    },
  };

  // --- Surabaya --- //
  //Fetch API Current
  const currentWeatherSurabaya = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=-7.2492&longitude=112.7508&current=temperature_2m,weather_code,wind_speed_10m&timezone=Asia%2FBangkok`
  );
  const currentWeatherSurabayaJson = await currentWeatherSurabaya.json();

  let SurabayaWeatherCode = currentWeatherSurabayaJson.current.weather_code;
  let isDayTimeSurabaya = currentWeatherSurabayaJson.current.is_day == 1;

  //Fetch API Geocoding Open Weather
  const responseSurabaya =
    await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=-7.2492&lon=112.7508&limit=10&appid=224409a97cfb66a9475367480e6ac1e2
      `);
  const responseSurabayaJson = await responseSurabaya.json();

  let getSurabayaWeatherCode = weatherCode[SurabayaWeatherCode];
  let surabayaIcon = isDayTimeSurabaya
    ? getSurabayaWeatherCode.day.image
    : getSurabayaWeatherCode.night.image;

  document.getElementById("big-city-img-1").src = surabayaIcon;
  document.getElementById("big-city-name-1").innerHTML =
    responseSurabayaJson[0].name;
  document.getElementById("big-city-state-1").innerHTML =
    responseSurabayaJson[0].state;
  document.getElementById("big-city-temp-1").innerHTML =
    currentWeatherSurabayaJson.current.temperature_2m + "°C";
  document.getElementById("big-city-wind-1").innerHTML =
    "Wind - " + currentWeatherSurabayaJson.current.wind_speed_10m + "km/h";

  // --- Padang --- //
  //Fetch API Current
  const currentWeatherPadang = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=-0.9492&longitude=100.3543&current=temperature_2m,weather_code,wind_speed_10m&timezone=Asia%2FBangkok`
  );
  const currentWeatherPadangJson = await currentWeatherPadang.json();

  let PadangWeatherCode = currentWeatherPadangJson.current.weather_code;
  let isDayTimePadang = currentWeatherPadangJson.current.is_day == 1;

  //Fetch API Geocoding Open Weather
  const responsePadang =
    await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=-0.9492&lon=100.3543&limit=10&appid=224409a97cfb66a9475367480e6ac1e2
      `);
  const responsePadangJson = await responsePadang.json();
  let getPadangWeatherCode = weatherCode[PadangWeatherCode];
  let padangIcon = isDayTimePadang
    ? getPadangWeatherCode.day.image
    : getPadangWeatherCode.night.image;

  document.getElementById("big-city-img-2").src = padangIcon;
  document.getElementById("big-city-name-2").innerHTML =
    responsePadangJson[0].name;
  document.getElementById("big-city-state-2").innerHTML =
    responsePadangJson[0].state;
  document.getElementById("big-city-temp-2").innerHTML =
    currentWeatherPadangJson.current.temperature_2m + "°C";
  document.getElementById("big-city-wind-2").innerHTML =
    "Wind - " + currentWeatherPadangJson.current.wind_speed_10m + "km/h";

  // --- Cirebon --- //
  //Fetch API Current
  const currentWeatherCirebon = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=-6.7063&longitude=108.557&current=temperature_2m,weather_code,wind_speed_10m&timezone=Asia%2FBangkok`
  );
  const currentWeatherCirebonJson = await currentWeatherCirebon.json();

  let CirebonWeatherCode = currentWeatherCirebonJson.current.weather_code;
  let isDayTimeCirebon = currentWeatherCirebonJson.current.is_day == 1;

  //Fetch API Geocoding Open Weather
  const responseCirebon =
    await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=-6.7063&lon=108.557&limit=10&appid=224409a97cfb66a9475367480e6ac1e2
      `);
  const responseCirebonJson = await responseCirebon.json();
  let getCirebonWeatherCode = weatherCode[CirebonWeatherCode];
  let cirebonIcon = isDayTimeCirebon
    ? getCirebonWeatherCode.day.image
    : getCirebonWeatherCode.night.image;

  document.getElementById("big-city-img-3").src = cirebonIcon;
  document.getElementById("big-city-name-3").innerHTML =
    responseCirebonJson[0].name;
  document.getElementById("big-city-state-3").innerHTML =
    responseCirebonJson[0].state;
  document.getElementById("big-city-temp-3").innerHTML =
    currentWeatherCirebonJson.current.temperature_2m + "°C";
  document.getElementById("big-city-wind-3").innerHTML =
    "Wind - " + currentWeatherCirebonJson.current.wind_speed_10m + "km/h";

  // --- Palembang --- //
  //Fetch API Current
  const currentWeatherPalembang = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=-2.9167&longitude=104.7458&current=temperature_2m,weather_code,wind_speed_10m&timezone=Asia%2FBangkok`
  );
  const currentWeatherPalembangJson = await currentWeatherPalembang.json();

  let PalembangWeatherCode = currentWeatherCirebonJson.current.weather_code;
  let isDayTimePalembang = currentWeatherCirebonJson.current.is_day == 1;

  //Fetch API Geocoding Open Weather
  const responsePalembang =
    await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=-2.9167&lon=104.7458&limit=10&appid=224409a97cfb66a9475367480e6ac1e2
      `);
  const responsePalembangJson = await responsePalembang.json();
  let getPalembangWeatherCode = weatherCode[PalembangWeatherCode];
  let palembangIcon = isDayTimePalembang
    ? getPalembangWeatherCode.day.image
    : getPalembangWeatherCode.night.image;

  document.getElementById("big-city-img-4").src = palembangIcon;
  document.getElementById("big-city-name-4").innerHTML =
    responsePalembangJson[0].name;
  document.getElementById("big-city-state-4").innerHTML =
    responsePalembangJson[0].state;
  document.getElementById("big-city-temp-4").innerHTML =
    currentWeatherPalembangJson.current.temperature_2m + "°C";
  document.getElementById("big-city-wind-4").innerHTML =
    "Wind - " + currentWeatherPalembangJson.current.wind_speed_10m + "km/h";
}

otherLargeCities();

var splide = new Splide(".splide", {
  type: "slide",
  direction: "ttb",
  perPage: 1,
  height: "311px",
  padding: "3%",
  margin: "4%",
  pagination: false,
  rewind: true,
});

splide.mount();
