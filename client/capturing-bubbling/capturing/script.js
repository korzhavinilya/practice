const form = document.querySelector('form');
const div = document.querySelector('div');
const p = document.querySelector('p');

// capturing mode FORM -> DIV -> P

form.addEventListener(
  'click',
  (event) => {
    console.log(event.target.tagName, event.currentTarget.tagName);
  },
  true
);

div.addEventListener(
  'click',
  (event) => {
    event.stopPropagation(); // stop
    console.log(event.target.tagName, event.currentTarget.tagName);
  },
  true
);

p.addEventListener(
  'click',
  (event) => {
    console.log(event.target.tagName, event.currentTarget.tagName);
  },
  true
);
