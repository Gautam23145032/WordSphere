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
    console.log(event.notification.data);
    event.waitUntil(

        (async () => {

            const windowClients = await clients.matchAll({

                type: "window",

                includeUncontrolled: true

            });

            const url = `/?word=${encodeURIComponent(word)}`;

            for (const client of windowClients) {

                if (
                    client.url.includes("localhost:5173") &&
                    "focus" in client
                ) {

                    await client.focus();

                    client.navigate(url);

                    return;

                }

            }

            return clients.openWindow(url);

        })()

    );

});