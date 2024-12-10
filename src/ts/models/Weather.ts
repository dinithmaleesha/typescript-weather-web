export interface WeatherProps {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: CurrentUnits;
  current: CurrentWeather;
  daily_units: DailyUnits;
  daily: DailyWeather;
}

interface CurrentUnits {
  time: string;
  interval: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  precipitation: string;
  wind_speed_10m: string;
  wind_direction_10m: string;
}

interface CurrentWeather {
  time: string;
  interval: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  precipitation: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
}

interface DailyUnits {
  time: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  sunrise: string;
  sunset: string;
  uv_index_max: string;
}

interface DailyWeather {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise: string[];
  sunset: string[];
  uv_index_max: number[];
}