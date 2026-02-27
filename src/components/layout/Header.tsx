export function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-logo">
          <img
            src={import.meta.env.BASE_URL + 'icons/icon-192x192.png'}
            alt="Freiberg am Neckar Wappen"
            width="44"
            height="44"
            className="header-icon"
          />
        </div>
        <div className="header-text">
          <h1>Freiberg am Neckar</h1>
          <p className="subtitle">Wetter &middot; Luftdaten &middot; Stadtinfo</p>
        </div>
      </div>
    </header>
  )
}
