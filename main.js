(() => {
    const submitLocation = document.querySelector('#submit-location');
    const locationInput = document.querySelector('#location');
    submitLocation.addEventListener('click', () => {
        displayWeather(locationInput.value);
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

async function parseWeatherData(weatherData) {
    try {
        let weather = {
            name: weatherData.name,
            status: weatherData.weather,
            main: weatherData.main,
            wind: weatherData.wind,
            cloudiness: weatherData.clouds.all
        }
        return weather;
    } catch {
        alert(`Location ${location} does not exist!`)
    }
}

async function displayWeather(location) {
    const weatherData = await getWeatherLocation(location);
    const data = await parseWeatherData(weatherData);
    const iconCode = data.status[0].icon;
    const iconurl = `http://openweathermap.org/img/w/${iconCode}.png`;
    const icon = document.querySelector('.icon');
    icon.src = iconurl;
    const temp_dom = document.querySelector('.temp');
    const temp = convertTemp(data.main.temp);
    temp_dom.textContent = `${temp}°C`;
    status_dom = document.querySelector('.status');
    desc_dom = document.querySelector('.desc');
    status_dom.textContent = data.status[0].main;
    desc_dom.textContent = data.status[0].description;
    const location_dom = document.querySelector('.search-location');
    location_dom.textContent = data.name;
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: 'numeric', minute: 'numeric'});
    const date_dom = document.querySelector('.date-time');
    date_dom.innerHTML = `${date}<br>${time}`;
    const cloudiness_dom = document.querySelector('#cloudiness');
    const humidity_dom = document.querySelector('#humidity');
    const windspeed_dom = document.querySelector('#windspeed');
    const feelslike_dom = document.querySelector('#feelslike');
    cloudiness_dom.textContent = `${data.cloudiness}%`;
    humidity_dom.textContent = `${data.main.humidity}%`;
    windspeed_dom.textContent = `${data.wind.speed} m/s`;
    const feelslikeTemp = convertTemp(data.main.feels_like);
    feelslike_dom.textContent = `${feelslikeTemp} °C`;
}

function convertTemp(temp) {
    let tempInCelsius = Math.floor(temp - 273.15);
    let tempInFahrenheit = Math.floor(tempInCelsius * (9/5) + 32);
    return tempInCelsius;
}