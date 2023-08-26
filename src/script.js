const API_KEY = "ba35d4f91c53fab228b5840a4c7603cd"; 
const cityNameElement = document.getElementById("city-name");
const temperatureCelsiusElement = document.getElementById("temperature-celsius");

async function fetchWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    cityNameElement.textContent = data.name;
    temperatureCelsiusElement.textContent = Math.round(data.main.temp);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function updateFahrenheitTemperature(celsiusTemp) {
  const temperatureFahrenheitElement = document.getElementById(
    "temperature-fahrenheit"
  );

  if (temperatureFahrenheitElement) {
    const fahrenheitTemperature = (celsiusTemp * 9) / 5 + 32;
    temperatureFahrenheitElement.textContent = `${fahrenheitTemperature.toFixed(
      2
    )} °F`;
  }
}

if (temperatureCelsiusElement) {
  temperatureCelsiusElement.addEventListener("click", function () {
    temperatureCelsiusElement.classList.remove("temperature-link");
    temperatureFahrenheitElement.classList.add("temperature-link");
    const celsiusTemperature = parseFloat(
      temperatureCelsiusElement.textContent
    );
    updateFahrenheitTemperature(celsiusTemperature);
  });
}

const temperatureFahrenheitElement = document.getElementById(
  "temperature-fahrenheit"
);

if (temperatureFahrenheitElement) {
  temperatureFahrenheitElement.addEventListener("click", function () {
    temperatureFahrenheitElement.classList.remove("temperature-link");
    temperatureCelsiusElement.classList.add("temperature-link");
    const fahrenheitTemperature = parseFloat(
      temperatureFahrenheitElement.textContent
    );
    const celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
    temperatureCelsiusElement.textContent = `${celsiusTemperature.toFixed(
      2
    )} °C`;
  });
}

document.getElementById("search").addEventListener("click", function () {
  const cityInput = document.getElementById("cityinput").value;
  fetchWeatherData(cityInput);
});

document.getElementById("current").addEventListener("click", function () {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(async function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const geoApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

      try {
        const response = await fetch(geoApiUrl);
        const data = await response.json();

        cityNameElement.textContent = data.name;
        temperatureCelsiusElement.textContent = Math.round(data.main.temp);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    });
  } else {
    console.error("Geolocation is not available in this browser.");
  }
});
