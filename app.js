const form = document.querySelector('form');
const searchInput = document.querySelector('.search-weather');
const data = document.querySelector('.data');

// Weather Fetch Function
async function weatherAPIFunction(searchQuery) {
    try {
        let response = await fetch(`/api/weather?q=${searchQuery}`);
        
        if (!response.ok) {
            throw new Error('City or location not found');
        }

        let result = await response.json();

        const weatherHTML = `
            <div class="weather-data">
                <div class="weather-location">
                    <h2 class="search-location">Location: <span class="Location">${result.location.name}, ${result.location.region}</span></h2>
                    <p class="location-country">Location Country: <span class="Location">${result.location.country}</span></p>
                    <p class="location-time">Location Time: <span class="Location">${result.location.localtime}</span></p>
                </div>
                <div class="weather-update">
                    <div class="condition">
                        <img src="https:${result.current.condition.icon}" alt="${result.current.condition.text}">
                        <p class="condition-text">Condition: <span>${result.current.condition.text}</span></p>
                    </div>
                    <p class="temp">Temperature: <span>${result.current.temp_c}°C (${result.current.temp_f}°F)</span></p>
                    <p class="feelslike">Feels Like: <span>${result.current.feelslike_c}°C (${result.current.feelslike_f}°F)</span></p>
                    <p class="humidity">Humidity: <span>${result.current.humidity}%</span></p>
                    <p class="wind">Wind Speed: <span>${result.current.wind_kph} km/h (${result.current.wind_dir})</span></p>
                    <p class="pressure">Pressure: <span>${result.current.pressure_mb} mb</span></p>
                    <p class="uv-index">UV Index: <span>${result.current.uv}</span></p>
                    <p class="visibility">Visibility: <span>${result.current.vis_km} km</span></p>
                </div>
            </div>`;

        data.innerHTML = weatherHTML;

    } catch (error) {
        console.error(error);
        data.innerHTML = `<p style="color: red; margin-top: 10px;">Unable to fetch weather data. Please try again.</p>`;
    }
}

// User Location Detect
function getUserLocation() {
    if (navigator.geolocation) {
        data.innerHTML = "<p>Detecting your location...</p>";

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                weatherAPIFunction(`${lat},${lon}`);
            },
            (error) => {
                data.innerHTML = "<p>Location permission denied. Please search for a city above.</p>";
            }
        );
    } else {
        data.innerHTML = "<p>Geolocation is not supported by your browser.</p>";
    }
}

// Form Submit Event
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let searchQuery = searchInput.value.trim();
    
    if (searchQuery !== "") {
        data.innerHTML = `<p>Searching weather for <b>${searchQuery}</b>...</p>`;
        weatherAPIFunction(searchQuery);
        searchInput.value = "";
    } else {
        data.innerHTML = "<p style='color: orange;'>Please Enter a Valid City Name</p>";
    }
});

// Auto Load on Page Load
window.addEventListener('DOMContentLoaded', () => {
    getUserLocation();
});