const body = document.querySelector('body');

body.addEventListener('click', checkTarget);

function checkTarget(e) {
  console.log('clicked on', e.target.localName);
  console.log('listener on', e.currentTarget.localName);
}
