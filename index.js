//Test Fetch API
async function fetchData(){
    let searchCity = 'jakarta'
    let apiKey = '224409a97cfb66a9475367480e6ac1e2'
    const responseOpenWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}`)
    const responseOpenWeatherJson = await responseOpenWeather.json()
    console.log(responseOpenWeatherJson, "<< response Open Weather Json")
}

fetchData()