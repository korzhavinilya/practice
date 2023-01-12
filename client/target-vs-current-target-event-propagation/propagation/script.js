const elements = document.querySelectorAll('body, div, ul, li');

for (let i = 0; i < elements.length; i++) {
  // elements[i].addEventListener('click', highlightThis, true); // body -> div -> ul -> li
  elements[i].addEventListener('click', highlightThis, false); // li -> ul -> div -> body
}

function highlightThis(e) {
  console.log(this.localName);
}
