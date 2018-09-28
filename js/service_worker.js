// adapted from Matthew Cranford's code.  Major props to him in helping me
// understand all this
// https://matthewcranford.com/

console.log('Service Worker Registered');

const cacheFiles = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js'
];

self.addEventListener('install', function(evnt){
  console.log('Event Called: install');
  evnt.waitUntil(
    caches.open('v1').then(
      function(cache){
        return cache.addAll(cacheFiles);
      }
    )
  );
});

self.addEventListener('fetch', function(evnt){
  console.log('Event Called: fetch');
  evnt.respondWith(
    caches.match(evnt.request).then(
      function(response){
        if (response){
          console.log('found ', evnt.request, ' in cache');
          return response;
        }
        else{
          console.log('Counld Not Find ', evnt.request, ' in cache');
          return fetch(evnt.request).then(
            function(response){
              const cloneResponse = response.clone();
              caches.open('v1').then(
                function(cache){
                  cache.put(evnt.request, cloneResponse);
                }
              )
              return response;
            }
          )
        }
      }
    )
  );
});
