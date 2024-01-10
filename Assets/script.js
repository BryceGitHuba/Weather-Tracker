// OpenWeatherMap API key and endpoints
const apiKey = '226b251db02847cc6112aa378b2c74dd';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';

// Function to search for weather data
function searchWeather(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the city name from the input
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value.trim();

    // Fetch current weather data
    fetch(`${apiUrl}?q=${cityName}&units=imperial&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            // Process and display current weather data
            displayCurrentWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather:', error);
        });

    // Fetch forecast data
    fetch(`${forecastUrl}?q=${cityName}&units=imperial&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            // Process and display forecast data
            displayForecast(data);
        })
        .catch(error => {
            console.error('Error fetching forecast:', error);
        });
}

// Function to display current weather data
function displayCurrentWeather(data) {
    const currentWeatherDiv = document.getElementById('currentWeather');
    currentWeatherDiv.innerHTML = ''; // Clear previous content

    const city = data.name;
    const date = new Date(data.dt * 1000).toLocaleDateString();
    const icon = data.weather[0].icon;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    // Create HTML structure for current weather
    const html = `
        <h2>${city} (${date}) <img src="https://openweathermap.org/img/w/${icon}.png" alt="Weather icon"></h2>
        <p>Temperature: ${temperature} °F</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} mph</p>
    `;

    // Append HTML to the currentWeatherDiv
    currentWeatherDiv.innerHTML = html;
}

// Function to display forecast data
function displayForecast(data) {
    const forecastDiv = document.getElementById('forecast');
    forecastDiv.innerHTML = ''; // Clear previous content

    // Extract forecast data for the next 5 days
    const forecastData = data.list.filter(entry => entry.dt_txt.includes('12:00:00'));

    // Create HTML structure for forecast
    const html = forecastData.map(entry => {
        const date = new Date(entry.dt * 1000).toLocaleDateString();
        const icon = entry.weather[0].icon;
        const temperature = entry.main.temp;
        const humidity = entry.main.humidity;
        const windSpeed = entry.wind.speed;

        return `
            <div class="forecast-card">
                <p>${date}</p>
                <img src="https://openweathermap.org/img/w/${icon}.png" alt="Weather icon">
                <p>Temperature: ${temperature} °F</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${windSpeed} mph</p>
            </div>
        `;
    }).join('');

    // Append HTML to the forecastDiv
    forecastDiv.innerHTML = html;
}

// Log script loaded after everything else
console.log('Script loaded!');
