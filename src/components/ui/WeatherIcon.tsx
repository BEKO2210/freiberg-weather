import React, { memo } from 'react'

type IconType = 'sun' | 'sun-cloud' | 'cloud' | 'fog' | 'drizzle' | 'rain' | 'snow' | 'thunder' | 'unknown'

function getIconType(code: number): IconType {
  if (code === 0) return 'sun'
  if (code <= 2) return 'sun-cloud'
  if (code === 3) return 'cloud'
  if (code === 45 || code === 48) return 'fog'
  if (code >= 51 && code <= 57) return 'drizzle'
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return 'rain'
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return 'snow'
  if (code >= 95) return 'thunder'
  return 'unknown'
}

interface WeatherIconProps {
  code: number
  size?: number
  className?: string
}

function SunIcon() {
  return (
    <>
      <circle cx="32" cy="32" r="12" fill="#f0a500" />
      <g stroke="#f0a500" strokeWidth="2.5" strokeLinecap="round">
        <line x1="32" y1="10" x2="32" y2="16" />
        <line x1="32" y1="48" x2="32" y2="54" />
        <line x1="10" y1="32" x2="16" y2="32" />
        <line x1="48" y1="32" x2="54" y2="32" />
        <line x1="16.4" y1="16.4" x2="20.6" y2="20.6" />
        <line x1="43.4" y1="43.4" x2="47.6" y2="47.6" />
        <line x1="47.6" y1="16.4" x2="43.4" y2="20.6" />
        <line x1="20.6" y1="43.4" x2="16.4" y2="47.6" />
      </g>
    </>
  )
}

function SunCloudIcon() {
  return (
    <>
      <circle cx="22" cy="22" r="10" fill="#f0a500" />
      <g stroke="#f0a500" strokeWidth="2" strokeLinecap="round">
        <line x1="22" y1="4" x2="22" y2="9" />
        <line x1="22" y1="35" x2="22" y2="38" />
        <line x1="4" y1="22" x2="9" y2="22" />
        <line x1="35" y1="22" x2="38" y2="22" />
        <line x1="9.3" y1="9.3" x2="12.8" y2="12.8" />
        <line x1="34.7" y1="9.3" x2="31.2" y2="12.8" />
      </g>
      <path d="M20,38 a12,12 0 0,1 12,-12 a9,9 0 0,1 9,9 a7,7 0 0,1 7,7 a6,6 0 0,1 -6,6 H22 a8,8 0 0,1 -2,-16z"
            fill="#b0c4de" opacity="0.9" />
    </>
  )
}

function CloudIcon() {
  return (
    <path d="M16,42 a14,14 0 0,1 14,-14 a11,11 0 0,1 11,11 a8,8 0 0,1 8,8 a7,7 0 0,1 -7,7 H18 a10,10 0 0,1 -2,-12z"
          fill="#b0c4de" />
  )
}

function FogIcon() {
  return (
    <g stroke="#b0c4de" strokeWidth="3" strokeLinecap="round" opacity="0.8">
      <line x1="10" y1="22" x2="54" y2="22" />
      <line x1="14" y1="30" x2="50" y2="30" />
      <line x1="10" y1="38" x2="54" y2="38" />
      <line x1="16" y1="46" x2="48" y2="46" />
    </g>
  )
}

function DrizzleIcon() {
  return (
    <>
      <path d="M16,34 a12,12 0 0,1 12,-12 a9,9 0 0,1 9,9 a7,7 0 0,1 7,7 a6,6 0 0,1 -6,6 H18 a8,8 0 0,1 -2,-10z"
            fill="#b0c4de" />
      <g fill="#64b5f6">
        <circle cx="22" cy="48" r="1.5" />
        <circle cx="30" cy="50" r="1.5" />
        <circle cx="38" cy="48" r="1.5" />
        <circle cx="26" cy="54" r="1.5" />
        <circle cx="34" cy="56" r="1.5" />
      </g>
    </>
  )
}

function RainIcon() {
  return (
    <>
      <path d="M14,32 a13,13 0 0,1 13,-13 a10,10 0 0,1 10,10 a8,8 0 0,1 8,8 a6,6 0 0,1 -6,6 H16 a9,9 0 0,1 -2,-11z"
            fill="#b0c4de" />
      <g stroke="#64b5f6" strokeWidth="2" strokeLinecap="round">
        <line x1="20" y1="46" x2="17" y2="54" />
        <line x1="28" y1="46" x2="25" y2="54" />
        <line x1="36" y1="46" x2="33" y2="54" />
        <line x1="24" y1="52" x2="21" y2="60" />
        <line x1="32" y1="52" x2="29" y2="60" />
      </g>
    </>
  )
}

function SnowIcon() {
  return (
    <>
      <path d="M16,32 a12,12 0 0,1 12,-12 a9,9 0 0,1 9,9 a7,7 0 0,1 7,7 a6,6 0 0,1 -6,6 H18 a8,8 0 0,1 -2,-10z"
            fill="#b0c4de" />
      <g fill="#e0e8f0">
        <circle cx="20" cy="48" r="2.5" />
        <circle cx="32" cy="46" r="2.5" />
        <circle cx="42" cy="49" r="2.5" />
        <circle cx="26" cy="55" r="2.5" />
        <circle cx="37" cy="56" r="2.5" />
      </g>
    </>
  )
}

function ThunderIcon() {
  return (
    <>
      <path d="M12,30 a14,14 0 0,1 14,-14 a11,11 0 0,1 11,11 a8,8 0 0,1 8,8 a7,7 0 0,1 -7,7 H14 a9,9 0 0,1 -2,-12z"
            fill="#8a9ab5" />
      <polygon points="30,34 24,46 29,46 25,58 38,42 32,42 36,34" fill="#f0a500" />
    </>
  )
}

function UnknownIcon() {
  return (
    <>
      <circle cx="32" cy="32" r="18" fill="none" stroke="#b0c4de" strokeWidth="2" />
      <text x="32" y="38" textAnchor="middle" fill="#b0c4de" fontSize="20" fontFamily="sans-serif">?</text>
    </>
  )
}

const iconComponents: Record<IconType, () => React.JSX.Element> = {
  sun: SunIcon,
  'sun-cloud': SunCloudIcon,
  cloud: CloudIcon,
  fog: FogIcon,
  drizzle: DrizzleIcon,
  rain: RainIcon,
  snow: SnowIcon,
  thunder: ThunderIcon,
  unknown: UnknownIcon,
}

export const WeatherIcon = memo(function WeatherIcon({ code, size = 64, className = '' }: WeatherIconProps) {
  const type = getIconType(code)
  const IconComponent = iconComponents[type]

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={`weather-svg-icon ${className}`}
      aria-hidden="true"
    >
      <IconComponent />
    </svg>
  )
})
