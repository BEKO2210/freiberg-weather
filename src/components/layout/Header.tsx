import { DEFAULT_LOCATION } from '../../config'

export function Header() {
  return (
    <header className="header">
      <h1>Freiberg Wetter</h1>
      <p className="subtitle">Wetter f&uuml;r {DEFAULT_LOCATION.name}</p>
    </header>
  )
}
