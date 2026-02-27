import { InfoButton } from '../ui/InfoButton'

export function CityInfo() {
  return (
    <section className="section-card city-info" aria-label="Stadtinformationen">
      <div className="section-header">
        <h2>Freiberg am Neckar</h2>
        <InfoButton
          title="Stadtinformationen"
          text="Allgemeine Informationen zur Stadt Freiberg am Neckar (PLZ 71691) im Landkreis Ludwigsburg, Baden-Wuerttemberg. Freiberg liegt am Neckar zwischen Stuttgart und Ludwigsburg."
        />
      </div>

      <div className="city-info-grid">
        <div className="city-fact">
          <span className="city-fact-label">Postleitzahl</span>
          <span className="city-fact-value">71691</span>
        </div>
        <div className="city-fact">
          <span className="city-fact-label">Bundesland</span>
          <span className="city-fact-value">Baden-Wuerttemberg</span>
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
          <span className="city-fact-label">Hoehe</span>
          <span className="city-fact-value">222 m ue. NN</span>
        </div>
        <div className="city-fact">
          <span className="city-fact-label">Flaeche</span>
          <span className="city-fact-value">ca. 11,5 km2</span>
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
            <span className="district-detail">Noerdlicher Ortsteil mit laendlichem Charakter und Naehe zur Natur</span>
          </div>
          <div className="district-item">
            <span className="district-name">Heutingsheim</span>
            <span className="district-detail">Oestlicher Ortsteil, verbindet Wohnqualitaet mit guter Infrastruktur</span>
          </div>
        </div>
      </div>

      <div className="city-location-info">
        <p>
          Freiberg am Neckar liegt im mittleren Neckartal zwischen Stuttgart (ca. 15 km)
          und Heilbronn (ca. 35 km). Die Stadt ist Teil der Region Stuttgart und
          gehoert zum Landkreis Ludwigsburg. Durch die guenstige Lage im Neckartal
          ist das Klima mild und eignet sich traditionell fuer den Weinbau.
          Die Gemarkung erstreckt sich beiderseits des Neckars und reicht von den
          Flussauen bis zu den Hoehen der umgebenden Muschelkalk-Landschaft.
        </p>
      </div>
    </section>
  )
}
