import { memo } from 'react'
import type { DayForecast } from '../../types/weather'
import { getWeatherInfo } from '../../utils/weather-codes'
import { formatDate } from '../../utils/formatting'
import { WeatherIcon } from '../ui/WeatherIcon'

interface ForecastItemProps {
  forecast: DayForecast
  isToday: boolean
}

export const ForecastItem = memo(function ForecastItem({ forecast, isToday }: ForecastItemProps) {
  const weather = getWeatherInfo(forecast.weatherCode)

  return (
    <div className="forecast-item" role="listitem">
      <span className="forecast-date">{isToday ? 'Heute' : formatDate(forecast.date)}</span>
      <span className="forecast-icon" aria-label={weather.ariaLabel}>
        <WeatherIcon code={forecast.weatherCode} size={28} />
      </span>
      <span className="forecast-temps">
        <span className="temp-max" aria-label={`Höchsttemperatur ${Math.round(forecast.tempMax)} Grad`}>
          {Math.round(forecast.tempMax)}&#176;
        </span>
        <span className="temp-min" aria-label={`Tiefsttemperatur ${Math.round(forecast.tempMin)} Grad`}>
          {Math.round(forecast.tempMin)}&#176;
        </span>
      </span>
      <span className="forecast-precip">
        {forecast.precipitationSum > 0 && (
          <span aria-label={`${forecast.precipitationSum} Millimeter Niederschlag`}>
            {forecast.precipitationSum} mm
          </span>
        )}
      </span>
    </div>
  )
})
