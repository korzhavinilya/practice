fetch('/')
  .then(function (response) {
    // The API call was successful!
    return response.text();
  })
  .then(function (html) {
    // Convert the HTML string into a document object
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const elements = doc.querySelectorAll('span.name');
    console.log(doc);
    const lists = [...elements].map((list) => list.innerText);
    console.log(lists);
  })
  .catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
  });
