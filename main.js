(() => {
    const submitLocation = document.querySelector('#submit-location');
    const locationInput = document.querySelector('#location');
    submitLocation.addEventListener('click', () => {
        parseWeatherData(locationInput.value);
    })
})();

async function getWeatherLocation(location) {
    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=eeb1fadb896d635a3715581d7cb26286`)
        const weatherData = response.json();
        return weatherData;
    } catch {
        alert(`Location ${location} does not exist!`)
    }
}

async function parseWeatherData(location) {
    try {
        const weatherData = await getWeatherLocation(location);
        let weather = {
            name: weatherData.name,
            status: weatherData.weather,
            main: weatherData.main,
            wind: weatherData.wind,
            cloudiness: weatherData.clouds.all
        }
        console.log(weather);
    } catch {
        alert(`Location ${location} does not exist!`)
    }
}