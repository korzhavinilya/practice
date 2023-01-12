const publicKey =
  'BO1hnXxjOhpxAZB9tAwV7K2IGSGzC8QBtUBXQ5AwK3F12d7Z2LrQ1M2gaLYCNgVXx1yc5o3c4DawJVI1pkR6izs';

// Check for service worker
if ('serviceWorker' in navigator) {
  send().catch((err) => console.error(err));
}

// Register SW, Register Push, Send Push
async function send() {
  // Register Service Worker
  console.log('Registering service worker...');
  const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/',
  });
  console.log('Service Worker Registered...');

  // Register Push
  console.log('Registering Push...');
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: publicKey,
  });
  console.log('Push Registered...');

  // Send Push Notification
  console.log('Sending Push...');
  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json',
    },
  });
  console.log('Push Sent...');
}
