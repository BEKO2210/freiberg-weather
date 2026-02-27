/** Air quality data from Open-Meteo */
export interface AirQualityData {
  europeanAqi: number
  pm10: number
  pm25: number
  nitrogenDioxide: number
  ozone: number
  fetchedAt: number
}

/** Raw Open-Meteo Air Quality API response */
export interface AirQualityResponse {
  current: {
    time: string
    european_aqi: number
    pm10: number
    pm2_5: number
    nitrogen_dioxide: number
    ozone: number
  }
}

export type AirQualityLevel = 'gut' | 'akzeptabel' | 'maessig' | 'schlecht' | 'sehr-schlecht'

export interface AirQualityLevelInfo {
  level: AirQualityLevel
  label: string
  color: string
}

export function getAirQualityLevel(aqi: number): AirQualityLevelInfo {
  if (aqi <= 20) return { level: 'gut', label: 'Gut', color: '#4ade80' }
  if (aqi <= 40) return { level: 'akzeptabel', label: 'Akzeptabel', color: '#a3e635' }
  if (aqi <= 60) return { level: 'maessig', label: 'Mäßig', color: '#facc15' }
  if (aqi <= 80) return { level: 'schlecht', label: 'Schlecht', color: '#fb923c' }
  return { level: 'sehr-schlecht', label: 'Sehr schlecht', color: '#ef4444' }
}
