const CACHE_VERSION = 'cache-v2' // increment this when updating the web site

// add more static assets to cache
const filesToCache=[
    "images/favicons/dice.ico",
    "images/roll-dice/dice-1.png",
    "images/roll-dice/dice-2.png",
    "images/roll-dice/dice-3.png",
    "images/roll-dice/dice-4.png",
    "images/roll-dice/dice-5.png",
    "images/roll-dice/dice-6.png",
    "images/backgrounds/background-2.jpg",
    "images/backgrounds/background.jfif"
]
self.addEventListener(
    'install',
    function (event) {

        // start caching assets
        console.log('Installing service worker...')
        event.waitUntil(
            // open a new cache space
            caches.open(CACHE_VERSION)
                .then(function (cache) {
                    return cache.addAll(filesToCache)
                })
        )

    })


self.addEventListener(
    'activate',
    async function (event) {
        event.waitUntil(
            // delete any other cache which is not the current version
            self.caches.keys().then(function (cacheKeys) {
                cacheKeys.forEach(function (cacheKey) {
                    if (cacheKey != CACHE_VERSION) {
                        self.caches.delete(cacheKey)
                    }
                })
                return true
            })
        )
    }
)


self.addEventListener(
    'fetch',
    function (event) {
        event.respondWith(
            // check cache for a response
            caches.match(event.request)
                .then(async function (cachedResponse) {

                    // try to serve with cache first
                    if (cachedResponse) {
                        return cachedResponse
                    }
                    // else try to serve from network
                    try {
                        let freshResponse = await fetch(event.request)
                        if (freshResponse) {
                            return freshResponse
                        }
                    }
                    // show offline page if server is not reachable
                    catch (error) {

                        var offlinePageResponse = new Response(
                            '',
                            {
                                status: 302,
                                statusText: 'Found',
                                headers: {
                                    Location: 'offline.html'
                                }
                            }
                        )
                        return offlinePageResponse
                        
                    }
                })
        )
    }
)


console.log('Service Worker loaded!')

// /** An empty service worker! */
// self.addEventListener ('fetch', function(event)
// {
// /** An empty fetch handler! */
// });