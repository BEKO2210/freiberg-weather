import { LOCALE } from '../config'

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString(LOCALE, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}

export function formatTemperature(value: number): string {
  return `${Math.round(value)}°C`
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString(LOCALE, {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatDateTime(date: Date): string {
  return date.toLocaleString(LOCALE)
}
