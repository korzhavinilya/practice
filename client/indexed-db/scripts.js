let db;

const DATABASE_VERSION = 2;
const DATABASE_NAME = 'test';
const USER_TABLE = 'user';

const TransactionTypes = {
  READ_ONLY: 'readonly',
  READ_WRITE: 'readwrite',
};

function initDB() {
  const openRequest = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

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

    if (!db.objectStoreNames.contains(USER_TABLE)) {
      db.createObjectStore(USER_TABLE, { keyPath: 'id', autoIncrement: true });
    }
  };
}

// Change db version to emit onupgradeneeded event
function alterDatabase() {}

function addUser() {
  const openRequest = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

  openRequest.onsuccess = (event) => {
    db = event.target.result;

    const transaction = db.transaction(USER_TABLE, TransactionTypes.READ_WRITE);
    const userTable = transaction.objectStore(USER_TABLE);

    const user = {
      name: 'Alex Rubis',
      age: 26,
    };

    const request = userTable.add(user);

    request.onsuccess = () => {
      console.log('DB: User Added');
    };

    request.onerror = (event) => {
      console.log('DB: Error User Adding');
    };
  };
}

function getUsers() {
  const openRequest = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

  openRequest.onsuccess = (event) => {
    db = event.target.result;

    const transaction = db.transaction(USER_TABLE);
    const objectStore = transaction.objectStore(USER_TABLE);

    objectStore.get(1).onsuccess = (event) => {
      console.log('DB: Get by id 1');
      console.log(event.target.result);
    };

    objectStore.getAll().onsuccess = (event) => {
      console.log('DB: Get All');
      console.log(event.target.result);
    };
  };
}

initDB();
// addUser();
getUsers();
