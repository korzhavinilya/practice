const abortController = new AbortController();

function someLongOperations({ signal }) {
  if (signal?.aborted) {
    return;
  }

  const interval = setInterval(() => {
    console.log('fire');
  }, 1000);

  if (signal) {
    signal.addEventListener(
      'abort',
      () => {
        console.log('aborted');
        clearInterval(interval);
      },
      { once: true }
    );
  }
}

someLongOperations({ signal: abortController.signal });

setTimeout(() => {
  abortController.abort();
}, 3000);
