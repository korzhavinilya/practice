const form = document.querySelector('form');
const div = document.querySelector('div');
const p = document.querySelector('p');

// default bubbling mode P -> DIV -> FORM

form.addEventListener(
  'click',
  (event) => {
    console.log(event.target.tagName, event.currentTarget.tagName);
  },
  false
);

div.addEventListener(
  'click',
  (event) => {
    console.log(event.target.tagName, event.currentTarget.tagName);
  },
  false
);

p.addEventListener(
  'click',
  (event) => {
    event.stopPropagation(); // stop from here
    console.log(event.target.tagName, event.currentTarget.tagName);
  },
  false
);
