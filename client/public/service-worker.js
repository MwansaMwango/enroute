importScripts("https://js.pusher.com/beams/service-worker.js");

// You can now use the Service Worker SDK by calling
// PusherPushNotifications.<METHOD_NAME>

PusherPushNotifications.onNotificationReceived = ({
  payload,
  pushEvent,
  handleNotification,
}) => {
  console.log("Payload", payload);
//   console.log("PushEvent", pushEvent);
//   console.log("HandleNotification", handleNotification);
  payload.notification.title = "A new title!";
  pushEvent.waitUntil(self.registration.showNotification('Auda Lee'));
  pushEvent.waitUntil(handleNotification(payload));
};

