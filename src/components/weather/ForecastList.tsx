import { memo } from 'react'
import type { DayForecast } from '../../types/weather'
import { ForecastItem } from './ForecastItem'

interface ForecastListProps {
  days: DayForecast[]
}

export const ForecastList = memo(function ForecastList({ days }: ForecastListProps) {
  return (
    <section className="forecast" aria-label="5-Tage Vorhersage">
      <h2>5-Tage Vorschau</h2>
      <div className="forecast-list" role="list">
        {days.map((day, index) => (
          <ForecastItem key={day.date} forecast={day} isToday={index === 0} />
        ))}
      </div>
    </section>
  )
})
