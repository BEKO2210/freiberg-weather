import type { AirQualityData, AirQualityResponse } from '../../types/air-quality'
import type { Location } from '../../types/weather'

const BASE_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality'

const CURRENT_PARAMS = [
  'european_aqi',
  'pm10',
  'pm2_5',
  'nitrogen_dioxide',
  'ozone',
].join(',')

function buildUrl(location: Location): string {
  const params = new URLSearchParams({
    latitude: String(location.lat),
    longitude: String(location.lon),
    current: CURRENT_PARAMS,
    timezone: location.timezone,
  })
  return `${BASE_URL}?${params.toString()}`
}

function mapResponse(raw: AirQualityResponse): AirQualityData {
  return {
    europeanAqi: raw.current.european_aqi,
    pm10: raw.current.pm10,
    pm25: raw.current.pm2_5,
    nitrogenDioxide: raw.current.nitrogen_dioxide,
    ozone: raw.current.ozone,
    fetchedAt: Date.now(),
  }
}

export async function fetchAirQuality(
  location: Location,
  signal?: AbortSignal,
): Promise<AirQualityData> {
  const url = buildUrl(location)
  const response = await fetch(url, { signal })

  if (!response.ok) {
    throw new Error(`Air Quality API error: ${response.status} ${response.statusText}`)
  }

  const data: AirQualityResponse = await response.json()
  return mapResponse(data)
}
