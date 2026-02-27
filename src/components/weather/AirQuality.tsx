import { memo } from 'react'
import type { AirQualityData } from '../../types/air-quality'
import { getAirQualityLevel } from '../../types/air-quality'
import { InfoButton } from '../ui/InfoButton'

interface AirQualityProps {
  data: AirQualityData
}

export const AirQuality = memo(function AirQuality({ data }: AirQualityProps) {
  const level = getAirQualityLevel(data.europeanAqi)
  const percentage = Math.min((data.europeanAqi / 100) * 100, 100)

  return (
    <section className="section-card air-quality" aria-label="Luftqualitaet">
      <div className="section-header">
        <h2>Luftqualitaet</h2>
        <InfoButton
          title="Luftqualitaet"
          text="Aktuelle Luftqualitaetsdaten fuer die Region Freiberg am Neckar. Der European Air Quality Index (EAQI) bewertet die Luftqualitaet: Gut (0-20), Akzeptabel (20-40), Maessig (40-60), Schlecht (60-80), Sehr schlecht (80+). PM10 und PM2.5 sind Feinstaubwerte, NO2 ist Stickstoffdioxid und O3 ist Ozon."
        />
      </div>

      <div className="aqi-main">
        <div className="aqi-gauge">
          <div className="aqi-bar-track">
            <div
              className="aqi-bar-fill"
              style={{ width: `${percentage}%`, backgroundColor: level.color }}
            />
          </div>
          <div className="aqi-value-row">
            <span className="aqi-number" style={{ color: level.color }}>
              {Math.round(data.europeanAqi)}
            </span>
            <span className="aqi-label" style={{ color: level.color }}>
              {level.label}
            </span>
          </div>
        </div>
      </div>

      <div className="aqi-details">
        <div className="aqi-item">
          <span className="aqi-item-label">PM10</span>
          <span className="aqi-item-value">{Math.round(data.pm10)} ug/m3</span>
        </div>
        <div className="aqi-item">
          <span className="aqi-item-label">PM2.5</span>
          <span className="aqi-item-value">{Math.round(data.pm25)} ug/m3</span>
        </div>
        <div className="aqi-item">
          <span className="aqi-item-label">NO2</span>
          <span className="aqi-item-value">{Math.round(data.nitrogenDioxide)} ug/m3</span>
        </div>
        <div className="aqi-item">
          <span className="aqi-item-label">O3</span>
          <span className="aqi-item-value">{Math.round(data.ozone)} ug/m3</span>
        </div>
      </div>

      <p className="aqi-note">
        Feinstaub und Gase in Mikrogramm pro Kubikmeter. Niedrigere Werte bedeuten bessere Luftqualitaet.
      </p>
    </section>
  )
})
