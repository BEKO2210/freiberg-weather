import { useState, useEffect } from 'react'
import './App.css'

interface WeatherData {
  current: {
    temperature_2m: number
    relative_humidity_2m: number
    apparent_temperature: number
    precipitation: number
    weather_code: number
    wind_speed_10m: number
    wind_direction_10m: number
    pressure_msl: number
  }
  daily: {
    time: string[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    precipitation_sum: number[]
    weather_code: number[]
  }
}

const weatherCodes: Record<number, { icon: string; label: string }> = {
  0: { icon: '☀️', label: 'Klarer Himmel' },
  1: { icon: '🌤️', label: 'Meist sonnig' },
  2: { icon: '⛅', label: 'Teilweise bewölkt' },
  3: { icon: '☁️', label: 'Bewölkt' },
  45: { icon: '🌫️', label: 'Nebel' },
  48: { icon: '🌫️', label: 'Reifnebel' },
  51: { icon: '🌧️', label: 'Leichter Nieselregen' },
  53: { icon: '🌧️', label: 'Nieselregen' },
  55: { icon: '🌧️', label: 'Starker Nieselregen' },
  61: { icon: '🌧️', label: 'Leichter Regen' },
  63: { icon: '🌧️', label: 'Regen' },
  65: { icon: '🌧️', label: 'Starker Regen' },
  71: { icon: '🌨️', label: 'Leichter Schneefall' },
  73: { icon: '🌨️', label: 'Schneefall' },
  75: { icon: '🌨️', label: 'Starker Schneefall' },
  80: { icon: '🌦️', label: 'Leichte Regenschauer' },
  81: { icon: '🌦️', label: 'Regenschauer' },
  82: { icon: '🌦️', label: 'Starke Regenschauer' },
  95: { icon: '⛈️', label: 'Gewitter' },
  96: { icon: '⛈️', label: 'Gewitter mit Hagel' },
  99: { icon: '⛈️', label: 'Schweres Gewitter mit Hagel' },
}

function getWeatherInfo(code: number) {
  return weatherCodes[code] || { icon: '❓', label: 'Unbekannt' }
}

function getWindDirection(degrees: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  const index = Math.round(degrees / 22.5) % 16
  return directions[index]
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('de-DE', { weekday: 'short', day: 'numeric', month: 'short' })
}

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Freiberg am Neckar coordinates
        const lat = 49.1081
        const lon = 9.2014
        
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,pressure_msl&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code&timezone=Europe/Berlin&forecast_days=5`
        )
        
        if (!response.ok) {
          throw new Error('Fehler beim Laden der Wetterdaten')
        }
        
        const data = await response.json()
        setWeather(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten')
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="spinner"></div>
          <p>Wetterdaten werden geladen...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app">
        <div className="error">
          <p>❌ {error}</p>
          <button onClick={() => window.location.reload()}>Erneut versuchen</button>
        </div>
      </div>
    )
  }

  if (!weather) return null

  const current = weather.current
  const currentWeather = getWeatherInfo(current.weather_code)

  return (
    <div className="app">
      <header className="header">
        <h1>🌤️ Freiberg Wetter</h1>
        <p className="subtitle">Wetter für Freiberg am Neckar</p>
      </header>

      <main className="main">
        <div className="current-weather">
          <div className="weather-main">
            <span className="weather-icon">{currentWeather.icon}</span>
            <div className="temperature">
              <span className="temp-value">{Math.round(current.temperature_2m)}</span>
              <span className="temp-unit">°C</span>
            </div>
          </div>
          <p className="weather-label">{currentWeather.label}</p>
          <p className="feels-like">Gefühlt wie {Math.round(current.apparent_temperature)}°C</p>
        </div>

        <div className="weather-details">
          <div className="detail-card">
            <span className="detail-icon">💧</span>
            <span className="detail-label">Luftfeuchtigkeit</span>
            <span className="detail-value">{current.relative_humidity_2m}%</span>
          </div>
          <div className="detail-card">
            <span className="detail-icon">💨</span>
            <span className="detail-label">Wind</span>
            <span className="detail-value">{current.wind_speed_10m} km/h {getWindDirection(current.wind_direction_10m)}</span>
          </div>
          <div className="detail-card">
            <span className="detail-icon">🌧️</span>
            <span className="detail-label">Niederschlag</span>
            <span className="detail-value">{current.precipitation} mm</span>
          </div>
          <div className="detail-card">
            <span className="detail-icon">📊</span>
            <span className="detail-label">Luftdruck</span>
            <span className="detail-value">{current.pressure_msl} hPa</span>
          </div>
        </div>

        <div className="forecast">
          <h2>📅 5-Tage Vorschau</h2>
          <div className="forecast-list">
            {weather.daily.time.map((time, index) => {
              const dayWeather = getWeatherInfo(weather.daily.weather_code[index])
              return (
                <div key={time} className="forecast-item">
                  <span className="forecast-date">{index === 0 ? 'Heute' : formatDate(time)}</span>
                  <span className="forecast-icon">{dayWeather.icon}</span>
                  <span className="forecast-temps">
                    <span className="temp-max">{Math.round(weather.daily.temperature_2m_max[index])}°</span>
                    <span className="temp-min">{Math.round(weather.daily.temperature_2m_min[index])}°</span>
                  </span>
                  <span className="forecast-precip">
                    {weather.daily.precipitation_sum[index] > 0 && (
                      <>🌧️ {weather.daily.precipitation_sum[index]} mm</>
                    )}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>Daten: <a href="https://open-meteo.com" target="_blank" rel="noopener noreferrer">Open-Meteo API</a></p>
        <p>Stand: {new Date().toLocaleString('de-DE')}</p>
      </footer>
    </div>
  )
}

export default App
