import { memo } from 'react'
import type { HourlyForecast as HourlyData } from '../../types/weather'
import { WeatherIcon } from '../ui/WeatherIcon'
import { InfoButton } from '../ui/InfoButton'

interface HourlyForecastProps {
  hours: HourlyData[]
}

function formatHour(timeStr: string): string {
  const date = new Date(timeStr)
  return date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
}

export const HourlyForecast = memo(function HourlyForecast({ hours }: HourlyForecastProps) {
  // Show max 12 hours for clean display
  const displayHours = hours.slice(0, 12)

  return (
    <section className="section-card hourly-forecast" aria-label="Stuendliche Vorhersage">
      <div className="section-header">
        <h2>Naechste Stunden</h2>
        <InfoButton
          title="Stuendliche Vorhersage"
          text="Zeigt die vorhergesagte Temperatur und Niederschlagswahrscheinlichkeit fuer die naechsten Stunden in Freiberg am Neckar. Die Prozentzahl gibt die Wahrscheinlichkeit fuer Niederschlag an."
        />
      </div>

      <div className="hourly-scroll">
        {displayHours.map((hour) => (
          <div key={hour.time} className="hourly-item">
            <span className="hourly-time">{formatHour(hour.time)}</span>
            <WeatherIcon code={hour.weatherCode} size={32} />
            <span className="hourly-temp">{Math.round(hour.temperature)}&#176;</span>
            {hour.precipitationProbability > 0 && (
              <span className="hourly-precip">{hour.precipitationProbability}%</span>
            )}
          </div>
        ))}
      </div>
    </section>
  )
})
