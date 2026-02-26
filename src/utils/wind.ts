const DIRECTIONS = [
  'N', 'NNO', 'NO', 'ONO',
  'O', 'OSO', 'SO', 'SSO',
  'S', 'SSW', 'SW', 'WSW',
  'W', 'WNW', 'NW', 'NNW',
] as const

export type WindDirection = typeof DIRECTIONS[number]

export function getWindDirection(degrees: number): WindDirection {
  const index = Math.round(degrees / 22.5) % 16
  return DIRECTIONS[index]
}
