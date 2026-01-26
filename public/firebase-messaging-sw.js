importScripts(
    'https://www.gstatic.com/firebasejs/9.13.0/firebase-app-compat.js'
)
importScripts(
    'https://www.gstatic.com/firebasejs/9.13.0/firebase-messaging-compat.js'
)

// Initialize Firebase with proper configuration
firebase?.initializeApp({
    apiKey: "AIzaSyDD3Bs81nJUQ91wURfpGcmUl5_FJ3vpfWU",
    authDomain: "food-63111.firebaseapp.com",
    projectId: "food-63111",
    storageBucket: "food-63111.firebasestorage.app",
    messagingSenderId: "383776666755",
    appId: "1:383776666755:web:06bcea210c81c2350357b6"
})

// Retrieve firebase messaging
const messaging = firebase?.messaging()

// Handle background messages with enhanced notification options
messaging.onBackgroundMessage(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message', payload)

    const notificationTitle = payload.notification?.title || 'New Notification'
    const notificationOptions = {
        body: payload.notification?.body || 'You have a new message',
        icon: payload.notification?.icon || '/logo.png',
        badge: '/logo.png',
        data: payload.data,
        tag: payload.data?.orderId || 'notification',
        requireInteraction: false
    }

    self.registration.showNotification(notificationTitle, notificationOptions)
})

// Handle notification click events
self.addEventListener('notificationclick', function (event) {
    console.log('[firebase-messaging-sw.js] Notification click received.')

    event.notification.close()

    // Open the app when notification is clicked
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then(function (windowClients) {
                // Check if there is already a window/tab open
                for (let i = 0; i < windowClients.length; i++) {
                    const client = windowClients[i]
                    if ('focus' in client) {
                        return client.focus()
                    }
                }
                // If not, open a new window/tab
                if (clients.openWindow) {
                    return clients.openWindow('/')
                }
            })
    )
})
