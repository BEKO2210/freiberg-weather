import { useState } from 'react'
import { InfoButton } from '../ui/InfoButton'

interface TimelineEntry {
  year: string
  title: string
  description: string
}

const timeline: TimelineEntry[] = [
  {
    year: 'ca. 1245',
    title: 'Erste urkundliche Erwähnung',
    description:
      'Der Ortsname "Vriberg" (Freiberg) wird erstmals in historischen Dokumenten erwähnt. Der Name bedeutet "freier Berg" und verweist auf die Lage der Siedlung.',
  },
  {
    year: '13.–15. Jh.',
    title: 'Mittelalterliche Entwicklung',
    description:
      'Die Dörfer Beihingen, Geisingen und Heutingsheim entwickeln sich als eigenständige Gemeinden im Amt Marbach. Landwirtschaft und Weinbau prägen das Leben am Neckar.',
  },
  {
    year: '16.–18. Jh.',
    title: 'Unter württembergischer Herrschaft',
    description:
      'Die Ortschaften gehören zum Herzogtum Württemberg. Der Weinbau an den Neckarhängen floriert und prägt die Kulturlandschaft nachhaltig.',
  },
  {
    year: '19. Jh.',
    title: 'Industrialisierung',
    description:
      'Mit dem Bau der Eisenbahnlinie durch das Neckartal beginnt die wirtschaftliche Modernisierung. Die Dörfer wachsen und entwickeln eine bessere Infrastruktur.',
  },
  {
    year: '1. Jan. 1972',
    title: 'Gründung von Freiberg am Neckar',
    description:
      'Im Rahmen der baden-württembergischen Gemeindereform schließen sich Beihingen am Neckar, Geisingen und Heutingsheim zur neuen Stadt Freiberg am Neckar zusammen.',
  },
  {
    year: '1980er–2000er',
    title: 'Moderne Stadtentwicklung',
    description:
      'Freiberg wächst stetig. Neue Wohngebiete entstehen, die Infrastruktur wird ausgebaut. Die Stadt entwickelt sich zu einem attraktiven Wohnort in der Region Stuttgart.',
  },
  {
    year: 'Heute',
    title: 'Lebendige Stadt im Neckartal',
    description:
      'Freiberg am Neckar ist eine moderne Kleinstadt mit rund 16.000 Einwohnern. Die Stadt vereint Wohnqualität, gute Verkehrsanbindung und ein aktives Vereinsleben. Das Neckartal bietet zahlreiche Freizeit- und Erholungsmöglichkeiten.',
  },
]

export function CityHistory() {
  const [open, setOpen] = useState(false)

  return (
    <section className="section-card city-history" aria-label="Geschichte">
      <div className="section-header collapsible-header" onClick={() => setOpen(!open)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setOpen(!open) }}>
        <div className="collapsible-title">
          <svg className={`chevron ${open ? 'chevron-open' : ''}`} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <h2>Geschichte</h2>
        </div>
        <InfoButton
          title="Geschichte von Freiberg"
          text="Historische Meilensteine der Stadt Freiberg am Neckar, von der ersten urkundlichen Erwähnung bis in die Gegenwart. Die heutige Stadt entstand 1972 aus dem Zusammenschluss dreier Gemeinden."
        />
      </div>

      {open && (
        <div className="collapsible-content">
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
        </div>
      )}
    </section>
  )
}
