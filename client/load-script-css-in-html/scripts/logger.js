document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded', new Date());
});

window.addEventListener('load', () => {
  console.log('load, all resources are loaded', new Date());
});
