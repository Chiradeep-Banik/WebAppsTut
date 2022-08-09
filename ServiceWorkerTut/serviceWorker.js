const cache = 'v1';

const assets = [
    'index.html',
    'main.js'
];

//Installing the service worker
self.addEventListener('install',(event)=>{
    console.log("Service Worker Installed");

    event.waitUntill(
        caches.open(cache)
            .then((cacheObj)=>{
                console.log(`CacheObj : ${cacheObj}`);
                cacheObj.addAll(assets)
            }).then(()=>{
                self.skipWaiting();
            })
    );
});

//Activate the service worker
self.addEventListener('activate',(event)=>{
    console.log("Service Worker Activated");

    event.waitUntill(
        caches.keys()
            .then((cs)=>{
                cs.map((c)=>{
                    if(c!==cache){
                        caches.delete(c);
                    }
                })
            })
            .then(()=>{self.skipWaiting();})
    );
});

//Intercepting the fetch request from the browser to the server

self.addEventListener('fetch',(event)=>{
    console.log("Fetching");
    event.respondWith(
        fetch(event.request)
        .catch(()=>{
            caches.match(event.request);
            console.log("Fetched from cache as the server is OFFLINE");
        })
    );
})