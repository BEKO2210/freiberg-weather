/** Normalized current weather conditions */
export interface CurrentWeather {
  temperature: number
  feelsLike: number
  humidity: number
  precipitation: number
  weatherCode: number
  windSpeed: number
  windDirection: number
  pressure: number
}

/** Hourly forecast entry */
export interface HourlyForecast {
  time: string
  temperature: number
  precipitationProbability: number
  weatherCode: number
}

/** Single day forecast */
export interface DayForecast {
  date: string
  tempMax: number
  tempMin: number
  precipitationSum: number
  weatherCode: number
}

/** Combined weather data (current + hourly + forecast) */
export interface WeatherData {
  current: CurrentWeather
  hourly: HourlyForecast[]
  daily: DayForecast[]
  fetchedAt: number // timestamp for cache staleness
}

/** Location reference */
export interface Location {
  name: string
  lat: number
  lon: number
  timezone: string
}

/** Async data state -- discriminated union for exhaustive handling */
export type AsyncState<T> =
  | { status: 'loading'; cachedData?: T }
  | { status: 'success'; data: T; stale: boolean }
  | { status: 'error'; error: string; cachedData?: T }
