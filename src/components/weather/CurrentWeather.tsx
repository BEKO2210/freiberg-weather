import { memo } from 'react'
import type { CurrentWeather as CurrentWeatherData } from '../../types/weather'
import { getWeatherInfo } from '../../utils/weather-codes'

interface CurrentWeatherProps {
  data: CurrentWeatherData
}

export const CurrentWeather = memo(function CurrentWeather({ data }: CurrentWeatherProps) {
  const weather = getWeatherInfo(data.weatherCode)

  return (
    <section className="current-weather" aria-label="Aktuelles Wetter">
      <div className="weather-main">
        <span className="weather-icon" role="img" aria-label={weather.ariaLabel}>
          {weather.icon}
        </span>
        <div className="temperature">
          <span className="temp-value">{Math.round(data.temperature)}</span>
          <span className="temp-unit">&deg;C</span>
        </div>
      </div>
      <p className="weather-label">{weather.label}</p>
      <p className="feels-like">Gef&uuml;hlt wie {Math.round(data.feelsLike)}&deg;C</p>
    </section>
  )
})
