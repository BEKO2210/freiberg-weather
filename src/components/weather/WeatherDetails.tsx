import { memo } from 'react'
import type { CurrentWeather } from '../../types/weather'
import { getWindDirection } from '../../utils/wind'

interface WeatherDetailsProps {
  data: CurrentWeather
}

interface DetailItem {
  icon: string
  label: string
  value: string
  ariaLabel: string
}

export const WeatherDetails = memo(function WeatherDetails({ data }: WeatherDetailsProps) {
  const details: DetailItem[] = [
    {
      icon: '💧',
      label: 'Luftfeuchtigkeit',
      value: `${data.humidity}%`,
      ariaLabel: `Luftfeuchtigkeit: ${data.humidity} Prozent`,
    },
    {
      icon: '💨',
      label: 'Wind',
      value: `${data.windSpeed} km/h ${getWindDirection(data.windDirection)}`,
      ariaLabel: `Wind: ${data.windSpeed} Kilometer pro Stunde aus ${getWindDirection(data.windDirection)}`,
    },
    {
      icon: '🌧️',
      label: 'Niederschlag',
      value: `${data.precipitation} mm`,
      ariaLabel: `Niederschlag: ${data.precipitation} Millimeter`,
    },
    {
      icon: '📊',
      label: 'Luftdruck',
      value: `${data.pressure} hPa`,
      ariaLabel: `Luftdruck: ${data.pressure} Hektopascal`,
    },
  ]

  return (
    <section className="weather-details" aria-label="Wetter-Details">
      {details.map((detail) => (
        <div key={detail.label} className="detail-card" aria-label={detail.ariaLabel}>
          <span className="detail-icon" role="img" aria-hidden="true">
            {detail.icon}
          </span>
          <span className="detail-label">{detail.label}</span>
          <span className="detail-value">{detail.value}</span>
        </div>
      ))}
    </section>
  )
})
