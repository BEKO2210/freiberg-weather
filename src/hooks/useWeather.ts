import { useState, useEffect, useCallback, useRef } from 'react'
import type { WeatherData, AsyncState, Location } from '../types/weather'
import type { WeatherProvider } from '../services/weather-provider'
import { getCachedWeather, setCachedWeather, isCacheStale } from '../services/cache'
import { openMeteoProvider } from '../services/providers/open-meteo'
import { DEFAULT_LOCATION, FORECAST_DAYS, AUTO_REFRESH_INTERVAL_MS } from '../config'

interface UseWeatherOptions {
  location?: Location
  provider?: WeatherProvider
  autoRefresh?: boolean
}

async function doFetch(
  provider: WeatherProvider,
  location: Location,
  signal: AbortSignal,
  setState: (s: AsyncState<WeatherData>) => void,
) {
  try {
    const data = await provider.fetchWeather(location, FORECAST_DAYS, signal)
    if (signal.aborted) return
    setCachedWeather(location.lat, location.lon, data)
    setState({ status: 'success', data, stale: false })
  } catch (err) {
    if (signal.aborted) return
    const message = err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten'
    const cached = getCachedWeather(location.lat, location.lon)
    setState({ status: 'error', error: message, cachedData: cached ?? undefined })
  }
}

export function useWeather(options: UseWeatherOptions = {}) {
  const {
    location = DEFAULT_LOCATION,
    provider = openMeteoProvider,
    autoRefresh = true,
  } = options

  const [state, setState] = useState<AsyncState<WeatherData>>(() => {
    const cached = getCachedWeather(location.lat, location.lon)
    if (cached) {
      return { status: 'success', data: cached, stale: isCacheStale(cached) }
    }
    return { status: 'loading' }
  })

  const abortRef = useRef<AbortController | null>(null)

  // Initial fetch + auto-refresh
  useEffect(() => {
    const cached = getCachedWeather(location.lat, location.lon)
    const needsFetch = !cached || isCacheStale(cached)

    if (needsFetch) {
      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller
      doFetch(provider, location, controller.signal, setState)
    }

    if (!autoRefresh) {
      return () => { abortRef.current?.abort() }
    }

    const interval = setInterval(() => {
      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller
      doFetch(provider, location, controller.signal, setState)
    }, AUTO_REFRESH_INTERVAL_MS)

    return () => {
      clearInterval(interval)
      abortRef.current?.abort()
    }
  }, [provider, location, autoRefresh])

  const refresh = useCallback(() => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    const cached = getCachedWeather(location.lat, location.lon)
    setState(prev => {
      if (prev.status === 'success') {
        return { ...prev, stale: true }
      }
      return { status: 'loading', cachedData: cached ?? undefined }
    })

    doFetch(provider, location, controller.signal, setState)
  }, [location, provider])

  return { state, refresh }
}
