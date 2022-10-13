const worker = new SharedWorker('./worker.js');

worker.port.onmessage = function (event) {
  console.log('message received from worker => ', event.data);
};

worker.onerror = function (error) {
  console.error('error received from worker => ', error);
};

worker.port.postMessage(Math.round(Math.random() * 10));
