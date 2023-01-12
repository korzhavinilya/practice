if ('serviceWorker' in navigator) {
  window.addEventListener('load', (event) => {
    navigator.serviceWorker
      //   .register('./sw_cached_pages.js')
      .register('./sw_cached_site.js')
      .then((reg) => {
        console.log('Service Worker: Registered');
      })
      .catch((error) => {
        console.log('Service Worker: Error', error);
      });
  });
}
