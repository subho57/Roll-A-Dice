const CACHE_NAME = 'dice-v2'; // increment this when updating the web site
const urlsToCache = [
  './index.html',
  './manifest.webmanifest',
  './sw.js',
  'css/style-dice.css',
  'images/favicons/dice.ico',
  'images/roll-dice/dice-1.png',
  'images/roll-dice/dice-2.png',
  'images/roll-dice/dice-3.png',
  'images/roll-dice/dice-4.png',
  'images/roll-dice/dice-5.png',
  'images/roll-dice/dice-6.png',
  'images/backgrounds/background-2.jpg',
  'images/backgrounds/background.jfif',
  'js/script-dice-modified.js',
  'js/script-dice.js'
];

const self = this;

// Install SW
self.addEventListener('install', (event) => {
  // start caching assets
  console.log('Installing service worker...')
  event.waitUntil(
    // open a new cache space
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker Installed!!');

      return cache.addAll(urlsToCache);
    })
  );
});

// Listen for requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match('index.html'));
    })
  );
});

// Activate the SW
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    // delete any other cache which is not the current version
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
