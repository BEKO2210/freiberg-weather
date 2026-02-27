import { formatDateTime } from '../../utils/formatting'

interface FooterProps {
  fetchedAt?: number
}

export function Footer({ fetchedAt }: FooterProps) {
  const timestamp = fetchedAt ? formatDateTime(new Date(fetchedAt)) : formatDateTime(new Date())

  return (
    <footer className="footer">
      <div className="footer-data">
        <p>
          Daten:{' '}
          <a href="https://open-meteo.com" target="_blank" rel="noopener noreferrer">
            Open-Meteo API
          </a>
          {' '}&middot;{' '}
          <a href="https://air-quality-api.open-meteo.com" target="_blank" rel="noopener noreferrer">
            Luftdaten API
          </a>
        </p>
        <p>Aktualisiert: {timestamp}</p>
      </div>
      <div className="footer-credit">
        <p>design by Belkis A.</p>
      </div>
    </footer>
  )
}
