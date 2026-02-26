import { useOnlineStatus } from '../../hooks/useOnlineStatus'

export function OfflineBanner() {
  const online = useOnlineStatus()

  if (online) return null

  return (
    <div className="offline-banner" role="alert">
      <span aria-hidden="true">📡</span> Keine Internetverbindung — zeige zwischengespeicherte Daten
    </div>
  )
}
