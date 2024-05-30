//Test Fetch API
// async function fetchData(){
//     const searchCity = 'surakarta'
//     const apiKey = '224409a97cfb66a9475367480e6ac1e2'
//     const responseOpenWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}`)
//     const responseOpenWeatherJson = await responseOpenWeather.json()
//     console.log(responseOpenWeatherJson, "<< response Open Weather Json")
// }

function getUserLocation(){
    navigator.geolocation.getCurrentPosition(
        fetchOpenMeteoAPI,
        (error) => {
            console.error("Error Getting Location: ", error);
            alert("Error Getting Location: " + error.message);
        }
    );
}

getUserLocation()

async function fetchOpenMeteoAPI(position){
    var lat = position.coords.latitude
    var lon = position.coords.longitude

    const responseOpenMeteo = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_hours&timezone=Asia%2FBangkok`)
        const responseOpenMeteoJson = await responseOpenMeteo.json()
        console.log(responseOpenMeteoJson, "<< Response Open Meteo Json")
}