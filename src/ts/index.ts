import { WeatherService } from './services/WeatherService';
import { WeatherProps } from './models/Weather';

const rootElement = document.querySelector('.root')!;

function createWeatherTemplate(weather: WeatherProps): string {
  return `
    <div class="weather-card">
      <h2>Weather for Latitude: ${weather.latitude}, Longitude: ${weather.longitude}</h2>
      <p>Current Temperature: ${weather.current.temperature_2m}°C</p>
      <p>Humidity: ${weather.current.relative_humidity_2m}%</p>
      <p>Wind Speed: ${weather.current.wind_speed_10m} km/h</p>
      <p>Sunrise: ${weather.daily.sunrise[0]}</p>
      <p>Sunset: ${weather.daily.sunset[0]}</p>
    </div>
  `;
}

function renderTemplate(templates: string[], parent: Element): void {
  const templateElement = document.createElement('template');

  for (const t of templates) {
    templateElement.innerHTML += t;
  }

  parent.append(templateElement.content);
}

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

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const { latitude, longitude } = await getCurrentLocation();
    const weatherService = new WeatherService();
    const weather: WeatherProps = await weatherService.getWeather(latitude, longitude);
    const weatherTemplate = createWeatherTemplate(weather);
    renderTemplate([weatherTemplate], rootElement);
  } catch (error) {
    console.error('Failed to load weather data:', error);
    rootElement.innerHTML = `<p>${error.message}</p>`;
  }
});
