import React, { memo } from 'react'
import type { CurrentWeather } from '../../types/weather'
import { getWindDirection } from '../../utils/wind'
import { InfoButton } from '../ui/InfoButton'

interface WeatherDetailsProps {
  data: CurrentWeather
}

interface DetailItem {
  svgIcon: React.JSX.Element
  label: string
  value: string
  ariaLabel: string
}

function HumidityIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#64b5f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  )
}

function WindIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#a8b2d1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
    </svg>
  )
}

function RainIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#64b5f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="16" y1="13" x2="16" y2="21" />
      <line x1="8" y1="13" x2="8" y2="21" />
      <line x1="12" y1="15" x2="12" y2="23" />
      <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" />
    </svg>
  )
}

function PressureIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#f0a500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

export const WeatherDetails = memo(function WeatherDetails({ data }: WeatherDetailsProps) {
  const details: DetailItem[] = [
    {
      svgIcon: <HumidityIcon />,
      label: 'Luftfeuchtigkeit',
      value: `${data.humidity}%`,
      ariaLabel: `Luftfeuchtigkeit: ${data.humidity} Prozent`,
    },
    {
      svgIcon: <WindIcon />,
      label: 'Wind',
      value: `${data.windSpeed} km/h ${getWindDirection(data.windDirection)}`,
      ariaLabel: `Wind: ${data.windSpeed} Kilometer pro Stunde aus ${getWindDirection(data.windDirection)}`,
    },
    {
      svgIcon: <RainIcon />,
      label: 'Niederschlag',
      value: `${data.precipitation} mm`,
      ariaLabel: `Niederschlag: ${data.precipitation} Millimeter`,
    },
    {
      svgIcon: <PressureIcon />,
      label: 'Luftdruck',
      value: `${data.pressure} hPa`,
      ariaLabel: `Luftdruck: ${data.pressure} Hektopascal`,
    },
  ]

  return (
    <section className="section-card weather-details-section" aria-label="Wetter-Details">
      <div className="section-header">
        <h2>Details</h2>
        <InfoButton
          title="Wetter-Details"
          text="Detaillierte Messwerte fuer Freiberg am Neckar: Luftfeuchtigkeit in Prozent, Windgeschwindigkeit und -richtung, aktueller Niederschlag in Millimetern und Luftdruck in Hektopascal (hPa). Der Normalwert fuer den Luftdruck liegt bei ca. 1013 hPa."
        />
      </div>
      <div className="weather-details">
        {details.map((detail) => (
          <div key={detail.label} className="detail-card" aria-label={detail.ariaLabel}>
            <span className="detail-icon" aria-hidden="true">
              {detail.svgIcon}
            </span>
            <span className="detail-label">{detail.label}</span>
            <span className="detail-value">{detail.value}</span>
          </div>
        ))}
      </div>
    </section>
  )
})
