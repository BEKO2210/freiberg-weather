import { memo } from 'react'
import type { CurrentWeather as CurrentWeatherData } from '../../types/weather'
import { getWeatherInfo } from '../../utils/weather-codes'
import { WeatherIcon } from '../ui/WeatherIcon'
import { InfoButton } from '../ui/InfoButton'

interface CurrentWeatherProps {
  data: CurrentWeatherData
}

export const CurrentWeather = memo(function CurrentWeather({ data }: CurrentWeatherProps) {
  const weather = getWeatherInfo(data.weatherCode)

  return (
    <section className="section-card current-weather" aria-label="Aktuelles Wetter">
      <div className="section-header">
        <h2>Aktuelles Wetter</h2>
        <InfoButton
          title="Aktuelles Wetter"
          text="Zeigt die aktuelle Temperatur, den Wetterzustand und die gefuehlte Temperatur fuer Freiberg am Neckar. Die gefuehlte Temperatur beruecksichtigt Wind und Luftfeuchtigkeit. Die Daten werden alle 15 Minuten aktualisiert."
        />
      </div>
      <div className="current-weather-hero">
        <div className="weather-main">
          <WeatherIcon code={data.weatherCode} size={96} className="current-icon" />
          <div className="temperature">
            <span className="temp-value">{Math.round(data.temperature)}</span>
            <span className="temp-unit">&#176;C</span>
          </div>
        </div>
        <p className="weather-label" aria-label={weather.ariaLabel}>{weather.label}</p>
        <p className="feels-like">Gefuehlt wie {Math.round(data.feelsLike)}&#176;C</p>
        <p className="location-badge">Freiberg am Neckar &middot; 222 m</p>
      </div>
    </section>
  )
})
