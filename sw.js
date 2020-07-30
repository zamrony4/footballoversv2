const CACHE_NAME = "pwasubmission2-v2";
const urlsToCache = [
    "/",
    "/index.html",
    "/app.js",
    "/sw.js",
    "/manifest.json",
    "/favicon.ico",
    "/src/main.js",
    "/src/register-sw.js",
    "/src/component/FixturesDateList.js",
    "/src/component/NavBar.js",
    "/src/data/api.js",
    "/src/data/league.js",
    "/src/data/navData.js",
    "/src/function/fnDatabase.js",
    "/src/function/fnDate.js",
    "/src/function/fnLeague.js",
    "/src/pages/ClubPage.js",
    "/src/pages/FavoritesPage.js",
    "/src/pages/HomePage.js",
    "/src/pages/LeaguePage.js",
    "/src/pages/LeagueIdPage.js",
    "/src/pages/MainPage.js",
    "/src/pages/NotFoundPage.js",
    "/assets/css/materialize.css",
    "/assets/css/materialize.min.css",
    "/assets/css/style.css",
    "/assets/js/idb.js",
    "/assets/js/materialize.js",
    "/assets/js/materialize.min.js",
    "/assets/font/codepoints",
    "/assets/font/material-icons.css",
    "/assets/font/MaterialIcons-Regular.eot",
    "/assets/font/MaterialIcons-Regular.ijmap",
    "/assets/font/MaterialIcons-Regular.svg",
    "/assets/font/MaterialIcons-Regular.ttf",
    "/assets/font/MaterialIcons-Regular.woff",
    "/assets/font/MaterialIcons-Regular.woff2",
    "/assets/images/background.jpg",
    "/assets/images/user.png",
    "/assets/images/logo/bundesliga.png",
    "/assets/images/logo/epl.png",
    "/assets/images/logo/laliga.png",
    "/assets/images/logo/ligue1.png",
    "/assets/images/logo/seriea.png",
    "/assets/images/icons/icon-512x512.png",
    "/assets/images/icons/icon-256x256.png",
    "/assets/images/icons/icon-152x152.png",
    "/assets/images/icons/icon-144x144.png",
    "/assets/images/icons/icon-128x128.png"
]

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
  const baseUrl = "http://api.football-data.org/v2/";

  if (event.request.url.indexOf(baseUrl) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return fetch(event.request).then(response => {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    )
  } else {
    event.respondWith(
      caches.match(event.request, {ignoreSearch: true}).then(response => {
        return response || fetch (event.request)
      })
    )
  }
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName != CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
});

self.addEventListener('push', function(event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }

  const options = {
    body: body,
    icon: '/assets/images/icons/icon-128x128.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});