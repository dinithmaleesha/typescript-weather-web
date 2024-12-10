import { WeatherService } from './services/WeatherService';
import { WeatherProps } from './models/Weather';

async function getCurrentLocation(): Promise<{ latitude: number; longitude: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(new Error('Geolocation is not supported by your browser.'));
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(new Error('Unable to retrieve your location.'));
      }
    );
  });
}

function updateWeatherData(weather: WeatherProps): void {
  
  const temperatureElement = document.getElementById('temperature');
  const tempMaxElement = document.getElementById('temp-max');
  const tempMinElement = document.getElementById('temp-min');
  if (temperatureElement && tempMaxElement && tempMinElement) {
    temperatureElement.textContent = weather.current.temperature_2m.toString();
    tempMaxElement.textContent = weather.daily.temperature_2m_max[0].toString();
    tempMinElement.textContent = weather.daily.temperature_2m_min[0].toString();
  }

  
  const windSpeedElement = document.getElementById('wind-speed');
  const humidityElement = document.getElementById('humidity');
  const windDirection = document.getElementById('wind-direction');
  const precipitation = document.getElementById('precipitation');
  if (windSpeedElement && humidityElement && windDirection && precipitation) {
    windSpeedElement.textContent = weather.current.wind_speed_10m.toString();
    humidityElement.textContent = weather.current.relative_humidity_2m.toString();
    windDirection.textContent = weather.current.wind_direction_10m.toString();
    precipitation.textContent = weather.current.precipitation.toString();
  }

  
  const sunriseElement = document.getElementById('sunrise');
  const sunsetElement = document.getElementById('sunset');
  if (sunriseElement && sunsetElement) {
    sunriseElement.textContent = formatTime(weather.daily.sunrise[0]);
    sunsetElement.textContent = formatTime(weather.daily.sunset[0]);
  }
}

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const { latitude, longitude } = await getCurrentLocation();
    const weatherService = new WeatherService();
    const weather: WeatherProps = await weatherService.getWeather(latitude, longitude);

    updateWeatherData(weather);
  } catch (error) {
    console.error('Failed to load weather data:', error);
    const rootElement = document.querySelector('.root');
    if (rootElement) {
      rootElement.innerHTML = `<p>${error.message}</p>`;
    }
  }
});
