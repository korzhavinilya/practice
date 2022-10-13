let browserInstances = [];

onconnect = (event) => {
  const port = event.ports[0];
  browserInstances.push(port);

  port.onmessage = (event) => {
    const id = event.data;
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((response) => response.json())
      .then((json) => {
        browserInstances.forEach((instance) => {
          instance.postMessage(json);
        });
      });
  };
};

onerror = function (event) {
  browserInstances.forEach(function (instance) {
    instance.postMessage(event);
  });
};
