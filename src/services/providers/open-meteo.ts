import type { WeatherProvider } from '../weather-provider'
import type { Location, WeatherData, DayForecast } from '../../types/weather'
import type { OpenMeteoResponse } from '../../types/api'

const BASE_URL = 'https://api.open-meteo.com/v1/forecast'

const CURRENT_PARAMS = [
  'temperature_2m',
  'relative_humidity_2m',
  'apparent_temperature',
  'precipitation',
  'weather_code',
  'wind_speed_10m',
  'wind_direction_10m',
  'pressure_msl',
].join(',')

const DAILY_PARAMS = [
  'temperature_2m_max',
  'temperature_2m_min',
  'precipitation_sum',
  'weather_code',
].join(',')

function buildUrl(location: Location, forecastDays: number): string {
  const params = new URLSearchParams({
    latitude: String(location.lat),
    longitude: String(location.lon),
    current: CURRENT_PARAMS,
    daily: DAILY_PARAMS,
    timezone: location.timezone,
    forecast_days: String(forecastDays),
  })
  return `${BASE_URL}?${params.toString()}`
}

function mapResponse(raw: OpenMeteoResponse): WeatherData {
  const daily: DayForecast[] = raw.daily.time.map((date, i) => ({
    date,
    tempMax: raw.daily.temperature_2m_max[i],
    tempMin: raw.daily.temperature_2m_min[i],
    precipitationSum: raw.daily.precipitation_sum[i],
    weatherCode: raw.daily.weather_code[i],
  }))

  return {
    current: {
      temperature: raw.current.temperature_2m,
      feelsLike: raw.current.apparent_temperature,
      humidity: raw.current.relative_humidity_2m,
      precipitation: raw.current.precipitation,
      weatherCode: raw.current.weather_code,
      windSpeed: raw.current.wind_speed_10m,
      windDirection: raw.current.wind_direction_10m,
      pressure: raw.current.pressure_msl,
    },
    daily,
    fetchedAt: Date.now(),
  }
}

export const openMeteoProvider: WeatherProvider = {
  name: 'Open-Meteo',

  async fetchWeather(location, forecastDays, signal) {
    const url = buildUrl(location, forecastDays)
    const response = await fetch(url, { signal })

    if (!response.ok) {
      throw new Error(`Open-Meteo API error: ${response.status} ${response.statusText}`)
    }

    const data: OpenMeteoResponse = await response.json()
    return mapResponse(data)
  },
}
