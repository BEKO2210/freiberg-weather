import { useState } from 'react'
import { InfoButton } from '../ui/InfoButton'

export function CityInfo() {
  const [open, setOpen] = useState(false)

  return (
    <section className="section-card city-info" aria-label="Stadtinformationen">
      <div className="section-header collapsible-header" onClick={() => setOpen(!open)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setOpen(!open) }}>
        <div className="collapsible-title">
          <svg className={`chevron ${open ? 'chevron-open' : ''}`} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <h2>Über Freiberg am Neckar</h2>
        </div>
        <InfoButton
          title="Stadtinformationen"
          text="Allgemeine Informationen zur Stadt Freiberg am Neckar (PLZ 71691) im Landkreis Ludwigsburg, Baden-Württemberg. Freiberg liegt am Neckar zwischen Stuttgart und Ludwigsburg."
        />
      </div>

      {open && (
        <div className="collapsible-content">
          <div className="city-info-grid">
            <div className="city-fact">
              <span className="city-fact-label">Postleitzahl</span>
              <span className="city-fact-value">71691</span>
            </div>
            <div className="city-fact">
              <span className="city-fact-label">Bundesland</span>
              <span className="city-fact-value">Baden-Württemberg</span>
            </div>
            <div className="city-fact">
              <span className="city-fact-label">Landkreis</span>
              <span className="city-fact-value">Ludwigsburg</span>
            </div>
            <div className="city-fact">
              <span className="city-fact-label">Einwohner</span>
              <span className="city-fact-value">ca. 16.000</span>
            </div>
            <div className="city-fact">
              <span className="city-fact-label">Höhe</span>
              <span className="city-fact-value">222 m ü. NN</span>
            </div>
            <div className="city-fact">
              <span className="city-fact-label">Fläche</span>
              <span className="city-fact-value">ca. 11,5 km²</span>
            </div>
            <div className="city-fact">
              <span className="city-fact-label">Fluss</span>
              <span className="city-fact-value">Neckar</span>
            </div>
            <div className="city-fact">
              <span className="city-fact-label">Region</span>
              <span className="city-fact-value">Stuttgart</span>
            </div>
          </div>

          <div className="city-districts">
            <h3>Ortsteile</h3>
            <div className="district-list">
              <div className="district-item">
                <span className="district-name">Beihingen am Neckar</span>
                <span className="district-detail">Direkt am Neckarufer gelegen, mit historischem Ortskern und Weinbautradition</span>
              </div>
              <div className="district-item">
                <span className="district-name">Geisingen</span>
                <span className="district-detail">Nördlicher Ortsteil mit ländlichem Charakter und Nähe zur Natur</span>
              </div>
              <div className="district-item">
                <span className="district-name">Heutingsheim</span>
                <span className="district-detail">Östlicher Ortsteil, verbindet Wohnqualität mit guter Infrastruktur</span>
              </div>
            </div>
          </div>

          <div className="city-location-info">
            <p>
              Freiberg am Neckar liegt im mittleren Neckartal zwischen Stuttgart (ca. 15 km)
              und Heilbronn (ca. 35 km). Die Stadt ist Teil der Region Stuttgart und
              gehört zum Landkreis Ludwigsburg. Durch die günstige Lage im Neckartal
              ist das Klima mild und eignet sich traditionell für den Weinbau.
              Die Gemarkung erstreckt sich beiderseits des Neckars und reicht von den
              Flussauen bis zu den Höhen der umgebenden Muschelkalk-Landschaft.
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
