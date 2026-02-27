import { useState, useEffect, useRef } from 'react'
import type { AirQualityData } from '../types/air-quality'
import type { AsyncState, Location } from '../types/weather'
import { fetchAirQuality } from '../services/providers/air-quality'
import { DEFAULT_LOCATION, AUTO_REFRESH_INTERVAL_MS } from '../config'

export function useAirQuality(location: Location = DEFAULT_LOCATION) {
  const [state, setState] = useState<AsyncState<AirQualityData>>({ status: 'loading' })
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    async function load() {
      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller

      try {
        const data = await fetchAirQuality(location, controller.signal)
        if (!controller.signal.aborted) {
          setState({ status: 'success', data, stale: false })
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          const message = err instanceof Error ? err.message : 'Luftdaten konnten nicht geladen werden'
          setState({ status: 'error', error: message })
        }
      }
    }

    load()

    const interval = setInterval(load, AUTO_REFRESH_INTERVAL_MS)

    return () => {
      clearInterval(interval)
      abortRef.current?.abort()
    }
  }, [location])

  return state
}
