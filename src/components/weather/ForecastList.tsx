import { memo } from 'react'
import type { DayForecast } from '../../types/weather'
import { ForecastItem } from './ForecastItem'
import { InfoButton } from '../ui/InfoButton'

interface ForecastListProps {
  days: DayForecast[]
}

export const ForecastList = memo(function ForecastList({ days }: ForecastListProps) {
  return (
    <section className="section-card forecast" aria-label="5-Tage Vorhersage">
      <div className="section-header">
        <h2>5-Tage Vorschau</h2>
        <InfoButton
          title="5-Tage Vorhersage"
          text="Wettervorhersage fuer die naechsten fuenf Tage in Freiberg am Neckar. Zeigt die erwarteten Hoechst- und Tiefsttemperaturen sowie die vorhergesagte Niederschlagsmenge pro Tag. Die Daten stammen vom Europaeischen Wetterdienst ueber die Open-Meteo API."
        />
      </div>
      <div className="forecast-list" role="list">
        {days.map((day, index) => (
          <ForecastItem key={day.date} forecast={day} isToday={index === 0} />
        ))}
      </div>
    </section>
  )
})
