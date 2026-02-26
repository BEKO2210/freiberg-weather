import type { WeatherData } from '../types/weather'
import { CACHE_TTL_MS } from '../config'

const STORAGE_KEY_PREFIX = 'freiberg-weather'

interface CacheEntry {
  data: WeatherData
  storedAt: number
}

function buildKey(lat: number, lon: number): string {
  return `${STORAGE_KEY_PREFIX}:${lat}:${lon}`
}

export function getCachedWeather(lat: number, lon: number): WeatherData | null {
  try {
    const raw = localStorage.getItem(buildKey(lat, lon))
    if (!raw) return null

    const entry: CacheEntry = JSON.parse(raw)
    return entry.data
  } catch {
    return null
  }
}

export function isCacheStale(data: WeatherData): boolean {
  return Date.now() - data.fetchedAt > CACHE_TTL_MS
}

export function setCachedWeather(lat: number, lon: number, data: WeatherData): void {
  try {
    const entry: CacheEntry = { data, storedAt: Date.now() }
    localStorage.setItem(buildKey(lat, lon), JSON.stringify(entry))
  } catch {
    // Storage full or unavailable — silently ignore
  }
}

export function clearWeatherCache(): void {
  try {
    const keys = Object.keys(localStorage).filter(k => k.startsWith(STORAGE_KEY_PREFIX))
    keys.forEach(k => localStorage.removeItem(k))
  } catch {
    // Silently ignore
  }
}
