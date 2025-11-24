const apiKey = "bc200b346e39d38ac846d3a1b6e43455"; // your API key

// Get weather by city name
async function getWeather() {
  const city = document.getElementById("city").value;
  const weatherResult = document.getElementById("weatherResult");

  if (city == "") {
    weatherResult.innerHTML = "please enter a city name"
    return;
  }
fetchWeatherByCity(city);
  
}

// Fetch weather using city name
async function fetchWeatherByCity(city) {
  const weatherResult = document.getElementById("weatherResult");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    weatherResult.innerHTML = "❌ City not found. Try again!";
  }
}

// Fetch weather using coordinates
async function fetchWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  const weatherResult = document.getElementById("weatherResult");

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error("Unable to fetch location weather");
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    weatherResult.innerHTML = "❌ Unable to get location weather";
  }
}

// Display weather data
function displayWeather(data) {
  const weatherResult = document.getElementById("weatherResult");
  const { name } = data;
  const { temp, humidity } = data.main;
  const { description, icon } = data.weather[0];

  weatherResult.innerHTML = `
    <h2>${name}</h2>
    <p>🌡️ Temperature: ${temp} °C</p>
    <p>💧 Humidity: ${humidity}%</p>
    <p>🌥 Condition: ${description}</p>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather-icon">
  `;
}

// Auto-detect user location
function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      (error) => {
        document.getElementById("weatherResult").innerHTML =
          "⚠️ Location access denied. Please search manually.";
      }
    );
  } else {
    document.getElementById("weatherResult").innerHTML =
      "❌ Geolocation not supported in your browser.";
  }
}

// Call location weather on page load
window.onload = getLocationWeather;
