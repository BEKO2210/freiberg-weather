/**
 * Application configuration.
 * Override defaults via environment variables (VITE_ prefix).
 */

export interface LocationConfig {
  name: string
  lat: number
  lon: number
  timezone: string
}

export const DEFAULT_LOCATION: LocationConfig = {
  name: import.meta.env.VITE_LOCATION_NAME as string || 'Freiberg am Neckar',
  lat: Number(import.meta.env.VITE_DEFAULT_LAT) || 48.7716,
  lon: Number(import.meta.env.VITE_DEFAULT_LON) || 9.2036,
  timezone: import.meta.env.VITE_TIMEZONE as string || 'Europe/Berlin',
}

export const CACHE_TTL_MS = (Number(import.meta.env.VITE_CACHE_TTL_MINUTES) || 15) * 60 * 1000

export const FORECAST_DAYS = 5

export const LOCALE = 'de-DE'

export const AUTO_REFRESH_INTERVAL_MS = 5 * 60 * 1000 // 5 minutes
