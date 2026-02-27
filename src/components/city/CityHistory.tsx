import { InfoButton } from '../ui/InfoButton'

interface TimelineEntry {
  year: string
  title: string
  description: string
}

const timeline: TimelineEntry[] = [
  {
    year: 'ca. 1245',
    title: 'Erste urkundliche Erwaehnung',
    description:
      'Der Ortsname "Vriberg" (Freiberg) wird erstmals in historischen Dokumenten erwaehnt. Der Name bedeutet "freier Berg" und verweist auf die Lage der Siedlung.',
  },
  {
    year: '13.–15. Jh.',
    title: 'Mittelalterliche Entwicklung',
    description:
      'Die Doerfer Beihingen, Geisingen und Heutingsheim entwickeln sich als eigenstaendige Gemeinden im Amt Marbach. Landwirtschaft und Weinbau praegen das Leben am Neckar.',
  },
  {
    year: '16.–18. Jh.',
    title: 'Unter wuerttembergischer Herrschaft',
    description:
      'Die Ortschaften gehoeren zum Herzogtum Wuerttemberg. Der Weinbau an den Neckarhaengen floriert und praegt die Kulturlandschaft nachhaltig.',
  },
  {
    year: '19. Jh.',
    title: 'Industrialisierung',
    description:
      'Mit dem Bau der Eisenbahnlinie durch das Neckartal beginnt die wirtschaftliche Modernisierung. Die Doerfer wachsen und entwickeln eine bessere Infrastruktur.',
  },
  {
    year: '1. Jan. 1972',
    title: 'Gruendung von Freiberg am Neckar',
    description:
      'Im Rahmen der baden-wuerttembergischen Gemeindereform schliessen sich Beihingen am Neckar, Geisingen und Heutingsheim zur neuen Stadt Freiberg am Neckar zusammen.',
  },
  {
    year: '1980er–2000er',
    title: 'Moderne Stadtentwicklung',
    description:
      'Freiberg waechst stetig. Neue Wohngebiete entstehen, die Infrastruktur wird ausgebaut. Die Stadt entwickelt sich zu einem attraktiven Wohnort in der Region Stuttgart.',
  },
  {
    year: 'Heute',
    title: 'Lebendige Stadt im Neckartal',
    description:
      'Freiberg am Neckar ist eine moderne Kleinstadt mit rund 16.000 Einwohnern. Die Stadt vereint Wohnqualitaet, gute Verkehrsanbindung und ein aktives Vereinsleben. Das Neckartal bietet zahlreiche Freizeit- und Erholungsmoeglichkeiten.',
  },
]

export function CityHistory() {
  return (
    <section className="section-card city-history" aria-label="Geschichte">
      <div className="section-header">
        <h2>Geschichte</h2>
        <InfoButton
          title="Geschichte von Freiberg"
          text="Historische Meilensteine der Stadt Freiberg am Neckar, von der ersten urkundlichen Erwaehnung bis in die Gegenwart. Die heutige Stadt entstand 1972 aus dem Zusammenschluss dreier Gemeinden."
        />
      </div>

      <div className="timeline">
        {timeline.map((entry) => (
          <div key={entry.year} className="timeline-item">
            <div className="timeline-marker" />
            <div className="timeline-content">
              <span className="timeline-year">{entry.year}</span>
              <h3 className="timeline-title">{entry.title}</h3>
              <p className="timeline-desc">{entry.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
