export function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-logo">
          <svg viewBox="0 0 40 40" width="40" height="40" className="header-icon">
            <defs>
              <linearGradient id="h-gold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f0a500" />
                <stop offset="100%" stopColor="#d4880f" />
              </linearGradient>
            </defs>
            <circle cx="20" cy="20" r="19" fill="#0f2847" stroke="#f0a500" strokeWidth="1.5" />
            <polygon points="20,8 14,18 26,18" fill="#1a2a44" />
            <rect x="17" y="18" width="6" height="14" fill="#1a2a44" rx="1" />
            <rect x="12" y="26" width="16" height="6" fill="#1a2a44" rx="1" />
            <circle cx="30" cy="12" r="5" fill="url(#h-gold)" />
          </svg>
        </div>
        <div className="header-text">
          <h1>Freiberg am Neckar</h1>
          <p className="subtitle">Wetter &middot; Luftdaten &middot; Stadtinfo</p>
        </div>
      </div>
    </header>
  )
}
