import { formatDateTime } from '../../utils/formatting'

interface FooterProps {
  fetchedAt?: number
}

export function Footer({ fetchedAt }: FooterProps) {
  const timestamp = fetchedAt ? formatDateTime(new Date(fetchedAt)) : formatDateTime(new Date())

  return (
    <footer className="footer">
      <p>
        Daten:{' '}
        <a href="https://open-meteo.com" target="_blank" rel="noopener noreferrer">
          Open-Meteo API
        </a>
      </p>
      <p>Aktualisiert: {timestamp}</p>
    </footer>
  )
}
