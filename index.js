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
      await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=10&appid=224409a97cfb66a9475367480e6ac1e2
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
    document.getElementById("h2-nav-loc-name").innerHTML =
      responseGeocodingJson[0].name;
    document.getElementById("p-nav-loc-name").innerHTML =
      responseGeocodingJson[0].state;

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
      await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=10&appid=224409a97cfb66a9475367480e6ac1e2
    `);
    const responseGeocodingSearchJson = await responseGeocodingSearch.json();

    //Fech API OpenMeteo Current
    const currentWeatherSearch = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m&hourly=temperature_2m&timezone=Asia%2FBangkok`
    );
    const currentWeatherSearchJson = await currentWeatherSearch.json();
    console.log(currentWeatherSearchJson, "<< currentWeatherSearchJson");

    //Assign Value in Navbar
    document.getElementById("h2-nav-loc-name").innerHTML =
      responseGeocodingSearchJson[0].name;
    document.getElementById("p-nav-loc-name").innerHTML =
      responseGeocodingSearchJson[0].state;

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
              <h2>${
                historyWeatherJson.daily.temperature_2m_max[i] + "°C"
              }</h2>
              <p>${
                "—&nbsp" +
                historyWeatherJson.daily.temperature_2m_min[i] +
                "°C"
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
