const worker = new Worker('./worker.js');

worker.addEventListener('message', function (event) {
  console.log('message received from worker => ', event.data);
});

worker.addEventListener('error', function (event) {
  console.error('error received from worker => ', event);
});

worker.postMessage(1);
worker.postMessage(2);
worker.postMessage(3);
// worker.terminate();
