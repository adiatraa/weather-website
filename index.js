//Test Fetch API
// async function fetchData(){
//     const searchCity = 'surakarta'
//     const apiKey = '224409a97cfb66a9475367480e6ac1e2'
//     const responseOpenWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}`)
//     const responseOpenWeatherJson = await responseOpenWeather.json()
//     console.log(responseOpenWeatherJson, "<< response Open Weather Json")
// }

function getUserLocation() {
  navigator.geolocation.getCurrentPosition(fetchOpenMeteoAPI, (error) => {
    console.error("Error Getting Location: ", error);
    alert("Error Getting Location: " + error.message);
  });
}

getUserLocation();

async function fetchOpenMeteoAPI(position) {
  var lat = position?.coords?.latitude;
  var lon = position?.coords?.longitude;

  document.getElementById("loading").style.display = "block";

  if (lat && lon) {
    const responseOpenMeteo = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m&hourly=temperature_2m&timezone=Asia%2FBangkok`
    );
    const responseOpenMeteoJson = await responseOpenMeteo.json();
    document.getElementById("loading").style.display = "none";
    console.log(responseOpenMeteoJson, "<< Response Open Meteo Json");

    document.getElementById("temp-sidebar").innerHTML =
      responseOpenMeteoJson.current.temperature_2m;
    
    //Assign API Value to Navbar
    const responseGeocoding =
      await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=10&appid=224409a97cfb66a9475367480e6ac1e2
    `);
    const responseGeocodingJson = await responseGeocoding.json();
    document.getElementById("h2-nav-loc-name").innerHTML = responseGeocodingJson[0].name;
    document.getElementById("p-nav-loc-name").innerHTML = responseGeocodingJson[0].state;
  }
}

fetchOpenMeteoAPI();
