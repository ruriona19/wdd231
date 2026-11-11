const currentTemp = document.getElementById('current-temp');
const weatherIcon = document.getElementById('weather-icon');
const captionDesc = document.querySelector('figcaption');
const myLat = -17.34809;
const myLon = -66.1895;
const apiKey = "4805fb3c9a3f5182f4b8f3fa6d5faa4d";


const url = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=${apiKey}&units=metric`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLon}&appid=${apiKey}&units=metric`;

async function fetchWeatherData(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`OpenWeatherMap request failed: ${response.status}`);
    }

    return response.json();
}

async function apiFetch() {
    try {
        const [currentData, forecastData] = await Promise.all([
            fetchWeatherData(url),
            fetchWeatherData(forecastUrl)
        ]);

        displayCurrentResults(currentData);
        displayForecastResults(forecastData);
    } catch (error) {
        console.error("Could not load weather data:", error);
        document.querySelector("#forecast-list").textContent =
            "The forecast is unavailable right now.";
    }
}

apiFetch();

function displayCurrentResults(weatherData) {
    currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)}&deg;C</strong>`;
    const iconsrc = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    const desc = weatherData.weather[0].description;
    weatherIcon.src = iconsrc;
    weatherIcon.alt = desc;
    captionDesc.textContent = desc;
}

function displayForecastResults(forecastData) {
    const forecastList = document.querySelector("#forecast-list");
    const timezoneOffset = forecastData.city.timezone;

    const localNow = new Date(Date.now() + timezoneOffset * 1000);
    const today = localNow.toISOString().slice(0, 10);
    const days = new Map();

    forecastData.list.forEach((period) => {
        const localDate = new Date(
            (period.dt + timezoneOffset) * 1000
        ).toISOString().slice(0, 10);

        if (localDate <= today) {
            return;
        }

        if (!days.has(localDate)) {
            days.set(localDate, {
                date: localDate,
                min: period.main.temp_min,
                max: period.main.temp_max
            });
        } else {
            const day = days.get(localDate);
            day.min = Math.min(day.min, period.main.temp_min);
            day.max = Math.max(day.max, period.main.temp_max);
        }
    });

    const nextThreeDays = [...days.values()].slice(0, 3);

    if (nextThreeDays.length < 3) {
        throw new Error("The API did not return three forecast days.");
    }

    const items = nextThreeDays.map((day) => {
        const item = document.createElement("li");
        const date = new Date(`${day.date}T12:00:00Z`);
        const label = date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
            timeZone: "UTC"
        });

        item.textContent =
            `${label}: Low ${Math.round(day.min)}°C · High ${Math.round(day.max)}°C`;

        return item;
    });

    forecastList.replaceChildren(...items);
}