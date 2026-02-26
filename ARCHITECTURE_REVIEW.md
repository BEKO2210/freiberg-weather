# Freiberg Weather — Architecture Review

> **Reviewer:** Senior Staff Engineer / Frontend Architect
> **Date:** 2026-02-26
> **Scope:** Full codebase analysis + production-grade upgrade plan

---

## PHASE 1 — REPO ANALYSIS

### 1. Tech Stack Summary

| Layer         | Technology                     | Version   | Notes                           |
|---------------|--------------------------------|-----------|----------------------------------|
| Framework     | React                          | 19.2      | Latest, good                    |
| Language      | TypeScript                     | 5.9       | Strict mode enabled             |
| Bundler       | Vite                           | 7.3       | Fast dev + build                |
| API           | Open-Meteo                     | REST      | Free, no key required           |
| Styling       | Plain CSS                      | —         | No preprocessor or CSS-in-JS    |
| Linting       | ESLint 9 + flat config         | 9.39      | Basic recommended rules         |
| Testing       | **None**                       | —         | Critical gap                    |
| State Mgmt    | React useState                 | —         | Local only, no global state     |
| Routing       | **None**                       | —         | Single page                     |
| PWA           | **None**                       | —         | No manifest, no service worker  |

### 2. Folder Architecture Map

```
freiberg-weather/
├── index.html              ← Entry point (lang="en", should be "de")
├── package.json            ← Minimal deps (react + react-dom only)
├── vite.config.ts          ← Base path set for GitHub Pages
├── tsconfig.json           ← Project references (app + node)
├── tsconfig.app.json       ← Strict mode ✓
├── eslint.config.js        ← Flat config, basic rules
├── public/
│   └── vite.svg            ← Default Vite favicon (not weather-related)
└── src/
    ├── main.tsx            ← React entry (StrictMode ✓)
    ├── App.tsx             ← ⚠️ MONOLITH: all logic + UI in one file
    ├── App.css             ← All styles (292 lines)
    ├── index.css           ← Vite default styles (conflicts with App.css)
    └── assets/
        └── react.svg       ← Unused asset
```

**Key observation:** The entire application is a single component. No separation of concerns whatsoever.

### 3. Data Flow Diagram

```
┌─────────────────────────────────────────────────────┐
│                    App.tsx (monolith)                │
│                                                     │
│  useEffect (mount)                                  │
│       │                                             │
│       ▼                                             │
│  fetch("api.open-meteo.com/v1/forecast?...")        │
│       │                                             │
│       ▼                                             │
│  Raw JSON ──► useState<WeatherData>                 │
│       │           │                                 │
│       │           ├──► Current weather card          │
│       │           ├──► Detail cards (4x grid)        │
│       │           └──► 5-day forecast list           │
│       │                                             │
│  Error? ──────► useState<string> ──► Error screen   │
│  Loading? ────► useState<boolean> ──► Spinner       │
└─────────────────────────────────────────────────────┘
```

**Problems with current flow:**
- No caching — every page load hits the API
- No data transformation layer — raw API response used directly in UI
- No refresh mechanism (only full page reload on error)
- No stale-while-revalidate pattern
- Coordinates hardcoded inside the component

### 4. Caching Strategy Analysis

**Current:** No caching at all.

- No localStorage/sessionStorage cache
- No HTTP cache headers leveraged
- No service worker for offline
- No stale-while-revalidate
- Every page visit = new API call
- Open-Meteo rate limits: ~10,000 requests/day (free tier)

**Risk:** On high traffic or rapid refreshes, the app will hit rate limits or show unnecessary loading states for data that hasn't changed.

### 5. State Management Approach

**Current:** Three local `useState` calls in App component.

```typescript
const [weather, setWeather] = useState<WeatherData | null>(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)
```

**Issues:**
- Classic "loading/error/data" triple that should be unified
- No way to share weather data between components if the app grows
- No optimistic updates or background refresh
- State reset requires full page reload

### 6. UX Structure

```
┌──────────────────────────────┐
│  Header: "Freiberg Wetter"   │
├──────────────────────────────┤
│  Current Weather Card        │
│  [Icon] [Temperature]        │
│  [Label] [Feels Like]        │
├──────────────────────────────┤
│  Detail Grid (2x2)           │
│  [Humidity] [Wind]           │
│  [Precip]  [Pressure]        │
├──────────────────────────────┤
│  5-Day Forecast              │
│  [Day | Icon | Hi/Lo | Rain] │
│  [Day | Icon | Hi/Lo | Rain] │
│  ...                         │
├──────────────────────────────┤
│  Footer: Data source + time  │
└──────────────────────────────┘
```

**Positives:** Clean layout, German localization, responsive breakpoint at 480px.
**Gaps:** No hourly view, no charts, no location search, no refresh button, no last-updated indicator.

### 7. Performance Risks

| Risk | Severity | Details |
|------|----------|---------|
| No code splitting | Low | App is small, but will matter as it grows |
| No memoization | Low | Currently fine, but forecast list re-renders fully |
| backdrop-filter on every card | Medium | GPU-intensive on low-end mobile devices |
| No image/icon optimization | Low | Using emoji (renders differently per OS) |
| No bundle analysis | Low | No way to track bundle growth |
| CSS conflicts | Medium | index.css and App.css both style body/buttons |

### 8. Type Safety Evaluation

**Good:**
- TypeScript strict mode enabled
- `WeatherData` interface defined
- Proper error narrowing with `instanceof Error`

**Gaps:**
- `WeatherData` is incomplete — doesn't match full Open-Meteo response shape
- No separate type file — types inline in component
- API response not validated at runtime (trusts JSON shape)
- `weatherCodes` record doesn't cover all WMO codes (missing 2, 56, 57, 66, 67, 77, 85, 86)
- No branded types for temperature, coordinates, etc.

### 9. Accessibility Issues

| Issue | WCAG Level | Details |
|-------|-----------|---------|
| `lang="en"` on German page | A | Should be `lang="de"` |
| No skip navigation | A | Missing for keyboard users |
| No ARIA landmarks | A | Main content not marked as `<main role="main">` |
| Emoji as icons | A | No `aria-label` on weather icons |
| Color contrast | AA | `#8892b0` on dark bg is ~4.1:1 (borderline) |
| No focus indicators | AA | Custom styles don't preserve focus rings |
| No `<title>` description | A | Title is just "freiberg-weather" |
| Spinner has no aria | A | No `aria-live` or screen reader announcement |
| No reduced motion | AAA | Spinner + hover animations ignore `prefers-reduced-motion` |

### 10. Missing Features vs Expected Weather App

| Feature | Status | Priority |
|---------|--------|----------|
| Current conditions | ✅ Present | — |
| 5-day forecast | ✅ Present | — |
| Hourly forecast | ❌ Missing | High |
| Weather alerts | ❌ Missing | High |
| Sunrise/sunset | ❌ Missing | Medium |
| UV index | ❌ Missing | Medium |
| Air quality | ❌ Missing | Medium |
| Historical data | ❌ Missing | Low |
| Charts/graphs | ❌ Missing | Medium |
| Location search | ❌ Missing | Medium |
| Auto-refresh | ❌ Missing | High |
| Offline support | ❌ Missing | Medium |
| PWA install | ❌ Missing | Medium |
| Share weather | ❌ Missing | Low |
| Dark/light toggle | ❌ Missing | Low (dark-only currently) |
| Notifications | ❌ Missing | Low |

---

## PHASE 2 — PROBLEMS (PRIORITIZED)

### Critical Architecture Problems
1. **Monolithic single-file architecture** — All logic, types, utils, API calls, and UI in one 198-line file. Cannot scale.
2. **No caching** — Every page load fetches from API. No offline support.
3. **No error boundary** — Unhandled render errors crash the entire app.
4. **CSS conflicts** — `index.css` (Vite default) fights with `App.css` on body, button, and link styles.

### Scalability Risks
5. **Hardcoded coordinates** — Freiberg lat/lon embedded in component. No config system.
6. **Tightly coupled to Open-Meteo** — Direct API URL in component. Cannot swap providers.
7. **No routing** — Adding pages (hourly, history, settings) requires significant restructuring.
8. **No data layer** — Raw API response flows directly into JSX.

### Duplicated Logic
9. **Weather code mapping** — `weatherCodes` object + `getWeatherInfo()` function should be in a shared utility.
10. **Date formatting** — `formatDate()` is inline; will be needed in many future components.

### API Inefficiencies
11. **Over-fetching** — Requests all fields but only uses a subset.
12. **No request deduplication** — Rapid mounts (StrictMode dev) cause double fetches.
13. **No retry logic** — Single failed request = permanent error state.
14. **No request cancellation** — Missing AbortController in useEffect cleanup.

### Rendering Performance
15. **No memoization** — Forecast items re-render on any state change.
16. **backdrop-filter overuse** — 7+ elements use GPU-heavy backdrop-filter blur.

### Missing Error Handling
17. **No network status detection** — Doesn't know if user is offline.
18. **No API response validation** — Trusts API shape completely.
19. **Recovery is page reload only** — No retry button that preserves state.

### Mobile UX Problems
20. **No pull-to-refresh** — Expected mobile pattern missing.
21. **Forecast grid breaks on narrow screens** — 4-column grid cramped below 360px.
22. **No touch-optimized interactions** — Hover-only card effects.

---

## PHASE 3 — HIGH LEVEL REFACTOR PLAN

### Proposed Folder Structure
```
src/
├── main.tsx                        # Entry point
├── App.tsx                         # Shell: layout + routing wrapper
├── config/
│   └── index.ts                    # Location defaults, API config, feature flags
├── types/
│   ├── weather.ts                  # Weather domain types
│   └── api.ts                      # API response types
├── services/
│   ├── weather-provider.ts         # Provider interface + adapter pattern
│   ├── providers/
│   │   └── open-meteo.ts           # Open-Meteo adapter
│   └── cache.ts                    # Cache utility (localStorage + TTL)
├── hooks/
│   ├── useWeather.ts               # SWR-style weather data hook
│   └── useOnlineStatus.ts          # Network connectivity hook
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── weather/
│   │   ├── CurrentWeather.tsx
│   │   ├── WeatherDetails.tsx
│   │   ├── ForecastList.tsx
│   │   └── ForecastItem.tsx
│   ├── ui/
│   │   ├── ErrorBoundary.tsx
│   │   ├── Skeleton.tsx
│   │   └── OfflineBanner.tsx
│   └── icons/
│       └── WeatherIcon.tsx         # Accessible weather icon component
├── utils/
│   ├── weather-codes.ts            # WMO code → icon/label mapping
│   ├── formatting.ts               # Date, temperature, wind formatting
│   └── wind.ts                     # Wind direction calculation
├── styles/
│   ├── global.css                  # Reset + CSS variables
│   ├── components/                 # Per-component CSS modules (optional)
│   └── themes.css                  # Dark/light theme variables
└── __tests__/                      # Test files (mirrors src structure)
```

### Data Layer Separation
```
API (Open-Meteo) ──► Provider Adapter ──► Normalized Types ──► Cache ──► Hook ──► Components
```

### Provider Abstraction
```typescript
interface WeatherProvider {
  getCurrentWeather(location: Location): Promise<CurrentWeather>
  getForecast(location: Location, days: number): Promise<DailyForecast[]>
}
```

### Cache Module
- localStorage-based with TTL (15 minutes for current, 1 hour for forecast)
- Cache key = `weather:${lat}:${lon}:${dataType}`
- Stale-while-revalidate: show cached data immediately, refresh in background

### Loading Strategy (SWR-style)
```typescript
type WeatherState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: WeatherData; stale: boolean }
  | { status: 'error'; error: string; cachedData?: WeatherData }
```

---

## PHASE 5 — DX (Developer Experience)

### Proposed Scripts
```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview",
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "typecheck": "tsc --noEmit",
  "validate": "npm run typecheck && npm run lint && npm run build"
}
```

### Environment Config
- `.env.example` with documented variables
- `VITE_DEFAULT_LAT`, `VITE_DEFAULT_LON` for location override
- `VITE_CACHE_TTL_MINUTES` for cache tuning

---

## PHASE 6 — FUTURE ARCHITECTURE (v2 Vision)

### Multi-Location Support
- Location search with geocoding API
- Favorites list (localStorage)
- URL-based location (`/weather/48.86/9.20`)

### Plugin Weather Providers
- Adapter pattern already supports swap
- Could add: OpenWeatherMap, WeatherAPI, DWD (German Weather Service)

### AI Insight Layer
- Natural language weather summary
- "Should I take an umbrella?" predictions
- Trend analysis from historical data

### Extreme Weather Alerts
- DWD warnings API integration
- Push notifications (with PWA)
- Color-coded severity banners

### Edge Deploy Readiness
- Static export (already Vite)
- Cloudflare Pages / Vercel compatible
- API proxy for rate limit protection

---

## TIMELINE

### Quick Wins (Day 1)
- [x] Fix `lang="de"` in HTML
- [x] Remove conflicting `index.css`
- [x] Add proper meta tags and title
- [x] Extract types to separate file
- [x] Add config system
- [x] Add AbortController to fetch
- [x] Add `validate` script

### Medium Wins (Week 1)
- [x] Split components from monolith
- [x] Create weather provider abstraction
- [x] Add localStorage cache with TTL
- [x] Create useWeather hook
- [x] Add error boundary
- [x] Add skeleton loading
- [x] Add basic accessibility

### Vision (Month 1)
- [ ] Hourly forecast view
- [ ] Weather charts (lightweight)
- [ ] PWA with service worker
- [ ] Offline mode
- [ ] Auto-refresh (5-min interval)
- [ ] Location search
- [ ] Historical data view
- [ ] Vitest test suite
