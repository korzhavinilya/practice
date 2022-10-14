let db;

// Name and Version number
let openRequest = indexedDB.open('test', 1);

// console.log(openRequest);

openRequest.onerror = (event) => {
  console.log('DB: Error');
  db = event.target.result;
};

openRequest.onsuccess = (event) => {
  console.log('DB: Opened');
  db = event.target.result;
};

openRequest.onupgradeneeded = (event) => {
  console.log('DB: Upgrade Needed');
  db = openRequest.result;

  if (!db.objectStoreNames.contains('user')) {
    db.createObjectStore('user', { keyPath: 'id', autoIncrement: true });
  }
};
