(() => {
    const submitLocation = document.querySelector('#submit-location');
    const locationInput = document.querySelector('#location');
    submitLocation.addEventListener('click', () => {
        displayWeather(locationInput.value);
    })
    const extraInfoButton = document.querySelector('.options-btn-cont');
    extraInfoButton.addEventListener('click', transformExtraInfo);
})();

async function getWeatherLocation(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=eeb1fadb896d635a3715581d7cb26286`)
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
    const iconurl = `https://openweathermap.org/img/w/${iconCode}.png`;
    const icon = document.querySelector('.icon');
    icon.src = iconurl;
    const temp_dom = document.querySelector('.temp');
    const temp = convertTemp(data.main.temp);
    temp_dom.textContent = `${temp}°C`;
    status_dom = document.querySelector('.status');
    desc_dom = document.querySelector('.desc');
    status_dom.textContent = data.status[0].main;
    const desc = capitalizeString(data.status[0].description);
    desc_dom.textContent = desc;
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
    const weatherdisplay = document.querySelector('.weather-result');
    weatherdisplay.style.display = 'block';
}

function convertTemp(temp) {
    let tempInCelsius = Math.floor(temp - 273.15);
    let tempInFahrenheit = Math.floor(tempInCelsius * (9/5) + 32);
    return tempInCelsius;
}

function capitalizeString(str) {
    const strArray = str.split('');
    for(let i = 0; i < strArray.length; i++) {
        if(i === 0 || strArray[i - 1] === ' ') {
            strArray[i] = strArray[i].toUpperCase();
        }
    }
    return strArray.join('');
}

function transformExtraInfo() {
    const extraInfo = document.querySelector('.extra-info');
    const optionsButton = document.querySelector('.options-button');
    if(extraInfo.style.display == 'flex') {
        extraInfo.style.display = 'none';
        optionsButton.classList = 'options-button';
    } else {
        extraInfo.style.display = 'flex';
        optionsButton.classList = 'options-button down';
    }
}