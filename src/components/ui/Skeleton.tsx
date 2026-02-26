interface SkeletonProps {
  className?: string
}

export function WeatherSkeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`skeleton-container ${className}`} aria-busy="true" aria-label="Wetterdaten werden geladen">
      {/* Current weather skeleton */}
      <div className="current-weather skeleton-card">
        <div className="weather-main">
          <div className="skeleton-circle" />
          <div className="skeleton-line skeleton-large" />
        </div>
        <div className="skeleton-line skeleton-medium" />
        <div className="skeleton-line skeleton-small" />
      </div>

      {/* Details skeleton */}
      <div className="weather-details">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="detail-card skeleton-card">
            <div className="skeleton-circle skeleton-circle-sm" />
            <div className="skeleton-line skeleton-small" />
            <div className="skeleton-line skeleton-medium" />
          </div>
        ))}
      </div>

      {/* Forecast skeleton */}
      <div className="forecast skeleton-card">
        <div className="skeleton-line skeleton-medium" />
        <div className="forecast-list">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="forecast-item">
              <div className="skeleton-line skeleton-small" />
              <div className="skeleton-circle skeleton-circle-sm" />
              <div className="skeleton-line skeleton-small" />
              <div className="skeleton-line skeleton-tiny" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
