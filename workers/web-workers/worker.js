self.onmessage = function (event) {
  const id = event.data;

  fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then((response) => response.json())
    .then((json) => postMessage(json));

  //   self.close();
};
