import { useWeather } from './hooks/useWeather'
import { useAirQuality } from './hooks/useAirQuality'
import { ErrorBoundary } from './components/ui/ErrorBoundary'
import { OfflineBanner } from './components/ui/OfflineBanner'
import { WeatherSkeleton } from './components/ui/Skeleton'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { CurrentWeather } from './components/weather/CurrentWeather'
import { HourlyForecast } from './components/weather/HourlyForecast'
import { WeatherDetails } from './components/weather/WeatherDetails'
import { ForecastList } from './components/weather/ForecastList'
import { AirQuality } from './components/weather/AirQuality'
import { CityInfo } from './components/city/CityInfo'
import { CityHistory } from './components/city/CityHistory'
import './App.css'

function WeatherApp() {
  const { state, refresh } = useWeather()
  const airQualityState = useAirQuality()

  // Loading with no cached data
  if (state.status === 'loading' && !state.cachedData) {
    return (
      <div className="app">
        <Header />
        <main className="main">
          <WeatherSkeleton />
        </main>
      </div>
    )
  }

  // Error with no cached data
  if (state.status === 'error' && !state.cachedData) {
    return (
      <div className="app">
        <Header />
        <main className="main">
          <div className="error" role="alert">
            <p>{state.error}</p>
            <button onClick={refresh}>Erneut versuchen</button>
          </div>
        </main>
      </div>
    )
  }

  const data =
    state.status === 'success'
      ? state.data
      : state.status === 'error'
        ? state.cachedData!
        : state.cachedData!

  const isStale = state.status === 'success' ? state.stale : true

  return (
    <div className="app">
      <Header />
      <OfflineBanner />

      {isStale && (
        <div className="stale-banner" role="status">
          Daten werden aktualisiert...
        </div>
      )}

      <main className="main">
        <CurrentWeather data={data.current} />

        {data.hourly.length > 0 && (
          <HourlyForecast hours={data.hourly} />
        )}

        <WeatherDetails data={data.current} />
        <ForecastList days={data.daily} />

        {airQualityState.status === 'success' && (
          <AirQuality data={airQualityState.data} />
        )}

        <CityInfo />
        <CityHistory />
      </main>

      <Footer fetchedAt={data.fetchedAt} />
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <WeatherApp />
    </ErrorBoundary>
  )
}

export default App
