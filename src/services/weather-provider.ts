import type { Location, WeatherData } from '../types/weather'

/**
 * Weather provider interface — adapter pattern.
 * Implement this to add new data sources (OpenWeatherMap, DWD, etc.)
 */
export interface WeatherProvider {
  readonly name: string
  fetchWeather(location: Location, forecastDays: number, signal?: AbortSignal): Promise<WeatherData>
}
