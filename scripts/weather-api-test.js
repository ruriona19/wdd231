const currentTemp = document.getElementById('current-temp');
const weatherIcon = document.getElementById('weather-icon');
const captionDesc = document.querySelector('figcaption');
const myLat = 49.7499;
const myLon = 6.6371;

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=4805fb3c9a3f5182f4b8f3fa6d5faa4d&units=metric`;

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        }
        else {
            throw Error(await response.text());
        }
    }
    catch (error) {
        console.log(error);
    }
}

apiFetch();

function displayResults(weatherData) {
    currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)}&deg;C</strong>`;
    const iconsrc = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    const desc = weatherData.weather[0].description;
    weatherIcon.src = iconsrc;
    weatherIcon.alt = desc;
    captionDesc.textContent = desc;
}
