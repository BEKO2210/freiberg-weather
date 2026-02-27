const CACHE_VERSION = 3
const CACHE_NAME = 'freiberg-wetter-v' + CACHE_VERSION
const BASE = '/freiberg-weather/'

const PRECACHE_URLS = [
  BASE,
  BASE + 'index.html',
  BASE + 'icons/icon-512x512.png',
  BASE + 'icons/icon-192x192.png',
]

// Install: cache app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  )
  // Activate immediately, don't wait for old tabs to close
  self.skipWaiting()
})

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith('freiberg-wetter-') && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  )
  // Take control of all open tabs immediately
  self.clients.claim()
})

// Fetch: different strategies for API vs app shell
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') return

  // API requests (weather + air quality): network first, cache fallback
  if (url.hostname.includes('open-meteo.com')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
          }
          return response
        })
        .catch(() => caches.match(request))
    )
    return
  }

  // App shell: network first with cache fallback (ensures updates are served fast)
  if (url.pathname.startsWith(BASE)) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
          }
          return response
        })
        .catch(() => caches.match(request))
    )
    return
  }
})
