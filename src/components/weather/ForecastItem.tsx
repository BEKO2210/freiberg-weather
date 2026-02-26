import { memo } from 'react'
import type { DayForecast } from '../../types/weather'
import { getWeatherInfo } from '../../utils/weather-codes'
import { formatDate } from '../../utils/formatting'

interface ForecastItemProps {
  forecast: DayForecast
  isToday: boolean
}

export const ForecastItem = memo(function ForecastItem({ forecast, isToday }: ForecastItemProps) {
  const weather = getWeatherInfo(forecast.weatherCode)

  return (
    <div className="forecast-item" role="listitem">
      <span className="forecast-date">{isToday ? 'Heute' : formatDate(forecast.date)}</span>
      <span className="forecast-icon" role="img" aria-label={weather.ariaLabel}>
        {weather.icon}
      </span>
      <span className="forecast-temps">
        <span className="temp-max" aria-label={`Höchsttemperatur ${Math.round(forecast.tempMax)} Grad`}>
          {Math.round(forecast.tempMax)}&deg;
        </span>
        <span className="temp-min" aria-label={`Tiefsttemperatur ${Math.round(forecast.tempMin)} Grad`}>
          {Math.round(forecast.tempMin)}&deg;
        </span>
      </span>
      <span className="forecast-precip">
        {forecast.precipitationSum > 0 && (
          <span aria-label={`${forecast.precipitationSum} Millimeter Niederschlag`}>
            🌧️ {forecast.precipitationSum} mm
          </span>
        )}
      </span>
    </div>
  )
})
