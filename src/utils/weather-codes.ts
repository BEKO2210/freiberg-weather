interface WeatherInfo {
  icon: string
  label: string
  ariaLabel: string
}

/**
 * WMO Weather interpretation codes (WW).
 * Full mapping per Open-Meteo specification.
 */
const weatherCodes: Record<number, WeatherInfo> = {
  0:  { icon: '☀️', label: 'Klarer Himmel', ariaLabel: 'Sonnig' },
  1:  { icon: '🌤️', label: 'Meist sonnig', ariaLabel: 'Überwiegend sonnig' },
  2:  { icon: '⛅', label: 'Teilweise bewölkt', ariaLabel: 'Teilweise bewölkt' },
  3:  { icon: '☁️', label: 'Bewölkt', ariaLabel: 'Bedeckt' },
  45: { icon: '🌫️', label: 'Nebel', ariaLabel: 'Nebelig' },
  48: { icon: '🌫️', label: 'Reifnebel', ariaLabel: 'Reifnebel' },
  51: { icon: '🌧️', label: 'Leichter Nieselregen', ariaLabel: 'Leichter Nieselregen' },
  53: { icon: '🌧️', label: 'Nieselregen', ariaLabel: 'Nieselregen' },
  55: { icon: '🌧️', label: 'Starker Nieselregen', ariaLabel: 'Starker Nieselregen' },
  56: { icon: '🌧️', label: 'Gefrierender Nieselregen', ariaLabel: 'Gefrierender leichter Nieselregen' },
  57: { icon: '🌧️', label: 'Starker gefrierender Nieselregen', ariaLabel: 'Starker gefrierender Nieselregen' },
  61: { icon: '🌧️', label: 'Leichter Regen', ariaLabel: 'Leichter Regen' },
  63: { icon: '🌧️', label: 'Regen', ariaLabel: 'Mäßiger Regen' },
  65: { icon: '🌧️', label: 'Starker Regen', ariaLabel: 'Starker Regen' },
  66: { icon: '🌧️', label: 'Gefrierender Regen', ariaLabel: 'Gefrierender leichter Regen' },
  67: { icon: '🌧️', label: 'Starker gefrierender Regen', ariaLabel: 'Starker gefrierender Regen' },
  71: { icon: '🌨️', label: 'Leichter Schneefall', ariaLabel: 'Leichter Schneefall' },
  73: { icon: '🌨️', label: 'Schneefall', ariaLabel: 'Mäßiger Schneefall' },
  75: { icon: '🌨️', label: 'Starker Schneefall', ariaLabel: 'Starker Schneefall' },
  77: { icon: '🌨️', label: 'Schneekörner', ariaLabel: 'Schneekörner' },
  80: { icon: '🌦️', label: 'Leichte Regenschauer', ariaLabel: 'Leichte Regenschauer' },
  81: { icon: '🌦️', label: 'Regenschauer', ariaLabel: 'Mäßige Regenschauer' },
  82: { icon: '🌦️', label: 'Starke Regenschauer', ariaLabel: 'Heftige Regenschauer' },
  85: { icon: '🌨️', label: 'Leichte Schneeschauer', ariaLabel: 'Leichte Schneeschauer' },
  86: { icon: '🌨️', label: 'Starke Schneeschauer', ariaLabel: 'Starke Schneeschauer' },
  95: { icon: '⛈️', label: 'Gewitter', ariaLabel: 'Gewitter' },
  96: { icon: '⛈️', label: 'Gewitter mit Hagel', ariaLabel: 'Gewitter mit leichtem Hagel' },
  99: { icon: '⛈️', label: 'Schweres Gewitter mit Hagel', ariaLabel: 'Schweres Gewitter mit starkem Hagel' },
}

const UNKNOWN: WeatherInfo = { icon: '❓', label: 'Unbekannt', ariaLabel: 'Unbekanntes Wetter' }

export function getWeatherInfo(code: number): WeatherInfo {
  return weatherCodes[code] ?? UNKNOWN
}
