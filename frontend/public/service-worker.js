self.addEventListener("install", (event) => {
    console.log("Service Worker Installed");

    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    console.log("Service Worker Activated");

    event.waitUntil(
        self.clients.claim()
    );
});
self.addEventListener("push", (event) => {

    console.log("Push Received");

    const data = event.data.json();

    console.log(data);

    event.waitUntil(

        self.registration.showNotification(

            data.title,

            {

                body: data.body,

                icon: "/vite.svg",

                data: data.data  

            }

        )

    );

});

self.addEventListener("notificationclick", (event) => {

    event.notification.close();

    const word = event.notification.data.word;

    event.waitUntil(

        (async () => {

            const windowClients = await clients.matchAll({
                type: "window",
                includeUncontrolled: true
            });

            const url = `/?word=${encodeURIComponent(word)}`;

            for (const client of windowClients) {

                // Works for both localhost and production.
                if (
                    client.url.startsWith(self.location.origin) &&
                    "focus" in client
                ) {
                    await client.focus();
                    await client.navigate(url);
                    return;
                }
            }

            // If WordSphere isn't already open, open it.
            return clients.openWindow(url);

        })()

    );
});